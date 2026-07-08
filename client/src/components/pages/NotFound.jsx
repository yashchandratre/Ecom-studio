import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-[#0B2545] mb-3">404</h1>
      <p className="text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>

      <Link
        to="/"
        className="px-6 py-3 bg-[#FF6A00] text-white rounded-md hover:bg-[#FF6A34] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
