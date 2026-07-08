import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import products from '../data/Products';
import SimilarProducts from './SimilarProducts';
import ReviewList from './ReviewList';
import ProductGallery from './ProductGallery';

import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const productId = Number(id);

    // find product (fallback if not found)
    const product = products.find((p) => p.id === productId) || {
        id: 0,
        name: 'Product not found',
        price: '—',
        sku: '—',
        stock: 0,
        images: [
            'https://via.placeholder.com/800x600?text=No+Image',
            'https://via.placeholder.com/800x600?text=No+Image',
            'https://via.placeholder.com/800x600?text=No+Image',
        ],
        description: 'We could not find this product.',
    };

    // product images: if product.images not present, create from product.img
    const images = product.images || [
        product.img,
        product.img,
        product.img,
    ];

    const [qty, setQty] = useState(1);
    const [cartAdding, setCartAdding] = useState(false);


    const { addItem } = (typeof useCart === 'function' ? useCart() : { addItem: () => { } });
    const { addItemFromBuy } = (typeof useCart === 'function' ? useCart() : { addItemFromBuy: () => { } });
    const wishlist = (typeof useWishlist === 'function' ? useWishlist() : null);


    const handleBuyNow = async () => {
        // placeholder: add to cart + go to checkout
        setCartAdding(true);
        await new Promise((r) => setTimeout(r, 300));
        setCartAdding(false);
        // simulate checkout redirect
        addItemFromBuy && addItemFromBuy(product, 1)
        navigate('/checkout', { state: { product, qty } });
    };


    // derived average rating & review count
    const reviews = useMemo(() => product.reviews || [], [product]);
    const avgRating = useMemo(() => {
        if (!reviews.length) return 0;
        const sum = reviews.reduce((s, r) => s + (r.rating || 0), 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }, [reviews]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Gallery */}
                <div className="lg:col-span-2">
                    <ProductGallery images={images} />
                </div>
                {/* Details */}
                <div className="lg:col-span-3">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                        <div>
                            <h1 className="text-2xl font-extrabold text-[#0B2545]">{product.name}</h1>
                            <div className="mt-2 text-sm text-gray-500">SKU: {product.sku || '—'}</div>
                            <div className="mt-2 flex items-center gap-3">
                                <div className="text-2xl font-bold text-[#0B2545]">{product.price}</div>
                                <div className="text-sm text-gray-500">| {product.stock > 10 ? 'In stock' : <span className='text-red-600'>Only {product.stock} Left</span>}</div>
                                <div className="ml-3 text-sm text-gray-400">· {reviews.length} reviews · {avgRating ? `${avgRating}★` : 'No rating'}</div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col items-end gap-3">
                            <div className="text-sm text-gray-500">Share</div>
                            <div className="flex gap-2">
                                <button className="px-2 py-1 rounded bg-gray-100 text-sm">FB</button>
                                <button className="px-2 py-1 rounded bg-gray-100 text-sm">TW</button>
                                <button className="px-2 py-1 rounded bg-gray-100 text-sm">LI</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-[#0B2545]">Product details</h3>
                            <p className="mt-2 text-gray-600">{product.description || 'No description available.'}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="text-sm text-gray-700">Quantity</div>
                                <div className="ml-auto flex items-center gap-2">
                                    <button
                                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                                        className="px-3 py-1 rounded border border-gray-200"
                                        aria-label="decrease quantity"
                                    >−</button>
                                    <input
                                        value={qty}
                                        onChange={(e) => {
                                            const val = Number(e.target.value) || 1;
                                            setQty(Math.max(1, Math.min(val, product.stock || 999)));
                                        }}
                                        className="w-14 text-center px-2 py-1 border border-gray-200 rounded"
                                    />
                                    <button
                                        onClick={() => setQty((q) => Math.min((product.stock || 999), q + 1))}
                                        className="px-3 py-1 rounded border border-gray-200"
                                        aria-label="increase quantity"
                                    >+</button>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => addItem && addItem(product, 1)}
                                    className="flex-1 px-3 py-2 rounded-md bg-[#00C2A8] text-white text-sm font-medium"
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    Add to cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-gray-200 text-[#334155] bg-white font-semibold hover:bg-[#FF6A00]/5 cursor-pointer"
                                >
                                    Buy now
                                </button>
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                <div>Free shipping above ₹1,499</div>
                                <div className="mt-1">30-day easy returns</div>
                            </div>
                        </div>
                    </div>
                    {/* Reviews */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-[#0B2545]">Customer reviews</h3>
                        <ReviewList reviews={reviews} productId={product.id} />
                    </div>

                    {/* Similar products */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold text-[#0B2545]">Similar products</h3>
                        <SimilarProducts currentId={product.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
