// import toast from "react-hot-toast";
// import { ShoppingCart } from "lucide-react";
// import {useUserStore} from "../stores/useUserStore"
// import { useCartStore } from "../stores/useCartStore";

// const ProductCard = ({ product }) => {

//     const {user} = useUserStore()
// 	const {addToCart} = useCartStore()


//     const handleAddToCart = () => {
// 		if (!user) {
// 			toast.error("Please login to add products to cart", { id: "login" });
// 			return;
// 		} else {
// 			// add to cart
// 			addToCart(product);
// 		}
// 	};
//   return (
//     <div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
// 			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
// 				<img className='object-cover w-full' src={product.image} alt='product image' />
// 				<div className='absolute inset-0 bg-black bg-opacity-20' />
// 			</div>

// 			<div className='mt-4 px-5 pb-5'>
// 				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
// 				<div className='mt-2 mb-5 flex items-center justify-between'>
// 					<p>
// 						<span className='text-3xl font-bold text-emerald-400'>₹{product.price}</span>
// 					</p>
// 				</div>
// 				<button
// 					className='flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium
// 					 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
// 					onClick={handleAddToCart}
// 				>
// 					<ShoppingCart size={22} className='mr-2' />
// 					Add to cart
// 				</button>
// 			</div>
// 		</div>
//   )
// }

// export default ProductCard




// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { ShoppingCart } from "lucide-react";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";
// import RatingForm from "./RatingForm";

// import { useNavigate } from "react-router-dom";

// const ProductCard = ({ product }) => {

// 	const [tags, setTags] = useState([]);

// useEffect(() => {
//   axios.get("/api/reviews/tags/most-used").then((res) => {
//     setTags(res.data);
//   });
// }, []);





// 	const { user } = useUserStore();
// 	const { addToCart } = useCartStore();

// 	const navigate = useNavigate();

// 	const [reviews, setReviews] = useState([]);

// 	const handleAddToCart = () => {
// 		if (!user) {
// 			toast.error("Please login to add products to cart", { id: "login" });
// 			return;
// 		} else {
// 			addToCart(product);
// 			toast.success("Added to cart!");
// 		}
// 	};

// 	const fetchReviews = async () => {
// 		try {
// 			const { data } = await axios.get(`/api/reviews/${product._id}`);
// 			setReviews(data);
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchReviews();
// 	}, [product._id]);

// 	const avgRating =
// 		reviews.length > 0
// 			? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.filter(r => r.rating).length).toFixed(1)
// 			: "No ratings";

// 	return (

// 		<div
// 		onClick={() => navigate(`/product/${product._id}`)}
// 		className="cursor-pointer flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg hover:scale-105 transition"
// 	>
// 		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg bg-gray-900'>
// 			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
// 				<img className='object-cover w-full' src={product.image} alt='product image' />
// 				<div className='absolute inset-0 bg-black bg-opacity-20' />
// 			</div>

// 			<div className='mt-4 px-5 pb-5'>
// 				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
// 				<p className='text-yellow-400 mt-1'>Average Rating: {avgRating} ⭐</p>

// 				<div className='mt-2 mb-5 flex items-center justify-between'>
// 					<p>
// 						<span className='text-3xl font-bold text-emerald-400'>₹{product.price}</span>
// 					</p>
// 				</div>

// 				<button
// 					className='flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700'
// 					onClick={handleAddToCart}
// 				>
// 					<ShoppingCart size={22} className='mr-2' />
// 					Add to cart
// 				</button>

// 				{/* Rating Form */}
// 				<div className='mt-4'>
// 					{user ? (
// 						<RatingForm productId={product._id} onReviewAdded={fetchReviews} />
// 					) : (
// 						<p className='text-sm text-gray-400'>Login to leave a review</p>
// 					)}
// 				</div>

// 				{/* Reviews */}
// 				<div className='mt-4 text-sm text-gray-300'>
// 					<h4 className='text-lg font-semibold text-white mb-2'>Reviews:</h4>
// 					{reviews.length === 0 && <p>No reviews yet.</p>}
// 					{reviews.map((r) => (
// 						<div key={r._id} className='border-t border-gray-700 py-2'>
// 							<p className='text-white font-semibold'>{r.user?.name}</p>
// 							{r.rating && <p>Rating: {r.rating} ⭐</p>}
// 							{r.review && <p>“{r.review}”</p>}
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 		<div className="flex flex-wrap gap-2 mt-2">
//   {tags.map((tag, idx) => (
//     <span key={idx} className="bg-gray-700 text-white px-2 py-1 rounded text-sm">
//       #{tag}
//     </span>
//   ))}
// </div>
// 		</div>
		
