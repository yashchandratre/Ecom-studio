import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import API from "../../../components/API/api";

export default function ReviewsPage() {
  // Reviews are loaded with product and user details populated by the backend.
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    // GET /admin/reviews returns moderation data for the table.
    const res = await API.get("/admin/reviews");
    setReviews(res.data.reviews || []);
  };

  useEffect(() => {
    // Initial moderation list load.
    loadReviews();
  }, []);

  const deleteReview = async (id) => {
    // Review moderation is intentionally destructive, so confirm first.
    if (!window.confirm("Delete this review?")) return;
    await API.delete(`/admin/reviews/${id}`);
    await loadReviews();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Reviews</h1>
        <p className="text-sm text-slate-500">Moderate customer feedback</p>
      </div>

      <section className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Comment</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} className="border-t border-slate-100">
                <td className="px-4 py-3">{review.product_id?.product_name || "Product"}</td>
                <td className="px-4 py-3">{review.user_id?.email || "User"}</td>
                <td className="px-4 py-3">{review.rating}/5</td>
                <td className="px-4 py-3 max-w-lg">{review.comment || "-"}</td>
                <td className="px-4 py-3">
                  <button onClick={() => deleteReview(review._id)} className="rounded-md border border-red-200 p-2 text-red-600" title="Delete review"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {!reviews.length && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="5">No reviews found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
