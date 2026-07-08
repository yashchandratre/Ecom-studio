import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-8 text-sm text-gray-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} ECom Studio. All rights reserved.</div>
        <div className="flex gap-4">
          <Link to="#"  className="hover:text-[#0B2545]">Privacy</Link>
          <Link to="#"  className="hover:text-[#0B2545]">Terms</Link>
          <Link to="/contact"  className="hover:text-[#0B2545]">Contact</Link>
        </div>
      </div>
    </footer>
  );
}