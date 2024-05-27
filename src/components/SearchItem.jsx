import React from 'react'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const SearchItem = ({ props }) => {
  console.log(props)

  const formattedNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // START TEST CODE
  let price = 1000000;
  let discount = 106969;
  // END TEST CODE



  return (
    <div className='item'>
      <div className="discount-percentage">
        <p>-&nbsp;</p>
        <p>30%&nbsp;</p>
        <FaStar />
      </div>
      <div className="top-img">
        <img src="/qua/bo.png" alt="" />
      </div>
      <div className="price-tags">
        <p className='name-tag'>Thứ gì đó</p>
        <h3 className='price-tag'><i>Giá:&nbsp;</i>{formattedNumber(price)}₫</h3>
        <del className='discount-tag'><i>Giá: {formattedNumber(discount)}₫</i></del>
        <Link to={`/san-pham/${'1'}`} className='redirect-btn'><FaShoppingCart /><p>Mua hàng</p></Link>
      </div>
    </div>
  )
}

export default SearchItem