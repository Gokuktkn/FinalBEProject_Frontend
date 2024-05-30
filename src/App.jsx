import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './pages/Admin.jsx'
import Item from './pages/Item.jsx'
import NotFound from './pages/NotFound.jsx'
import Search from './pages/Search.jsx'
import About from './pages/About.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'
import Collections from './pages/Collections.jsx'
import Cart from './pages/Cart.jsx'
import Account from './pages/Account.jsx'

function App() {

  // let firstTime = true
  const cycleTokenAuth = () => {
    if (localStorage.getItem('token') != null) {
      // gọi api để lấy thông tin người dùng và check thông tin token

      // nếu token valid
      if (true) {
        // tạo refreshToken cùng token mới
        // lấy thông tin người dùng
        localStorage.setItem('token', 'newToken')
        localStorage.setItem('refreshToken', 'newRefreshToken')
        // localStorage.setItem('user', 'user')
      }
      // nếu token invalid
      else {
        // lấy refreshToken
        if (localStorage.getItem('refreshToken')) {
          // gọi api để kiểm tra thông tin refreshToken

          // nếu refreshToken valid
          if (true) {
            // tạo refreshToken cùng token mới
            // lấy thông tin người dùng
            localStorage.setItem('token', 'token')
            localStorage.setItem('refreshToken', 'refreshToken')
            localStorage.setItem('user', 'user')
          }
          else {
            // xóa hết dữ liệu
            localStorage.removeItem('cart')
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
          }
        }
        // refreshToken invalid
        else {
          // xóa hết dữ liệu
          localStorage.removeItem('cart')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('user')
        }
      }
    }
    else if (localStorage.getItem('refreshToken') !=null) {
      // api kiểm tra refreshToken

      if (true) {
        // tạo refreshToken cùng token mới
        // lấy thông tin người dùng
        localStorage.setItem('token', 'token')
        localStorage.setItem('refreshToken', 'refreshToken')
        localStorage.setItem('user', 'user')
      }
      // token invalid
      else {
        // xóa hết dữ liệu
        localStorage.removeItem('cart')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    }
    else {
      localStorage.removeItem('cart')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
    }
    console.log('first')
  }
  if (localStorage.getItem('token') == null && localStorage.getItem('refreshToken') == null) {
    localStorage.removeItem('cart')
    localStorage.removeItem('user')
  }
  else {
    cycleTokenAuth()
    setInterval(() => {
      cycleTokenAuth()
    }, 5 * 10000);
  }

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/admin/*' element={<Admin />}></Route>
        <Route path='/account/*' element={<Account />}></Route>
        <Route path='/product/:id' element={<Item />}></Route>
        <Route path='/product/all' element={<Collections />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
