import React from 'react';
import {Link} from 'react-router-dom'

export default function Hero() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] leading-tight">Everyday essentials, designed to last</h1>
                        <p className="mt-4 text-gray-600 max-w-xl">Carefully curated products with quality materials and honest pricing. Fast delivery across India and easy returns.</p>


                        <div className="mt-6 flex items-center gap-4">
                            <Link to="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#FF6A00] text-white font-semibold shadow-md hover:opacity-95">Buy Now</Link>
                            <Link to="/collections" className="inline-flex items-center gap-2 px-4 py-3 rounded-md border border-gray-200 text-[#334155]">Explore Collections</Link>
                        </div>


                        <div className="mt-8 flex gap-6 items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#00C2A8] flex items-center justify-center text-white font-bold">✓</div>
                                <div>
                                    <div className="text-sm font-semibold text-[#0B2545]">Free shipping</div>
                                    <div className="text-xs text-gray-400">On orders over ₹1,499</div>
                                </div>
                            </div>


                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#334155] font-semibold">★</div>
                                <div>
                                    <div className="text-sm font-semibold text-[#0B2545]">1-year warranty</div>
                                    <div className="text-xs text-gray-400">Selected electronics</div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="order-first lg:order-last">
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img src="/Assets/adjustabledumbell.webp" alt="Featured product" className="w-full h-auto object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}