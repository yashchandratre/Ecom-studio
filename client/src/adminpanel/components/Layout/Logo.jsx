import React from 'react';
import img from '/Assets/Logo/logo.png'

export default function Logo() {
    return (
        <a className="inline-flex items-center gap-3" href="#">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0B2545] text-white font-bold">EC</div>

            <div className="hidden sm:block">
                <span className="text-sm font-semibold text-[#0B2545] dark:text-white">ECom Studio</span>
                <div className="text-xs text-gray-400 dark:text-[#ffffffd7]">Admin Pannel</div>
            </div>
        </a>
    );
} 