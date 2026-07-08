import React from 'react';


export default function PromoBanner() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="rounded-lg p-4 md:p-6 bg-[#FF6A00]/5 border border-[#FF6A00]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <div className="text-sm font-semibold text-[#0B2545]">Limited-time offer</div>
                    <div className="text-lg font-bold text-[#0B2545]">Up to 40% off on selected accessories</div>
                </div>
                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#FF6A00] text-white font-semibold">Shop sale</a>
            </div>
        </section>
    );
}