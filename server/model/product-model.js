const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    special_price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        // Product cards need at least one image to render properly.
        validator: (value) => Array.isArray(value) && value.length > 0,
        message: "At least one product image is required.",
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      // This ref must match mongoose.model("Category", ...) in category-model.js.
      ref: "Category",
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Business rule: discounted/special price should not exceed regular price.
productSchema.path("special_price").validate(function validateSpecialPrice(value) {
  return value <= this.price;
}, "Special price cannot be greater than the regular price.");

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
