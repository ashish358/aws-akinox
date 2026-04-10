import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import '../index.css';
import { Search, ShoppingBag, ChevronLeft } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Twirl as Hamburger } from 'hamburger-react';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  // const getCartCount = () => {
  //   return Object.values(cartItems).reduce((sum, item) => sum + item.quantity, 0);
  // };
  
//   useEffect(() => {
//     console.log("Cart items updated:", cartItems);
// }, [cartItems]);


  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }
  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex items-center justify-between px-6 py-4 font-medium shadow-md bg-white'>
      {/* Logo Section */}
      <div className='flex items-center gap-3 text-lg font-semibold'>
        <Link to="/"> <img className='h-10 w-11' src={assets.logo} alt="Akinox Logo" /> </Link>
        Akinox
      </div>
      {/* Navigation Links (Desktop) */}
      <ul className={`sm:flex gap-5 text-sm text-gray-700 ${isOpen ? 'flex' : 'hidden'} sm:block`}>
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700' />
        </NavLink>
      </ul>
      {/* Icons & Hamburger */}
      <div className='flex items-center sm:gap-6 gap-4'>
        <Search onClick={() => setShowSearch(true)} className="cursor-pointer sm:h-6 sm:w-6 h-5 w-5" />

        {/* User Profile Dropdown */}
        <div className='group relative'>
          <FontAwesomeIcon onClick={()=> token ? null : navigate('/login')} className='cursor-pointer sm:h-6 sm:w-6 h-5 w-5' icon={faUser} />
          {token && 
              <div className='hidden group-hover:flex flex-col absolute right-0 w-28  bg-white shadow-lg rounded-md py-3 px-4 text-gray-600'>
              <p onClick={()=>navigate("/profile")} className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate("/orders")} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
          }
        </div>

        {/* Shopping Bag */}
        <Link to="/cart" className="relative">
          <ShoppingBag className="cursor-pointer sm:h-6 sm:w-6 h-5 w-5 mb-1" />
          <p className='absolute right-[-5px] bottom-[-3px] sm:w-4 sm:h-4 w-4 h-4 flex items-center justify-center bg-black text-white rounded-full sm:text-[10px] text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Hamburger Menu */}
        <div className='sm:hidden flex items-center'>
          <Hamburger toggled={isOpen} toggle={handleHamburgerClick} color="#000" size={20} />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 overflow-hidden'
          }`}
      >
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setIsOpen(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <ChevronLeft className="h-4 rotate-180" />
            <p>BACK</p>
          </div>

          {/* Sidebar Navigation */}
          <NavLink onClick={() => setIsOpen(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
          <NavLink onClick={() => setIsOpen(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
          <NavLink onClick={() => setIsOpen(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setIsOpen(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
