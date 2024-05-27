import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ItemBottom = () => {
    return (
        <>
            <Link to={'/'} className='link-product-cart-3' >
                <div className="discount">
                    <p>-10%</p>
                    <FaStar />
                </div>
                <img src="https://bizweb.dktcdn.net/thumb/large/100/053/074/products/nho.jpg?v=1457542270730" alt="" />
                <div className="description">
                <h2>Bơ vỏ sần</h2>
                    <div className="des-con">
                    <div className="text">
                        <strong><i>Giá: </i>20.000đ</strong><br></br>
                        <del><i>Giá: </i>45.000đ</del>
                    </div>
                    <button className='btn-buy'>
                        <IoMdCart />
                        Mua hàng
                    </button>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default ItemBottom