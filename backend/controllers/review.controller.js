import Review from "../models/review.model.js";
import { v2 as cloudinary } from "cloudinary";

export const addReview = async (req, res) => {
  const { rating, review, productId, image } = req.body;
  const userId = req.user._id;

  try {

    if (!rating && !review && !image) {
      return res.status(400).json({ 
        message: "Please provide at least a rating, review text, or image." 
      });
    }
    
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ 
        message: "Rating must be between 1 and 5." 
      });
    }

    if (review && review.trim().length < 5) {
      return res.status(400).json({ 
        message: "Review must be at least 5 characters long." 
      });
    }

    if (review && review.trim().length > 500) {
      return res.status(400).json({ 
        message: "Review must be less than 500 characters." 
      });
    }

    const existing = await Review.findOne({ user: userId, product: productId });
    if (existing) {
      return res.status(400).json({ 
        message: "You have already reviewed this product." 
      });
    }


    let cloudinaryResponse = null;
    if (image) {
      try {
        cloudinaryResponse = await cloudinary.uploader.upload(image, { 
          folder: "reviews",
          resource_type: "image",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" }
          ]
        });
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(400).json({ 
          message: "Failed to upload image. Please try again." 
        });
      }
    }

    const reviewData = {
      user: userId,
      product: productId,
    };

    if (rating) reviewData.rating = parseInt(rating);
    if (review && review.trim()) reviewData.review = review.trim();
    if (cloudinaryResponse?.secure_url) reviewData.image = cloudinaryResponse.secure_url;

    const newReview = await Review.create(reviewData);

    await newReview.populate("user", "name");

    res.status(201).json({
      message: "Review submitted successfully!",
      review: newReview
    });
  } catch (err) {
    console.error("Error in addReview:", err);
    res.status(500).json({ 
      message: "Server error", 
      error: err.message 
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 }); 
    res.json(reviews);
  } catch (error) {
    console.error("Error in getProductReviews:", error);
    res.status(500).json({ 
      message: "Error fetching reviews", 
      error: error.message 
    });
  }
};

export const getMostUsedTags = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      review: { $exists: true, $ne: "", $ne: null } 
    });

    if (reviews.length === 0) {
      return res.json([]);
    }

    const keywordMap = {};
    
    const stopWords = [
      'this', 'that', 'with', 'have', 'been', 'from', 'very', 'good', 'great',
      'nice', 'best', 'love', 'like', 'really', 'much', 'well', 'just', 'will',
      'would', 'could', 'should', 'also', 'even', 'still', 'only', 'more',
      'most', 'some', 'many', 'such', 'than', 'them', 'they', 'were', 'what',
      'when', 'where', 'while', 'which', 'these', 'those', 'there', 'their',
      'then', 'here', 'your', 'you', 'are', 'can', 'had', 'has', 'but', 'not',
      'all', 'any', 'may', 'she', 'her', 'him', 'his', 'our', 'out', 'now',
      'how', 'its', 'who', 'oil', 'off', 'own', 'under', 'again', 'further',
      'once', 'down', 'too', 'each', 'few', 'more', 'other', 'some', 'such',
      'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very'
    ];

    for (const r of reviews) {

      const words = r.review
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/) 
        .filter(word => 
          word.length > 3 && 
          !stopWords.includes(word) && 
          !/^\d+$/.test(word)
        );

      words.forEach((word) => {
        keywordMap[word] = (keywordMap[word] || 0) + 1;
      });
    }

    const tags = Object.entries(keywordMap)
      .filter(([word, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([word]) => word);

    res.json(tags);
  } catch (error) {
    console.log("Error in getMostUsedTags:", error.message);
    res.status(500).json({ 
      message: "Error extracting tags",
      error: error.message 
    });
  }
};

// export const getReviewStats = async (req, res) => {

//   try {
//     const { productId } = req.params;
    
//     const reviews = await Review.find({ product: productId });
    
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

//     res.json(stats);
//   } catch (error) {
//     console.error("Error in getReviewStats:", error);
//     res.status(500).json({ 
//       message: "Error fetching review statistics",
//       error: error.message 
//     });
//   }
// };

// export const updateReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const { rating, review, image } = req.body;
//     const userId = req.user._id;

