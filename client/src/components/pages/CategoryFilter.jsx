// src/components/CategoryFilter.jsx
import React from 'react';

export default function CategoryFilter({ products, value, onChange }) {
  const categories = Array.from(
    new Set((products || []).flatMap((p) => (p.category ? [p.category] : p.categories || [])))
  );

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-2 py-1 text-[#FF6A00] ${value === null ? 'bg-[#007BFF] text-white' : 'bg-white '}`}
      >
        All
      </button>

      {categories.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`px-2 text-[#FF6A00] py-1 rounded ${value === c ? 'bg-[#007BFF] text-white' : 'bg-white '}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
