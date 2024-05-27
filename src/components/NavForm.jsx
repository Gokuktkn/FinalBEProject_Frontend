import React from 'react'
import '../css/SignForm.scss'
import { NavLink } from 'react-router-dom'

const NavForm = () => {
    return (
        <>
            <div className="sign-in-nav">
                <NavLink to={'/dang-nhap'}>Đăng nhập</NavLink>
            </div>
            <div className="sign-up-nav">
                <NavLink to={'/dang-ky'}>Đăng ký</NavLink>
            </div>
        </>
    )
}

export default NavForm