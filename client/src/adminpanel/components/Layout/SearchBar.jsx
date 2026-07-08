import React from 'react';


export default function SearchBar() {
    return (
        <div className='relative'>
                <span className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">⌕</span>
            <input
                className="w-full pl-10 p-2 pr-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search Anithing"
                />
       
        </div>
    );
}