import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { PiSignInBold, PiMagnifyingGlassBold } from "react-icons/pi";
import { FaUserAlt, FaFacebookMessenger } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import '../css/Header.scss'

const Header = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [verify, setVerify] = useState(false)
  const searchInputChange = (e) => {
    setSearchInput(e.target.value)
  }
  // TODO: INPUT KHÔNG ĐƯỢC TRỐNG
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput === '') {
      setVerify(true)
    }
    else {
      setVerify(false)
      navigate(`/search?key=${searchInput}`)
    }
  }
  return (
    <div className='header'>
      <div className="header-top">
        <div className="container">
          {
            !localStorage.getItem('user') ?
              <div className="header-top-left">
                <Link to={'/signin'}>
                  <div className="header-top-left-signin">
                    <PiSignInBold />
                    <p>Đăng nhập</p>
                  </div>
                </Link>
                <Link to={'/signup'}>
                  <div className="header-top-left-signup">
                    <FaUserAlt />
                    <p>Đăng ký</p>
                  </div>
                </Link>
              </div> :
              <div className="header-top-left">
                <div className="profile"></div>
                <Link to={'/cart'}>
                  <div className="header-top-left-cart">
                    <IoMdCart />
                    <p>Giỏ hàng</p>
                    <p>{localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')).map(e => e.quantity).reduce((a, c) => a + c, 0) : 0}</p>
                  </div>
                </Link>
              </div>
          }
          <div className="header-top-right">
            <p className="header-top-right-contact">
              Thông tin liên hệ
            </p>
            <Link>
              <div className="header-top-right-messenger">
                <FaFacebookMessenger />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="header-middle">
        <div className="container">
          {/*display flex, direction vertical*/}
          <div className="logo">
            <Link to={'/'}>
              <img src='/logo-header.png' />
            </Link>
          </div>
          <hr style={{ width: '2rem', margin: '0 auto', color: '#fff', background: '#fff', border: 'none', height: '2px' }} />
          <p className='header-middle-text'>CỬA HÀNG THỰC PHẨM SẠCH</p>
        </div>
        <div className="header-middle-search">
          <form className='header-middle-search-form'>
            <label className='error' style={{ color: 'red', fontWeight: '700', display: verify ? 'block' : 'none' }}>Thanh nhập không được để trống</label>
            <input className='header-middle-search-form-input' type="text" onChange={(e) => searchInputChange(e)} value={searchInput} placeholder='Từ khóa tìm kiếm' />
            <button className='header-middle-search-form-button' type='submit' onClick={(e) => handleSubmit(e)}><PiMagnifyingGlassBold /></button>
          </form>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <div className="header-bottom-nav">
            <NavLink to={'/'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>TRANG CHỦ</NavLink>
          </div>
          <div className="header-bottom-nav">
            <NavLink to={'/about'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>GIỚI THIỆU</NavLink>
          </div>
          <div className="header-bottom-nav header-bottom-dropdown">
            <NavLink to={'/product/all'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>SẢN PHẨM</NavLink>
          </div>
          <div className="header-bottom-nav">
            <NavLink to={'/news'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>TIN TỨC</NavLink>
          </div>
          <div className="header-bottom-nav">
            <NavLink to={'/advise'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>TƯ VẤN</NavLink>
          </div>
          <div className="header-bottom-nav">
            <NavLink to={'/service'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>DỊCH VỤ</NavLink>
          </div>
          <div className="header-bottom-nav">
            <NavLink to={'/contact'} className={({ isActive, isPending }) => isActive ? 'active' : isPending ? 'pending' : ''}>LIÊN HỆ</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header