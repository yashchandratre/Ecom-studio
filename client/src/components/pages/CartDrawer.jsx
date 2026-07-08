import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

export default function CartDrawer() {
  const { items, open, closeCart, updateQty, removeItem, totals, clearCart } = useCart();

  return (
    <>
      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={closeCart} />

      <aside className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full' } z-50`}>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="text-lg font-semibold text-[#0B2545]">Your cart</div>
          <div className="text-sm text-gray-500">{totals.count} item(s)</div>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(80vh-220px)] space-y-4">
          {items.length === 0 && <div className="text-sm text-gray-500">Your cart is empty.</div>}

          {items.map((it) => (
            <div key={it.id} className="flex gap-3 items-start">
              <img src={it.img} alt={it.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-[#0B2545]">{it.name}</div>
                    <div className="text-xs text-gray-500">{it.sku || ''}</div>
                  </div>
                  <div className="text-sm text-gray-700">{it.price}</div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => updateQty(it.id, Math.max(1, (it.qty || 1) - 1))} className="px-2 py-1 border rounded">−</button>
                  <input value={it.qty} onChange={(e) => updateQty(it.id, Math.max(1, Number(e.target.value) || 1))} className="w-12 text-center border rounded px-1 py-1" />
                  <button onClick={() => updateQty(it.id, (it.qty || 1) + 1)} className="px-2 py-1 border rounded">+</button>
                  <button onClick={() => removeItem(it.id)} className="ml-auto text-sm text-red-500">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
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

          <div className="flex gap-2">
            <Link to="/cart" onClick={closeCart} className="flex-1 px-4 py-3 rounded bg-white border text-[#334155] text-center">View cart</Link>
            <Link to="/checkout" onClick={closeCart} className="flex-1 px-4 py-3 rounded bg-[#FF6A00] text-white font-semibold">Checkout</Link>
          </div>

          <div className="mt-3 text-center">
            <button onClick={() => clearCart()} className="text-sm text-gray-500">Clear cart</button>
          </div>
        </div>
      </aside>
    </>
  );
}
