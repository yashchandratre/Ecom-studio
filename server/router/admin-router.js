const express = require("express");
const adminController = require("../controllers/admin-controller");
const { authMiddleware, adminMiddleware } = require("../controllers/auth-controller");

const router = express.Router();

// Anything registered below this line requires:
// 1. a valid JWT
// 2. a MongoDB user with isAdmin: true
router.use(authMiddleware, adminMiddleware);

// Dashboard summary cards and recent orders.
router.get("/dashboard", adminController.getDashboard);

// Product CRUD: list/create on collection, update/delete on one id.
router
  .route("/products")
  .get(adminController.listProducts)
  .post(adminController.createProduct);
router
  .route("/products/:id")
  .put(adminController.updateProduct)
  .delete(adminController.deleteProduct);

// Category CRUD for product organization.
router
  .route("/categories")
  .get(adminController.listCategories)
  .post(adminController.createCategory);
router
  .route("/categories/:id")
  .put(adminController.updateCategory)
  .delete(adminController.deleteCategory);

// Orders are not deleted from admin here; only status fields are managed.
router.get("/orders", adminController.listOrders);
router.patch("/orders/:id", adminController.updateOrder);

// Users page can list users and toggle isAdmin role.
router.get("/users", adminController.listUsers);
router.patch("/users/:id/role", adminController.updateUserRole);

// Review moderation: list and delete.
router.get("/reviews", adminController.listReviews);
router.delete("/reviews/:id", adminController.deleteReview);

module.exports = router;
