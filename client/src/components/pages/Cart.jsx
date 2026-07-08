import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, updateQty, removeItem, totals, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0B2545]">Shopping cart</h1>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.length === 0 && (
            <div className="text-sm text-gray-500 p-6 bg-white border rounded">
              Your cart is empty. <Link to="/" className="text-[#FF6A00]">Continue shopping</Link>
            </div>
          )}

          {items.map((it) => (
            <div key={it.id} className="flex gap-4 bg-white p-4 border rounded items-center">
              <img src={it.img} alt={it.name} className="w-28 h-28 object-cover rounded" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-[#0B2545]">{it.name}</div>
                    <div className="text-xs text-gray-500">{it.sku}</div>
                  </div>
                  <div className="text-sm">{it.price}</div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <button onClick={() => updateQty(it.id, Math.max(1, (it.qty || 1) - 1))} className="px-3 py-1 border rounded">−</button>
                  <input value={it.qty} onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value) || 1))} className="w-14 text-center border rounded px-1 py-1" />
                  <button onClick={() => updateQty(it.id, (it.qty || 1) + 1)} className="px-3 py-1 border rounded">+</button>

                  <button onClick={() => removeItem(it.id)} className="ml-auto text-sm text-red-500 cursor-pointer">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-white border p-4 rounded">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">Subtotal</div>
            <div className="font-semibold">₹{totals.subtotal.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">Shipping</div>
            <div className="font-semibold">{totals.shipping > 0 ? `₹${totals.shipping.toFixed(2)}` : 'Free'}</div>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-700 font-semibold">Total</div>
            <div className="text-lg font-bold">₹{totals.total.toFixed(2)}</div>
          </div>

          <Link to="/checkout" onClick={() => alert('Proceed to checkout')} className="w-full px-4 py-3 rounded bg-[#FF6A00] text-white font-semibold cursor-pointer block text-center">Proceed to checkout</Link>

          <div className="mt-3 flex gap-2">
            <button onClick={() => clearCart()} className="flex-1 px-3 py-2 rounded border cursor-pointer">Clear</button>
            <Link to="/shop" className="flex-1 px-3 py-2 rounded border text-center">Continue shopping</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
