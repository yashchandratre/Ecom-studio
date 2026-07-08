import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// LocalStorage key
const CART_KEY = 'ecom_cart_v1';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, price, img, qty, sku }
  const [open, setOpen] = useState(false);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      console.warn('Failed to load cart from localStorage', e);
    }
  }, []);

  // persist to localStorage when items change
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  // helpers
  const addItem = (product, qty = 1) => {
    setItems((cur) => {
      const idx = cur.findIndex((c) => c.id === product.id);
      if (idx >= 0) {
        const next = [...cur];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...cur, { id: product.id, name: product.name, price: product.price, img: product.images?.[0] || product.img, qty, sku: product.sku }];
    });
    setOpen(true);
  };
  const addItemFromBuy = (product, qty = 1) => {
    setItems((cur) => {
      const idx = cur.findIndex((c) => c.id === product.id);
      if (idx >= 0) {
        const next = [...cur];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...cur, { id: product.id, name: product.name, price: product.price, img: product.images?.[0] || product.img, qty, sku: product.sku }];
    });
  };

  const updateQty = (productId, qty) => {
    setItems((cur) => cur.map((i) => (i.id === productId ? { ...i, qty: Math.max(1, qty) } : i)));
  };

  const removeItem = (productId) => {
    setItems((cur) => cur.filter((i) => i.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);
  const toggleCart = () => setOpen((o) => !o);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => {
      // price may be formatted string '₹4,499' — try to parse numbers; otherwise assume 0
      const num = Number(String(it.price).replace(/[^\d.-]/g, '')) || 0;
      return s + num * (it.qty || 1);
    }, 0);
    const shipping = subtotal > 0 && subtotal < 1499 ? 99 : 0; // example rule
    const total = subtotal + shipping;
    return { subtotal, shipping, total, count: items.reduce((s, i) => s + (i.qty || 0), 0) };
  }, [items]);

  return (
    <CartContext.Provider value={{
      items, addItem, updateQty, removeItem, clearCart,addItemFromBuy,
      open, openCart, closeCart, toggleCart,
      totals,
    }}>
      {children}
    </CartContext.Provider>
  );
}
