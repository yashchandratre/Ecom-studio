import React, { useEffect, useState } from "react";
import API from "../../../components/API/api";

const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
const paymentStatuses = ["pending", "paid", "failed"];

export default function OrdersPage() {
  // Admin screen state: the table is refreshed after every status update.
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    // Backend populates user/product names so the table can show readable data.
    const res = await API.get("/admin/orders");
    setOrders(res.data.orders || []);
  };

  useEffect(() => {
    // Load orders once when the admin opens this page.
    loadOrders();
  }, []);

  const updateOrder = async (id, payload) => {
    // Status changes save immediately from the select box for faster admin work.
    await API.patch(`/admin/orders/${id}`, payload);
    await loadOrders();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Orders</h1>
        <p className="text-sm text-slate-500">Track order and payment status</p>
      </div>

      <section className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-500">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Items</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Order status</th>
              <th className="px-4 py-3">Payment</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">{order._id.slice(-8)}</td>
                <td className="px-4 py-3">{order.user_id?.fname || order.shippingAddress?.fullName || "Customer"}</td>
                <td className="px-4 py-3">{order.items?.length || 0}</td>
                <td className="px-4 py-3">INR {order.totalAmount}</td>
                <td className="px-4 py-3">
                  {/* Changing this select immediately calls PATCH /api/admin/orders/:id. */}
                  <select className="rounded-md border border-slate-300 px-2 py-1" value={order.orderStatus} onChange={(event) => updateOrder(order._id, { orderStatus: event.target.value })}>
                    {orderStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3">
                  {/* Payment changes also save immediately and can set paidAt on backend. */}
                  <select className="rounded-md border border-slate-300 px-2 py-1" value={order.paymentStatus} onChange={(event) => updateOrder(order._id, { paymentStatus: event.target.value })}>
                    {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {!orders.length && (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="6">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
