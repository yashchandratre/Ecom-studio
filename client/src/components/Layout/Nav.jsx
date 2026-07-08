import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ onNavigate } = {}) {
  // onNavigate is optional callback to close mobile drawer when link clicked
  const handleClick = (ev) => {
    if (typeof onNavigate === 'function') onNavigate();
  };

  return (
    <nav className="hidden lg:flex items-center gap-4 text-sm text-[#334155]">
      <Link to="/" onClick={handleClick} className="hover:text-[#030e1a]">Home</Link>
      <Link to="/shop" onClick={handleClick} className="hover:text-[#030e1a]">Shop</Link>
      <Link to="/collections" onClick={handleClick} className="hover:text-[#030e1a]">Collections</Link>
      <Link to="/about" onClick={handleClick} className="hover:text-[#030e1a]">About</Link>
      <Link to="/wishlist" onClick={handleClick} className="hover:text-[#030e1a]">Wishlist</Link>
    </nav>
  );
}
