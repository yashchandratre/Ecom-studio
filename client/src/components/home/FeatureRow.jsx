import React from 'react';


export default function FeatureRow() {
    return (
        <section className="bg-[#F3F4F6] border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#0B2545] flex items-center justify-center text-white font-bold">S</div>
                        <div>
                            <div className="text-sm font-semibold text-[#0B2545]">Secure payments</div>
                            <div className="text-xs text-gray-500">Encrypted checkout and secure storage</div>
                        </div>
                    </div>


                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[#00C2A8] flex items-center justify-center text-white font-bold">R</div>
                        <div>
                            <div className="text-sm font-semibold text-[#0B2545]">Fast delivery</div>
                            <div className="text-xs text-gray-500">2-4 day delivery across metro cities</div>
                        </div>
                    </div>


                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-[#334155] font-bold">↺</div>
                        <div>
                            <div className="text-sm font-semibold text-[#0B2545]">Easy returns</div>
                            <div className="text-xs text-gray-500">30-day hassle-free returns</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}