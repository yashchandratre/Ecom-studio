import React, { createContext, useContext, useEffect, useState } from 'react';

const WISH_KEY = 'ecom_wishlist_v1';
const WishlistContext = createContext();

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]); // array of product ids or product objects

  useEffect(() => {
    try {
      const raw = localStorage.getItem(WISH_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load wishlist', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(WISH_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save wishlist', e);
    }
  }, [items]);

  const add = (product) => {
    // store minimal product snapshot
    setItems((cur) => {
      if (cur.find((p) => p.id === product.id)) return cur;
      return [...cur, { id: product.id, name: product.name, price: product.price, img: product.images?.[0] || product.img }];
    });
  };

  const remove = (productId) => {
    setItems((cur) => cur.filter((p) => p.id !== productId));
  };

  const toggle = (product) => {
    if (items.find((p) => p.id === product.id)) remove(product.id);
    else add(product);
  };

  const clear = () => setItems([]);

  const has = (productId) => items.some((p) => p.id === productId);

  return (
    <WishlistContext.Provider value={{ items, add, remove, toggle, clear, has }}>
      {children}
    </WishlistContext.Provider>
  );
}
