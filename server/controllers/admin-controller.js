const Category = require("../model/category-model");
const Order = require("../model/order-model");
const Product = require("../model/product-model");
const Review = require("../model/review-model");
const User = require("../model/user-model");

// Admin controller contains only admin-only data operations.
// router/admin-router.js protects every function here with auth + isAdmin checks.

const getDashboard = async (req, res) => {
  try {
    // Promise.all runs independent count queries at the same time for a faster dashboard.
    const [products, categories, orders, users, reviews, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Review.countDocuments(),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user_id", "fname email")
        .lean(),
    ]);

    // Aggregate calculates total revenue from all non-cancelled orders.
    const revenue = await Order.aggregate([
      { $match: { orderStatus: { $ne: "cancelled" } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    return res.json({
      stats: {
        products,
        categories,
        orders,
        users,
        reviews,
        revenue: revenue[0]?.total || 0,
      },
      recentOrders,
    });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to load dashboard", error: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    // populate("category", "name") replaces category id with only the category name.
    const products = await Product.find().sort({ createdAt: -1 }).populate("category", "name");
    return res.json({ products });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to load products", error: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    // Mongoose validates required fields, number minimums, and special price rules.
    const product = await Product.create(req.body);
    return res.status(201).json({ msg: "Product created", product });
  } catch (error) {
    return res.status(400).json({ msg: "Unable to create product", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // runValidators makes update operations obey the schema validators too.
      runValidators: true,
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    return res.json({ msg: "Product updated", product });
  } catch (error) {
    return res.status(400).json({ msg: "Unable to update product", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // findByIdAndDelete returns null when the id does not exist.
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    return res.json({ msg: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to delete product", error: error.message });
  }
};

const listCategories = async (req, res) => {
  try {
    // Latest categories first keeps new admin work visible at the top.
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.json({ categories });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to load categories", error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    // Category schema enforces unique names.
    const category = await Category.create(req.body);
    return res.status(201).json({ msg: "Category created", category });
  } catch (error) {
    return res.status(400).json({ msg: "Unable to create category", error: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!category) return res.status(404).json({ msg: "Category not found" });

    return res.json({ msg: "Category updated", category });
  } catch (error) {
    return res.status(400).json({ msg: "Unable to update category", error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ msg: "Category not found" });
    return res.json({ msg: "Category deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to delete category", error: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    // Admin needs customer and product names, so ids are populated for display.
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("user_id", "fname email")
      .populate("items.product_id", "product_name");
    return res.json({ orders });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to load orders", error: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    // Only allow status fields to be changed from this endpoint.
    const update = {
      orderStatus: req.body.orderStatus,
      paymentStatus: req.body.paymentStatus,
    };

    // Store timestamps automatically when an order/payment reaches final states.
    if (req.body.orderStatus === "delivered") update.deliveredAt = new Date();
    if (req.body.paymentStatus === "paid") update.paidAt = new Date();

    // Remove fields that were not sent, so partial updates do not overwrite data.
    Object.keys(update).forEach((key) => update[key] === undefined && delete update[key]);

    const order = await Order.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!order) return res.status(404).json({ msg: "Order not found" });

    return res.json({ msg: "Order updated", order });
  } catch (error) {
    return res.status(400).json({ msg: "Unable to update order", error: error.message });
  }
};

const listUsers = async (req, res) => {
  try {
    // Never send password hashes to the admin UI.
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to load users", error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    // This is the switch that grants/removes admin access.
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: req.body.isAdmin },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json({ msg: "User role updated", user });
  } catch (error) {
    return res.status(400).json({ msg: "Unable to update user", error: error.message });
  }
};

const listReviews = async (req, res) => {
  try {
    // Populate both sides so admins can see who reviewed which product.
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate("product_id", "product_name")
      .populate("user_id", "fname email");
    return res.json({ reviews });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to load reviews", error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    // Moderation endpoint for removing inappropriate or duplicate reviews.
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ msg: "Review not found" });
    return res.json({ msg: "Review deleted" });
  } catch (error) {
    return res.status(500).json({ msg: "Unable to delete review", error: error.message });
  }
};

module.exports = {
  getDashboard,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  listOrders,
  updateOrder,
  listUsers,
  updateUserRole,
  listReviews,
  deleteReview,
};
