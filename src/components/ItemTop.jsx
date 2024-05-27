import React from 'react'
import { IoMdCart } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ItemTop = () => {
    return (
        <>
            <Link to={'/'} className='link-product-cart' >
                <img src="https://bizweb.dktcdn.net/thumb/large/100/053/074/products/nho.jpg?v=1457542270730" alt="" />
                <div className="description">
                    <h2>Bơ vỏ sần</h2>
                    <strong><i>Giá: </i>20.000đ</strong><br></br>
                    <del><i>Giá: </i>45.000đ</del>
                    <button className='btn-buy'>
                        <IoMdCart />
                        Mua hàng
                    </button>
                </div>
            </Link>
        </>
    )
}

export default ItemTop