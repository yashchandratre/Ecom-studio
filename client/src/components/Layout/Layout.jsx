import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className='box-border p-0 m-0'>
      <Header cartCount={4}/>
      <Outlet/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Footer/>
      </div>
    </div>
  )
}

export default Layout
