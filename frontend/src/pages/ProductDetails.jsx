

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Star, MessageCircle, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import RatingForm from "../components/RatingForm";

const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedReview, setExpandedReview] = useState(null);
  const [reviewFilter, setReviewFilter] = useState('all'); // all, withRating, withText, withImage

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    } catch (err) {
      toast.error("Failed to load product");
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${id}`);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add to cart");
      return;
    }
    addToCart(product);
    toast.success("Added to cart");
  };

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReview(expandedReview === reviewId ? null : reviewId);
  };

  const getFilteredReviews = () => {
    switch (reviewFilter) {
      case 'withRating':
        return reviews.filter(r => r.rating);
      case 'withText':
        return reviews.filter(r => r.review);
      case 'withImage':
        return reviews.filter(r => r.image);
      default:
        return reviews;
    }
  };

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 h-96 bg-gray-700 rounded-lg"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-700 rounded w-1/2"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.filter(r => r.rating).length).toFixed(1)
    : null;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length
  }));

  const filteredReviews = getFilteredReviews();

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="sticky top-6">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-4xl font-bold text-emerald-400 mb-4">₹{product.price}</p>
            
            {/* Rating Summary */}
            <div className="flex items-center gap-4 mb-6">
              {avgRating ? (
                <>
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-yellow-400 fill-current mr-1" />
                    <span className="text-2xl font-semibold text-yellow-400">{avgRating}</span>
                  </div>
                  <span className="text-gray-400">
                    Based on {reviews.filter(r => r.rating).length} rating{reviews.filter(r => r.rating).length !== 1 ? 's' : ''}
                  </span>
                </>
              ) : (
                <span className="text-gray-400">No ratings yet</span>
              )}
            </div>

            {/* Rating Breakdown */}
            {avgRating && (
              <div className="mb-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-semibold mb-3">Rating Breakdown</h3>
                {ratingCounts.map(({ rating, count }) => (
                  <div key={rating} className="flex items-center gap-2 mb-1">
                    <span className="text-sm w-3">{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-400 w-8">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={handleAddToCart} 
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Add to Cart
          </button>

          {user && (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {showReviewForm ? 'Cancel Review' : 'Write a Review'}
            </button>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && user && (
        <div className="mb-12">
          <RatingForm 
            productId={id} 
            onReviewAdded={() => {
              fetchReviews();
              setShowReviewForm(false);
            }} 
          />
        </div>
      )}

      {/* Reviews Section */}
      <div className="border-t border-gray-700 pt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          
          {/* Review Filters */}
          {reviews.length > 0 && (
            <select
              value={reviewFilter}
              onChange={(e) => setReviewFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
            >
              <option value="all">All Reviews ({reviews.length})</option>
              <option value="withRating">With Rating ({reviews.filter(r => r.rating).length})</option>
              <option value="withText">With Text ({reviews.filter(r => r.review).length})</option>
              <option value="withImage">With Photos ({reviews.filter(r => r.image).length})</option>
            </select>
          )}
        </div>

        {!user && (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <p className="text-gray-400 text-center">
              Please login to write a review
            </p>
          </div>
        )}

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {reviewFilter === 'all' ? 'No reviews yet.' : `No reviews matching the selected filter.`}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review._id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-white text-lg">{review.user?.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  {review.rating && (
                    <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{review.rating}</span>
                    </div>
                  )}
                </div>

                {review.review && (
                  <div className="mb-4">
                    <p className="text-gray-300 leading-relaxed">
                      {expandedReview === review._id || review.review.length <= 200
                        ? review.review
                        : `${review.review.substring(0, 200)}...`
                      }
                    </p>
                    {review.review.length > 200 && (
                      <button
                        onClick={() => toggleReviewExpansion(review._id)}
                        className="text-blue-400 hover:text-blue-300 text-sm mt-2 flex items-center"
                      >
                        {expandedReview === review._id ? (
                          <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
                        ) : (
                          <>Show More <ChevronDown className="w-4 h-4 ml-1" /></>
                        )}
                      </button>
                    )}
                  </div>
                )}

                {review.image && (
                  <div className="mt-4">
                    <img
                      src={review.image}
                      alt="Review"
                      className="max-w-xs rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => window.open(review.image, '_blank')}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;










// // pages/ProductDetails.jsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";
// import RatingForm from "../components/RatingForm";

// const ProductDetails = () => {
// 	const { id } = useParams();
// 	const { user } = useUserStore();
// 	const { addToCart } = useCartStore();

// 	const [product, setProduct] = useState(null);
// 	const [reviews, setReviews] = useState([]);

// 	const fetchProduct = async () => {
// 		try {
// 			const { data } = await axios.get(`/api/products/${id}`);
// 			setProduct(data);
// 		} catch (err) {
// 			toast.error("Failed to load product");
// 		}
// 	};

// 	const fetchReviews = async () => {
// 		try {
// 			const { data } = await axios.get(`/api/reviews/${id}`);
// 			setReviews(data);
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchProduct();
// 		fetchReviews();
// 	}, [id]);

// 	const handleAddToCart = () => {
// 		if (!user) {
// 			toast.error("Please login to add to cart");
// 			return;
// 		}
// 		addToCart(product);
// 		toast.success("Added to cart");
// 	};

// 	if (!product) return <div className="text-white p-6">Loading...</div>;

// 	const avgRating =
// 		reviews.length > 0
// 			? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.filter(r => r.rating).length).toFixed(1)
// 			: "No ratings";

// 	return (
// 		<div className="max-w-4xl mx-auto p-6 text-white">
// 			<div className="flex flex-col md:flex-row gap-6">
// 				<img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg" />
// 				<div className="flex flex-col gap-4 md:w-1/2">
// 					<h2 className="text-3xl font-bold">{product.name}</h2>
// 					<p className="text-2xl text-emerald-400">₹{product.price}</p>
// 					<p className="text-yellow-400">Average Rating: {avgRating} ⭐</p>
// 					<button onClick={handleAddToCart} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
// 						Add to Cart
// 					</button>
// 				</div>
// 			</div>

// 			<div className="mt-10">
// 				<h3 className="text-xl font-semibold mb-2">Write a Review</h3>
// 				{user ? (
// 					<RatingForm productId={id} onReviewAdded={fetchReviews} />
// 				) : (
// 					<p className="text-gray-400">Login to submit a review</p>
// 				)}
// 			</div>

// 			<div className="mt-10">
// 				<h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
// 				{reviews.length === 0 ? (
// 					<p className="text-gray-400">No reviews yet.</p>
// 				) : (
// 					reviews.map((r) => (
// 						<div key={r._id} className="border-t border-gray-700 py-4">
// 							<p className="font-semibold">{r.user?.name}</p>
// 							{r.rating && <p>Rating: {r.rating} ⭐</p>}
// 							{r.review && <p className="text-gray-300">“{r.review}”</p>}
// 						</div>
// 					))
// 				)}
// 			</div>
// 		</div>
// 	);
// };

// export default ProductDetails;


