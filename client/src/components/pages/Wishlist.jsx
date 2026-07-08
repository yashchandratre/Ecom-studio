import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-extrabold text-[#0B2545]">Your wishlist</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.length === 0 && (
          <div className="text-sm text-gray-500 p-6 bg-white border rounded col-span-3">
            Your wishlist is empty. <Link to="/" className="text-[#FF6A00]">Browse products</Link>
          </div>
        )}

        {items.map((p) => (
          <div key={p.id} className="bg-white border rounded p-4 flex flex-col">
            <Link to={`/product/${p.id}`} className="block">
                  <img
                    src={p.images?.[0] || p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-44 object-cover"
                  />
                </Link>

            <div className="mt-3 flex-1">
              <div className="text-sm font-semibold text-[#0B2545]">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{p.price}</div>
            </div>

            <div className="mt-3 flex gap-2">
              <button onClick={() => addItem(p, 1)} className="flex-1 px-3 py-2 rounded bg-[#00C2A8] text-white cursor-pointer">Add to cart</button>
              <button onClick={() => remove(p.id)} className="px-3 py-2 rounded border cursor-pointer">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
