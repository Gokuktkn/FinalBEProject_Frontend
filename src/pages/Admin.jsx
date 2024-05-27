import React from 'react';
import AdminNavbar from '../components/AdminNavbar.jsx';
import "../css/Admin.css";
import { Route, Routes, Navigate } from 'react-router-dom';
import Create from './Create.jsx';
import Update from './Update.jsx';
import Management from './Management.jsx';
import CustomerFeedback from './CustomerFeedback.jsx';

function Admin() {
    return (
        <div className='admin-container'>
            <div className='admin-navbar'>
                <AdminNavbar />
            </div>
            <div className='admin-content'>
                <Routes>
                    <Route path='/' element={<Navigate to="/admin/create" />} />
                    <Route path='/create' element={<Create />}></Route>
                    <Route path='/update' element={<Update />}></Route>
                    <Route path='/update/:id' element={<Update />}></Route>
                    <Route path='/management' element={<Management />}></Route>
                    <Route path='/feedback' element={<CustomerFeedback />}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
