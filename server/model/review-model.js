const mongoose = require("mongoose");

// Reviews connect one user to one product with a rating and optional comment.
const reviewSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      // Must match mongoose.model("Product", ...) in product-model.js.
      ref: "Product",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      // Must match mongoose.model("User", ...) in user-model.js.
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      // Rating is limited to the standard 1 to 5 range.
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent one user from reviewing the same product multiple times.
reviewSchema.index({ product_id: 1, user_id: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
