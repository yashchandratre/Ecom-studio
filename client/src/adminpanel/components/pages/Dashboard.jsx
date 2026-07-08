import React, { useEffect, useState } from "react";
import { Boxes, FolderTree, IndianRupee, ShoppingBag, Star, Users } from "lucide-react";
import API from "../../../components/API/api";
import StatCard from "../Layout/StatCard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // One request gives the dashboard all top-level counts plus recent orders.
    API.get("/admin/dashboard")
      .then((res) => setDashboard(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-sm text-slate-500">Loading dashboard...</div>;

  // Keep fallback values so the UI does not crash if the database is empty.
  const stats = dashboard?.stats || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Store overview and recent activity</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* Each StatCard receives an icon and one number from /admin/dashboard. */}
        <StatCard icon={IndianRupee} title="Revenue" value={`INR ${stats.revenue || 0}`} />
        <StatCard icon={ShoppingBag} title="Orders" value={stats.orders || 0} />
        <StatCard icon={Boxes} title="Products" value={stats.products || 0} />
        <StatCard icon={FolderTree} title="Categories" value={stats.categories || 0} />
        <StatCard icon={Users} title="Users" value={stats.users || 0} />
        <StatCard icon={Star} title="Reviews" value={stats.reviews || 0} />
      </div>

      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Recent orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {/* Recent orders are intentionally read-only here; edit statuses in Orders page. */}
              {(dashboard?.recentOrders || []).map((order) => (
                <tr key={order._id} className="border-t border-slate-100">
                  <td className="px-4 py-3">{order.user_id?.fname || "Customer"}</td>
                  <td className="px-4 py-3 capitalize">{order.orderStatus}</td>
                  <td className="px-4 py-3 capitalize">{order.paymentStatus}</td>
                  <td className="px-4 py-3">INR {order.totalAmount}</td>
                </tr>
              ))}
              {!dashboard?.recentOrders?.length && (
                <tr>
                  <td className="px-4 py-6 text-slate-500" colSpan="4">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
