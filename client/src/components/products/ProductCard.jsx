// src/components/products/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function ProductCard({ product }) {
  const { addItem } = (typeof useCart === 'function' ? useCart() : { addItem: () => {} });
  const wishlist = (typeof useWishlist === 'function' ? useWishlist() : null);

  return (
    <article className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
      <Link to={`/product/${product.id}`} className="block">
        <img
          src={product.images?.[0] || product.img}
          alt={product.name}
          loading="lazy"
          className="h-60 w-full object-cover"
        />
      </Link>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-[#343A40]">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.price}</p>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => addItem && addItem(product, 1)}
            className="flex-1 px-3 py-2 rounded-md bg-[#00C2A8] text-white text-sm font-medium cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>

          <button
            onClick={() => wishlist && wishlist.toggle?.(product)}
            className="px-3 py-2 rounded-md border border-gray-200 text-sm text-[#334155] cursor-pointer hover:bg-gray-200"
            aria-label="Toggle wishlist"
          >
            {wishlist && wishlist.has(product.id) ? 'Saved' : '♡'}
          </button>
        </div>
      </div>
    </article>
  );
}
