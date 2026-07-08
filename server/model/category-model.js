const mongoose = require("mongoose");

// Category groups products in the admin catalog.
// Product.category uses ref: "Category" to connect to this model.
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique creates a MongoDB index so duplicate category names are rejected.
      unique: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      // Inactive categories can stay in database without being shown publicly.
      default: true,
    },
  },
  { timestamps: true }
);

// Singular model names are easier to match in ref fields.
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
