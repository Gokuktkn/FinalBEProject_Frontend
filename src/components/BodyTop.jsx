import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import '../css/BodyTop.scss'

const BodyTop = () => {
    const [itemInfo, setItemInfo] = useState(false)
    return (
        <>
            <Link to={`/product/bo`} className='item-info' onMouseEnter={() => { setItemInfo(true) }} onMouseLeave={() => { setItemInfo(false) }}>

                <div className="info" style={!itemInfo ? {
                    visibility: "hidden",
                    opacity: "0"
                } : {
                    visibility: "visible",
                    opacity: "1"
                }}>
                    <div className="info-name">
                        <h2>Bơ vỏ sần</h2>
                    </div>
                    <div className="info-prices">
                        <div className="info-price"><h1>20.000đ</h1></div>
                        <div className="info-discount">
                            <del>45.000đ</del>
                        </div>
                    </div>
                    <div className='info-button'>
                        <IoMdCart />
                        <p className="info-button-text">
                            Mua hàng
                        </p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default BodyTop