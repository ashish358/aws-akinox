import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './component/Navbar'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Fotter from './component/Fotter.jsx'
import SearchBar from './component/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
      <div className='px-4 sm:pz-[5] md:px-[7vw] lg:px-[9vw]'>
        <Navbar/>
        <ToastContainer/>
        <SearchBar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/collection' element={<Collection/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/constact' element={<Contact/>} />
          <Route path='/product/:productId' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/palce-order' element={<PlaceOrder/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/contact' element={<Contact/>} />
        </Routes>
        <Fotter/>
      </div>
    </>
  )
}

export default App
