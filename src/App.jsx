import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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
import { refreshTokenResetter } from '../fetchApi.js'

function App() {

  const navigate = useNavigate();

  // let firstTime = true
  const cycleTokenAuth = async () => {
    try {
      const data = await refreshTokenResetter('/token/request', 'POST', localStorage.getItem('refreshToken'))
      if (data.status == 200) {
        localStorage.setItem('user', JSON.stringify(data.data.user))
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('refreshToken', data.data.refreshToken)
        console.log(data.data)
      }
      else if (data.status == 500) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('cart')
        navigate(0)
      }
      else if(data.status == 404) {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('cart')
        navigate(0)
      }
      else {
        console.log(data)
      }
    }
    catch (e) {
      console.log('failed')
    }
  }
  if (localStorage.getItem('refreshToken') == null) {
    localStorage.removeItem('cart')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  else {
    setTimeout(() => {
      cycleTokenAuth();
    }, 500);
    setInterval(() => {
      cycleTokenAuth()
    }, 5 * 10000 - 100);
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
