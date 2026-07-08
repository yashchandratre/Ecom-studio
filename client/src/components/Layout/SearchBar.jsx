import React from 'react';


export default function SearchBar() {
return (
<label className="relative block">
<input
className="placeholder-gray-400 pl-3 pr-10 py-2 w-56 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2A8]/30"
placeholder="Search products, brands..."
/>
<span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-400">⌕</span>
</label>
);
}