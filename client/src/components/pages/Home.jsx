import React from 'react';
import Header from '../Layout/Header';
import Hero from '../home/Hero';
import PromoBanner from '../home/PromoBanner';
import ProductGrid from '../products/ProductGrid';
import FeatureRow from '../home/FeatureRow';
import Newsletter from '../home/Newsletter';
import Footer from '../Layout/Footer';
import products from '../data/Products';


export default function Home() {
    function handleAdd(product) {
        console.log('Add to cart:', product);
    }


    function handleWishlist(product) {
        console.log('Wishlist:', product);
    }


    return (
        <div className="min-h-screen bg-white text-gray-900">
            <main>
                <Hero />
                <PromoBanner />
                <ProductGrid products={products} onAdd={handleAdd} onWishlist={handleWishlist} />
                <FeatureRow />
                <Newsletter />
            </main>
        </div>
    );
}