import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react';

const Navbar = ( {setToken} ) => {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between'>
            <div className='flex items-center gap-3 text-lg font-semibold'>
                <Link to="/"> <img className='h-10 w-11' src={assets.logo} alt="Akinox Logo" /> </Link>
                Akinox
            </div>
           
           <div className='flex flex-row'>

           <LogOut 
             onClick={() => setToken('')} 
           />
           <p className='pl-2 font-medium'>Logout</p>
           </div>
        </div>
    )
}

export default Navbar
