import React from 'react';
import { assets } from '../assets/assets';

const Fotter = () => {
  return (
    <div className="my-10 mt-40">
      <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 text-sm">
        {/* First Column: Logo and Description */}
        <div className="flex flex-col items-start gap-5">
          <img src={assets.logo} className="w-10 h-10 mb-5" alt="Logo" />
          <p className="text-gray-600 w-full md:w-2/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quaerat molestias.
          </p>
        </div>

        {/* Second Column: Company Links */}
        <div className="flex flex-col items-start gap-4">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Third Column: Contact Information */}
        <div className="flex flex-col items-start gap-4">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-232-234-2332</li>
            <li>akinox@gmial.com</li>
          </ul>
        </div>


      </div>
      <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ axinox.com - All Right Reserves. </p>
        </div>
    </div>
  );
};

export default Fotter;
