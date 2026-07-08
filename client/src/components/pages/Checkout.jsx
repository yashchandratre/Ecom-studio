import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    payment: "cash", // default payment method
  });

  const [error, setError] = useState("");

  const handlePlaceOrder = () => {
    if (!form.fullName || !form.phone || !form.address || !form.city || !form.postal) {
      setError("Please fill all the required fields.");
      return;
    }

    // Simulate order success
    clearCart();
    alert("Order placed successfully! 🎉");
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-[#0B2545]">Your cart is empty</h2>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-[#FF6A00] text-white rounded">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10 ">
      {/* Left — Checkout Form */}
      <div className="lg:col-span-2 space-y-6 shadow-xl rounded p-6">
        <h1 className="text-2xl font-bold text-[#0B2545]">Checkout</h1>

        <div className="bg-white border border-gray-300 rounded p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#0B2545]">Delivery Information</h2>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300  rounded px-3 py-2"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            placeholder="Address"
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
            rows={3}
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="City"
              className="border border-gray-300 rounded px-3 py-2"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border border-gray-300 rounded px-3 py-2"
              value={form.postal}
              onChange={(e) => setForm({ ...form, postal: e.target.value })}
            />
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white border border-gray-300 rounded p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[#0B2545]">Payment Method</h2>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.payment === "cash"}
              onChange={() => setForm({ ...form, payment: "cash" })}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.payment === "card"}
              onChange={() => setForm({ ...form, payment: "card" })}
            />
            Credit / Debit Card (Coming soon)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={form.payment === "upi"}
              onChange={() => setForm({ ...form, payment: "upi" })}
            />
            UPI (Coming soon)
          </label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handlePlaceOrder}
          className="mt-4 w-full lg:w-auto px-6 py-3 rounded bg-[#FF6A00] text-white font-semibold"
        >
          Place Order
        </button>
      </div>

      {/* Right — Order Summary */}
      <aside className="bg-white rounded p-6 space-y-4 shadow-xl ">
        <h2 className="text-lg font-semibold text-[#0B2545]">Order Summary</h2>

        {items.map((item) => (

          <div key={item.id} className="flex justify-between items-center border-b p-2 border-gray-300  pb-2">
            <div>
              <Link to={`/product/${item.id}`} className="block">
                <img
                  src={item.images?.[0] || item.img}
                  alt={item.name}
                  loading="lazy"
                  className="h-25 w-25 object-cover"
                />
              </Link>
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="text-xs text-gray-500">Qty: {item.qty}</div>
            </div>
            <div className="text-sm font-semibold">{item.price}</div>
          </div>
        ))}

        <div className="flex justify-between pt-2">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm font-medium">₹{totals.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Shipping</span>
          <span className="text-sm font-medium">
            {totals.shipping === 0 ? "Free" : `₹${totals.shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-2">
          <span>Total</span>
          <span>₹{totals.total.toFixed(2)}</span>
        </div>
      </aside>
    </div>
  );
}
