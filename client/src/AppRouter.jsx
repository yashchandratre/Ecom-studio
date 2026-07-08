// src/AppRouter.jsx
import React from 'react';
import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';

// Layout + pages (adjust these paths if your project structure differs)
import Layout from './components/Layout/Layout.jsx';
import Home from './components/pages/Home.jsx';
import Login from './components/authorization/Login.jsx';
import Signup from './components/authorization/Signup.jsx';
import Contactus from './components/pages/Contactus.jsx';
import ProductPage from './components/pages/Product.jsx';
import CartPage from './components/pages/Cart.jsx';
import WishlistPage from './components/pages/Wishlist.jsx';
import CheckoutPage from './components/pages/Checkout.jsx'; // optional - create if needed
import NotFound from './components/pages/NotFound.jsx'; // optional 404 page
import Checkout from './components/pages/Checkout.jsx';
// Admin pages
import AdminLayout from './adminpanel/components/Layout/AdminLayout.jsx';
import ProtectedAdminRoute from './adminpanel/auth/ProtectedAdminRoute.jsx';
import AdminLogin from './adminpanel/components/pages/AdminLogin.jsx';
import Dashboard from './adminpanel/components/pages/Dashboard.jsx';
import ProductsPage from './adminpanel/components/pages/ProductsPage.jsx';
import CategoriesPage from './adminpanel/components/pages/CategoriesPage.jsx';
import OrdersPage from './adminpanel/components/pages/OrdersPage.jsx';
import UsersPage from './adminpanel/components/pages/UsersPage.jsx';
import ReviewsPage from './adminpanel/components/pages/ReviewsPage.jsx';
// import Dashbord from './adminpanel/components/pages/Dashbord.jsx';
// at top of file
import Login2 from './CrudPractice/Login.jsx'
import Registration from './CrudPractice/Registration.jsx'
import Home2 from './CrudPractice/Home.jsx'
import Edit from './CrudPractice/Edit.jsx'
// lazy load pages
const Shop = lazy(() => import('./components/pages/Shop.jsx'));
const Collections = lazy(() => import('./components/pages/Collections.jsx'));



export default function AppRouter() {
  
  return (

    <Routes>

      {/* Crud App Routes */}
      <Route path='/crud' element={<Login2 />}/>
      <Route path='/crud/register' element={<Registration />} />
      <Route path='/crud/home' element={<Home2 />} />
      <Route path='/crud/Edit/:id' element={<Edit />} />


      {/* Admin routes:
          /admin/login is public so admins can sign in.
          Everything inside ProtectedAdminRoute requires an admin session. */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedAdminRoute />}>
        {/* AdminLayout provides the shared sidebar/header and Outlet renders pages. */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Route>
      {/* Client routes */}
      <Route path="/" element={<Layout />}>
        {/* index route */}
        <Route index element={<Home />} />

        {/* auth */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* site pages */}
        <Route path="contact" element={<Contactus />} />
        <Route path="product/:id" element={<ProductPage />} />

        {/* cart & wishlist */}
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />

        {/* optional checkout route */}
        <Route path="checkout" element={CheckoutPage ? <Checkout /> : <div>Checkout (implement)</div>} />

        {/* Shop and Collection route */}
        <Route path="shop" element={
          <Suspense fallback={<div className="p-8 text-center">Loading shop...</div>}>
            <Shop />
          </Suspense>
        } />

        <Route path="collections" element={
          <Suspense fallback={<div className="p-8 text-center">Loading collections...</div>}>
            <Collections />
          </Suspense>
        } />



        {/* 404 fallback */}
        <Route path="*" element={NotFound ? <NotFound /> : <div className="p-8">Page not found</div>} />
      </Route>
    </Routes>
  );
}
