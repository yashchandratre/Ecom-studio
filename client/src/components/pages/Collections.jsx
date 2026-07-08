// src/components/pages/Collections.jsx
import React, { useMemo, useState } from 'react';
import products from '../data/Products.jsx';
import CategoryFilter from './CategoryFilter.jsx';
const ProductGrid = React.lazy(() => import('../products/ProductGrid.jsx'));

export default function Collections() {
  
 const [category, setCategory] = useState(null);
 

 const featured = useMemo(() => {
    let list = products || [];
    if (category) {
      list = list.filter((p) => (p.category ? p.category === category : (p.category || []).includes(category)));
    }
    return list;
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-[#343A40]">Collections</h1><CategoryFilter products={products} value={category} onChange={(c) => { setCategory(c); setPage(1); }} />
      </div>

        <div className="mt-6">
        <h2 className="text-lg font-semibold text-[#343A40]">Featured</h2>

        <React.Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_,i)=>(<div key={i} className="h-48 bg-gray-100 rounded animate-pulse" />))}
        </div>}>
          <div className="mt-4">
            <ProductGrid products={featured} />
          </div>
        </React.Suspense>
      </div>
    </div>
  );
}
