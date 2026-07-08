import React, { useState } from 'react';

export default function ProductGallery({ images = [] }) {
    const [active, setActive] = useState(0);

    return (
        <div className="flex flex-col md:flex-row gap-6 ">
            <div className="flex-1 border rounded-lg bg-white p-6
                      flex items-center justify-center md:hidden">
                <img
                    src={images[active]}
                    alt={`Product image ${active + 1}`}
                    className="max-h-105 w-auto object-contain"
                />
            </div>
            {/* Thumbnails */}
            <div className="md:w-20 w-full md:h-105 h-24
                      flex md:flex-col flex-row gap-3
                      overflow-x-auto
                      md:overflow-x-hidden md:overflow-y-auto hide-scrollbar md:border-b md:border-t border-e-gray-50 py-2 ">

                {images.map((src, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`shrink-0 w-20 h-20 border rounded-md overflow-hidden cursor-pointer
              ${i === active
                                ? "border-[#00C2A8] ring-2 ring-[#00C2A8]/30"
                                : "border-gray-300"
                            }`}
                    >
                        <img
                            src={src}
                            alt={`Thumbnail ${i + 1}`}
                            className="w-full h-full object-contain bg-white"
                        />
                    </button>
                ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 border rounded-lg bg-white p-6
                      md:flex items-center justify-center hidden ">
                <img
                    src={images[active]}
                    alt={`Product image ${active + 1}`}
                    className="max-h-105 w-auto object-contain"
                />
            </div>

        </div>
    );
}


