import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
      validate: {
        validator: Number.isInteger,
        message: "Rating must be a whole number"
      }
    },
    review: {
      type: String,
      trim: true,
      minlength: [5, "Review must be at least 5 characters long"],
      maxlength: [500, "Review must be less than 500 characters"],
    },
    image: {
      type: String, 
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v) || 
                 v.includes('cloudinary.com');
        },
        message: "Please provide a valid image URL"
      }
    },
    helpfulCount: {
      type: Number,
      default: 0,
      min: 0
    },
    verified: {
      type: Boolean,
      default: false 
    }
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

reviewSchema.index({ product: 1, createdAt: -1 });
reviewSchema.index({ product: 1, rating: -1 });

reviewSchema.virtual('hasContent').get(function() {
  return !!(this.rating || this.review || this.image);
});

reviewSchema.pre('save', function(next) {
  if (!this.rating && (!this.review || !this.review.trim()) && !this.image) {
    const error = new Error('Review must contain at least a rating, review text, or image');
    return next(error);
  }
  next();
});



const Review = mongoose.model("Review", reviewSchema);

export default Review;




// reviewSchema.statics.getAverageRating = async function(productId) {
//   try {
//     const pipeline = [
//       { $match: { product: mongoose.Types.ObjectId(productId), rating: { $exists: true } } },
//       {
//         $group: {
//           _id: '$product',
//           averageRating: { $avg: '$rating' },
//           totalRatings: { $sum: 1 }
//         }
//       }
//     ];

//     const result = await this.aggregate(pipeline);
//     return result.length > 0 ? result[0] : { averageRating: 0, totalRatings: 0 };
//   } catch (error) {
//     console.error('Error calculating average rating:', error);
//     return { averageRating: 0, totalRatings: 0 };
//   }
// };


// reviewSchema.statics.getReviewStats = async function(productId) {
//   try {
//     const reviews = await this.find({ product: productId });
    
//     const stats = {
//       totalReviews: reviews.length,
//       totalRatings: reviews.filter(r => r.rating).length,
//       totalTextReviews: reviews.filter(r => r.review).length,
//       totalImageReviews: reviews.filter(r => r.image).length,
//       averageRating: 0,
//       ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
//     };

//     if (stats.totalRatings > 0) {
//       stats.averageRating = (
//         reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / stats.totalRatings
//       ).toFixed(1);

//       reviews.forEach(r => {
//         if (r.rating) {
//           stats.ratingDistribution[r.rating]++;
//         }
//       });
//     }

//     return stats;
//   } catch (error) {
//     console.error('Error getting review stats:', error);
//     throw error;
//   }
// };


// reviewSchema.methods.isHelpful = function(threshold = 3) {
//   return this.helpfulCount >= threshold;
// };

// reviewSchema.set('toJSON', { 
//   virtuals: true,
//   transform: function(doc, ret) {
//     delete ret.__v;
//     return ret;
//   }
// });





// import mongoose from "mongoose";

// const reviewSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Product",
//     required: true,
//   },
//   rating: {
//     type: Number,
//     min: 1,
//     max: 5,
//   },
//   review: {
//     type: String,
//   },
// }, { timestamps: true });

// const Review = mongoose.model("Review", reviewSchema);
// export default Review;




