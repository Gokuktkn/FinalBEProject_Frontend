import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminNavbar() {
    return (
        <div className='admin-navbar-content'>
            <NavLink to={"/admin/create"} className="nav">Thêm sản phẩm</NavLink>
            <NavLink to={"/admin/update"} className="nav">Cập nhật sản phẩm</NavLink>
            <NavLink to={"/admin/management"} className="nav">Quản lý sản phẩm</NavLink>
            <NavLink to={"/admin/feedback"} className="nav">Ý kiến khách hàng</NavLink>
        </div>
    )
}

export default AdminNavbar
