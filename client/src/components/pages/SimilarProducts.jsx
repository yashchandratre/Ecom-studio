import React from 'react';
import products from '../data/Products';
import { Link } from 'react-router-dom';

export default function SimilarProducts({ currentId }) {
  // naive similarity: show other products (exclude current), pick first 4
  const list = products.filter((p) => p.id !== currentId).slice(0, 4);

  return (
    <>
      <div className='text-right text-[#FF6A00]'>
        <Link to="/collections">View More</Link>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {list.map((p) => (
          <Link to={`/product/${p.id}`} key={p.id} className="block bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md">
            <img src={p.img} alt={p.name} className="w-full h-36 object-cover" />
            <div className="p-3">
              <div className="text-sm font-semibold text-[#0B2545]">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{p.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