//     const existingReview = await Review.findById(reviewId);
//     if (!existingReview) {
//       return res.status(404).json({ message: "Review not found." });
//     }

//     if (existingReview.user.toString() !== userId.toString()) {
//       return res.status(403).json({ message: "You can only update your own reviews." });
//     }

//     if (!rating && !review && !image) {
//       return res.status(400).json({ 
//         message: "Please provide at least a rating, review text, or image." 
//       });
//     }

//     if (rating && (rating < 1 || rating > 5)) {
//       return res.status(400).json({ message: "Rating must be between 1 and 5." });
//     }

//     if (review && review.trim().length < 5) {
//       return res.status(400).json({ message: "Review must be at least 5 characters long." });
//     }

//     if (review && review.trim().length > 500) {
//       return res.status(400).json({ message: "Review must be less than 500 characters." });
//     }

//     let cloudinaryResponse = null;
//     if (image && image !== existingReview.image) {
//       try {
//         cloudinaryResponse = await cloudinary.uploader.upload(image, { 
//           folder: "reviews",
//           resource_type: "image",
//           transformation: [
//             { width: 800, height: 800, crop: "limit" },
//             { quality: "auto" }
//           ]
//         });
//       } catch (uploadError) {
//         console.error("Cloudinary upload error:", uploadError);
//         return res.status(400).json({ message: "Failed to upload image." });
//       }
//     }

//     const updateData = {};
//     if (rating) updateData.rating = parseInt(rating);
//     if (review !== undefined) updateData.review = review.trim();
//     if (cloudinaryResponse?.secure_url) updateData.image = cloudinaryResponse.secure_url;
//     updateData.updatedAt = new Date();

//     const updatedReview = await Review.findByIdAndUpdate(
//       reviewId,
//       updateData,
//       { new: true }
//     ).populate("user", "name");

//     res.json({
//       message: "Review updated successfully!",
//       review: updatedReview
//     });
//   } catch (error) {
//     console.error("Error in updateReview:", error);
//     res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };

// export const deleteReview = async (req, res) => {
//   try {
//     const { reviewId } = req.params;
//     const userId = req.user._id;

//     const review = await Review.findById(reviewId);
//     if (!review) {
//       return res.status(404).json({ message: "Review not found." });
//     }


//     if (review.user.toString() !== userId.toString() && req.user.role !== 'admin') {
//       return res.status(403).json({ message: "You can only delete your own reviews." });
//     }

//     await Review.findByIdAndDelete(reviewId);
    
//     res.json({ message: "Review deleted successfully!" });
//   } catch (error) {
//     console.error("Error in deleteReview:", error);
//     res.status(500).json({ 
//       message: "Server error", 
//       error: error.message 
//     });
//   }
// };





//        first


// import Review from "../models/review.model.js";

// export const addReview = async (req, res) => {
//   const { rating, review, productId } = req.body;
//   const userId = req.user._id;

//   try {
//     const existing = await Review.findOne({ user: userId, product: productId });
//     if (existing) {
//       return res.status(400).json({ message: "You have already reviewed this product." });
//     }

//     const newReview = await Review.create({
//       user: userId,
//       product: productId,
//       rating,
//       review,
//     });

//     res.status(201).json(newReview);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// export const getProductReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ product: req.params.productId })
//       .populate("user", "name");
//     res.json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching reviews", error: error.message });
//   }
// };


// export const getMostUsedTags = async (req, res) => {
// 	try {
// 		const reviews = await Review.find({ review: { $exists: true, $ne: "" } });

// 		const keywordMap = {};

// 		for (const r of reviews) {
// 			const words = r.review.toLowerCase().split(/\W+/); // split by word boundaries
// 			words.forEach((word) => {
// 				if (word.length > 3 && !["this", "that", "with", "have", "been", "from", "very"].includes(word)) {
// 					keywordMap[word] = (keywordMap[word] || 0) + 1;
// 				}
// 			});
// 		}

// 		const tags = Object.entries(keywordMap)
// 			.sort((a, b) => b[1] - a[1])
// 			.slice(0, 10)
// 			.map(([word]) => word);

// 		res.json(tags);
// 	} catch (error) {
// 		console.log("Error in getMostUsedTags:", error.message);
// 		res.status(500).json({ message: "Error extracting tags" });
// 	}
// };