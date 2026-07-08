import React from 'react'
import { Link } from 'react-router-dom'
export default function Login() {
    return (
        <div className='min-h-screen flex justify-center items-center bg-white'>
            <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
                <h1 className='text-center font-bold p-2'>Login</h1>
                <p className='text-sm text-gray-500 mb-6'>New here? <Link to='/crud/register' className=' text-[#ffa411]'>Create Account</Link></p>
                <form method='post'>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Email</span>
                        <input type="text" className='mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none border-gray-200 focus:border-gray-400' placeholder='Enter Email' />
                    </div>
                    <div className='block mb-3'>
                        <span className="text-sm text-gray-700">Password</span>
                        <input type="password" className='mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none border-gray-200 focus:border-gray-400' placeholder='Enter Password' />
                    </div>
                     <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 cursor-pointer"
                            />
                            <span className='cursor-pointer'>Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="text-sm text-[#0B2545] hover:underline cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#FF6A00] text-white font-semibold hover:opacity-95 cursor-pointer"
                    >
                       Login
                    </button>
                </form>
            </div>
        </div>
    )
}
