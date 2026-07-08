// src/components/products/ProductGrid.jsx
import React, { Suspense } from 'react';
const ProductCard = React.lazy(() => import('./ProductCard'));

export default function ProductGrid({ products }) {
  return (
    <div className="grid m-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((p) => (
        <Suspense key={p.id} fallback={<div className="h-48 bg-gray-100 rounded animate-pulse" />}>
          <ProductCard product={p} />
        </Suspense>
      ))}
    </div>
  );
}
