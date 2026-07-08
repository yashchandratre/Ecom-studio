import React from 'react';


export default function Newsletter() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg p-6 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-semibold text-[#0B2545]">Join our newsletter</h3>
                    <p className="text-sm text-gray-500">Get 10% off your first order and occasional updates.</p>
                </div>
                <div className="w-full md:w-auto flex gap-3">
                    <input className="flex-1 px-3 py-2 rounded-md border border-gray-200" placeholder="Your email" />
                    <button className="px-4 py-2 rounded-md bg-[#0B2545] text-white cursor-pointer hover:bg-[#0B2580]">Subscribe</button>
                </div>
            </div>
        </section>
    );
}