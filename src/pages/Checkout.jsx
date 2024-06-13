import React from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate();
  if(localStorage.getItem('token') == null) {
    navigate('/signin')
  }
  // console.log(random)

  return (
    <div>Checkout</div>
  )
}

export default Checkout