// 	);
// };

// export default ProductCard;



import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ShoppingCart, Star, MessageCircle, Image as ImageIcon } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import RatingForm from "./RatingForm";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [tags, setTags] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tagsRes, reviewsRes] = await Promise.all([
          axios.get("/api/reviews/tags/most-used"),
          axios.get(`/api/reviews/${product._id}`)
        ]);
        setTags(tagsRes.data);
        setReviews(reviewsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [product._id]);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
    toast.success("Added to cart!");
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${product._id}`);
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewFormToggle = (e) => {
    e.stopPropagation();
    setShowReviewForm(!showReviewForm);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.filter(r => r.rating).length).toFixed(1)
    : null;

  const reviewsWithRating = reviews.filter(r => r.rating).length;
  const reviewsWithText = reviews.filter(r => r.review).length;

  return (
    <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900">
      
      <div 
        onClick={() => navigate(`/product/${product._id}`)}
        className="cursor-pointer relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl group"
      >
        <img 
          className="object-cover w-full group-hover:scale-105 transition-transform duration-300" 
          src={product.image} 
          alt="product image" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      
      <div className="mt-4 px-5 pb-5 flex-1 flex flex-col">
        <div 
          onClick={() => navigate(`/product/${product._id}`)}
          className="cursor-pointer"
        >
          <h5 className="text-xl font-semibold tracking-tight text-white hover:text-blue-400 transition-colors">
            {product.name}
          </h5>
          
          
          <div className="flex items-center gap-2 mt-2">
            {avgRating ? (
              <>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-yellow-400 ml-1 font-medium">{avgRating}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  ({reviewsWithRating} rating{reviewsWithRating !== 1 ? 's' : ''})
                </span>
              </>
            ) : (
              <span className="text-gray-400 text-sm">No ratings yet</span>
            )}
          </div>

         
          {reviewsWithText > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <MessageCircle className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-sm">
                {reviewsWithText} review{reviewsWithText !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

       
        <div className="mt-3 mb-4">
          <span className="text-3xl font-bold text-emerald-400">₹{product.price}</span>
        </div>

       
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs hover:bg-gray-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

      
        <div className="mt-auto space-y-3">
          <button
            className="w-full flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={18} className="mr-2" />
            Add to cart
          </button>

          {user && (
            <button
              className="w-full flex items-center justify-center rounded-lg bg-gray-700 px-5 py-2 text-sm font-medium text-white hover:bg-gray-600 transition-colors"
              onClick={() => navigate(`/product/${product._id}?action=writeReview`)}

            >
              <MessageCircle size={18} className="mr-2" />
              {showReviewForm ? 'Cancel Review' : 'Write Review'}
            </button>
          )}
        </div>

        
        {showReviewForm && user && (
          <div className="mt-4">
            <RatingForm 
              productId={product._id} 
              onReviewAdded={() => {
                fetchReviews();
                setShowReviewForm(false);
              }} 
            />
          </div>
        )}

        {!user && (
          <p className="text-sm text-gray-400 mt-3 text-center">
            Login to write a review
          </p>
        )}

       
        {reviews.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-sm font-semibold text-white mb-2">Recent Reviews:</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {reviews.slice(0, 2).map((r) => (
                <div key={r._id} className="text-xs text-gray-300 p-2 bg-gray-800 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-white">{r.user?.name}</span>
                    {r.rating && (
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="ml-1">{r.rating}</span>
                      </div>
                    )}
                  </div>
                  {r.review && (
                    <p className="text-gray-400 line-clamp-2">
                      "{r.review.length > 60 ? r.review.substring(0, 60) + '...' : r.review}"
                    </p>
                  )}
                  {r.image && (
                    <div className="mt-1 flex items-center text-gray-400">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      <span>Photo attached</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {reviews.length > 2 && (
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="text-blue-400 hover:text-blue-300 text-xs mt-2 underline"
              >
                View all {reviews.length} reviews
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;