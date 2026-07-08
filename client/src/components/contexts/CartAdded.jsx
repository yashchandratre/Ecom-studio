import React from 'react'
import { Link } from 'react-router-dom'
function CartAdded(props) {
  return (
    <div className='justify-center items-center z-80 bg-white backdrop-blur-md border-b border-gray-100'>
      <p >The {props.name} Added</p>
      <Link to='/cart' className='text-orange-400'>View Cart</Link>
    </div>
  )
}

export default CartAdded
