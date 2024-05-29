import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IoMdCart } from 'react-icons/io'
import { Link } from 'react-router-dom'

const ItemMiddle = ({ props }) => {
    const formattedNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return (
        <>
            <Link to={`/product/${props.itemName}`} className='link-product-cart-2' >
                <div className="discount">
                    <p>-${Math.ceil(props.discount / props.price)}%</p>
                    <FaStar />
                </div>
                <img src={props.img[0]} alt="" />
                <div className="description">
                    <h2>{props.itemName}</h2>
                    <strong><i>Giá: </i>{formattedNumber(props.price)}đ</strong><br></br>
                    <del><i>Giá: </i>{formattedNumber(props.discount)}đ</del>
                    <button className='btn-buy'>
                        <IoMdCart />
                        Mua hàng
                    </button>
                </div>
            </Link>
        </>
    )
}

export default ItemMiddle