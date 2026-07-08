// src/components/pages/Shop.jsx
import React, { useMemo, useState } from 'react';
import products from '../data/Products.jsx';
import CategoryFilter from './CategoryFilter.jsx';
const ProductGrid = React.lazy(() => import('../products/ProductGrid.jsx'));

export default function Shop() {
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 15;

  const filtered = useMemo(() => {
    let list = products || [];
    if (category) {
      list = list.filter((p) => (p.category ? p.category === category : (p.category || []).includes(category)));
    }
    return list;
  }, [category]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-[#343A40]">Shop</h1>
        <CategoryFilter products={products} value={category} onChange={(c) => { setCategory(c); setPage(1); }} />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of {filtered.length}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border border-gray-200 rounded cursor-pointer">Prev</button>
          <div className="px-3 py-1 border border-gray-200 rounded">Page {page} / {pageCount}</div>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="px-3 py-1 border border-gray-200 rounded cursor-pointer">Next</button>
        </div>
      </div>

      <div className="mt-6">
        <React.Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: perPage }).map((_,i)=>(<div key={i} className="h-48 bg-gray-100 rounded animate-pulse" />))}
        </div>}>
          <ProductGrid products={pageItems} />
        </React.Suspense>
      </div>

      {/* pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1} - {Math.min(page * perPage, filtered.length)} of {filtered.length}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border border-gray-200 rounded cursor-pointer">Prev</button>
          <div className="px-3 py-1 border border-gray-200 rounded">Page {page} / {pageCount}</div>
          <button onClick={() => setPage((p) => Math.min(pageCount, p + 1))} disabled={page === pageCount} className="px-3 py-1 border border-gray-200 rounded cursor-pointer">Next</button>
        </div>
      </div>
    </div>
  );
}
