import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Nav from './Nav';
import SearchBar from './SearchBar';
import { useCart } from '../contexts/CartContext'; // keep import but call inside component

export default function Header() {
  const { openCart, totals } = useCart(); // <-- CALL HOOK INSIDE THE COMPONENT
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef(null);

  // lock body scroll when drawer open (mobile drawer local state)
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // close on ESC (for mobile drawer)
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const MobileNav = ({ onLink }) => (
    <div className="flex flex-col gap-1">
      <Link to="/" onClick={onLink} className="block px-4 py-3 rounded hover:bg-gray-100">Home</Link>
      <Link to="/shop" onClick={onLink} className="block px-4 py-3 rounded hover:bg-gray-100">Shop</Link>
      <Link to="/collections" onClick={onLink} className="block px-4 py-3 rounded hover:bg-gray-100">Collections</Link>
      <Link to="/about" onClick={onLink} className="block px-4 py-3 rounded hover:bg-gray-100">About</Link>
      <Link to="/wishlist" onClick={onLink} className="block px-4 py-3 rounded hover:bg-gray-100">Wishlist</Link>

    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              {/* Mobile hamburger */}
              <button
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 mr-1 md:mr-3 lg:hidden focus:outline-none focus:ring-2 focus:ring-[#00C2A8]/40"
              >
                <svg className="h-6 w-6 text-[#334155] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <Logo />
              <Nav />
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:block">
                <SearchBar />
              </div>

              <Link to="/login" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border border-gray-200 text-[#334155] cursor-pointer hover:bg-gray-100 transition">
                Sign in
              </Link>

              <button
                onClick={openCart} // <-- open cart drawer from context
                className="relative inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-[#FF6A00] text-white shadow-sm hover:opacity-95 hover:bg-[#FF6A34] cursor-pointer"
                aria-label="Open cart"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6M17 13l1.2 6M6 21h12" />
                </svg>

                <span className="ml-1 px-2 py-0.5 text-xs rounded bg-white/30">
                  {totals?.count ?? 0}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer + Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-lg transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} z-60`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <Logo />
          <div className="flex items-center gap-2">
            <Link to="/login" onClick={() => setOpen(false)} className="text-sm text-[#334155] px-3 py-1 rounded hover:bg-gray-100">Sign in</Link>
            <button
              ref={closeButtonRef}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00C2A8]/40"
            >
              <svg className="h-6 w-6 text-[#334155]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-4 py-4 overflow-y-auto h-full">
          <div className="mb-4 md:hidden">
            <SearchBar />
          </div>

          <div className="mb-6">
            <MobileNav onLink={() => setOpen(false)} />
          </div>

          <div className="mb-4">
            <Link to="/signup" onClick={() => setOpen(false)} className="block w-full text-center px-4 py-3 rounded-md bg-[#0B2545] text-white font-semibold">Create account</Link>
          </div>

          <div className="text-sm text-gray-500">
            <div className="mb-3">Customer service</div>
            <a href="#" className="block mb-1 hover:underline">Help center</a>
            <a href="#" className="block mb-1 hover:underline">Shipping & returns</a>
            <a href="#" className="block mb-1 hover:underline">Contact us</a>
          </div>
        </div>
      </aside>
    </>
  );
}
