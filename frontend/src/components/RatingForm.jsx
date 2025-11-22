// import { useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// const RatingForm = ({ productId, onReviewAdded }) => {
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState("");

//   const submitReview = async () => {
//     try {
//       const res = await axios.post("/api/reviews", { rating, review, productId });
//       toast.success("Review submitted");
//       onReviewAdded();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Error");
//     }
//   };

//   return (
//     <div>
//       <select value={rating} onChange={(e) => setRating(e.target.value)}>
//         <option value={0}>Rate product</option>
//         {[1, 2, 3, 4, 5].map((n) => (
//           <option key={n} value={n}>{n} ⭐</option>
//         ))}
//       </select>
//       <textarea placeholder="Write your review" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
//       <button onClick={submitReview}>Submit</button>
//     </div>
//   );
// };

// export default RatingForm;



import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Star, Upload, X, Image as ImageIcon } from "lucide-react";

const RatingForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (rating === 0 && !review.trim() && !image) {
      newErrors.general = "Please provide at least a rating, review, or image";
    }
    
    if (review.trim() && review.trim().length < 5) {
      newErrors.review = "Review must be at least 5 characters long";
    }

    if (review.trim() && review.trim().length > 500) {
      newErrors.review = "Review must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    if (!file.type.startsWith('image/')) {
      toast.error("Please select a valid image file");
      return;
    }

    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage("");
    setImagePreview("");
  };

  const submitReview = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const reviewData = { productId };
      
      if (rating > 0) reviewData.rating = rating;
      if (review.trim()) reviewData.review = review.trim();
      if (image) reviewData.image = image;

      await axios.post("/api/reviews", reviewData);
      
      toast.success("Review submitted successfully!");
      
     
      setRating(0);
      setReview("");
      setImage("");
      setImagePreview("");
      setErrors({});
      
      onReviewAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 transition-colors ${
              star <= rating ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-300'
            }`}
          >
            <Star size={20} fill={star <= rating ? 'currentColor' : 'none'} />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-400">
          {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Click to rate'}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h4 className="text-lg font-semibold text-white mb-4">Write a Review</h4>
      
      {errors.general && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded text-red-400 text-sm">
          {errors.general}
        </div>
      )}

     
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Rating (Optional)
        </label>
        {renderStars()}
      </div>

     
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Review (Optional)
        </label>
        <textarea
          placeholder="Share your experience with this product..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className={`w-full p-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.review ? 'border-red-500' : 'border-gray-600'
          }`}
          rows={4}
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.review && (
            <span className="text-red-400 text-sm">{errors.review}</span>
          )}
          <span className="text-gray-400 text-sm ml-auto">
            {review.length}/500 characters
          </span>
        </div>
      </div>

     
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Add Photo (Optional)
        </label>
        
        {imagePreview ? (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Review preview"
              className="w-32 h-32 object-cover rounded-lg border border-gray-600"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -top-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>

     
      <button
        onClick={submitReview}
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isSubmitting
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Submitting...
          </div>
        ) : (
          'Submit Review'
        )}
      </button>
    </div>
  );
};

export default RatingForm;