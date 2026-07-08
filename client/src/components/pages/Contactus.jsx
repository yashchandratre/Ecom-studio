import React from 'react'

function Contactus() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-[#0B2545] mb-2 text-center">Contact Us</h2>
          <form action="">
            <label className='block mb-3'>
              <span className="text-sm text-gray-700">Full Name</span>
              <input type='text' className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none `} placeholder='Enter Your name' />
            </label>
            <label className='block mb-3'>
              <span className="text-sm text-gray-700">Email</span>
              <input type='email' className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none `} placeholder="you@example.com" />
            </label>
            <label className='block mb-3'>
              <span className="text-sm text-gray-700">Message</span>
              <textarea rows={4} type='text' className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm focus:outline-none resize-none `} placeholder='Enter Message' />
            </label>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#0B2545] text-white font-semibold hover:opacity-95 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contactus
