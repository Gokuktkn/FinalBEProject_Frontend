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

function App() {

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/admin/*' element={<Admin />}></Route>
        <Route path='/san-pham/:id' element={<Item />}></Route>
        <Route path='/san-pham/all' element={<Collections />}></Route>
        <Route path='/tim-kiem' element={<Search />}></Route>
        <Route path='/gio-hang' /*element={<Cart />}*/></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/dang-ky' element={<SignUp />}></Route>
        <Route path='/dang-nhap' element={<SignIn />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
      <Footer></Footer>
    </>
  )
}

export default App
