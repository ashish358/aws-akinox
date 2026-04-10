import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../component/NewsLetterBox'

const About = () => {
  return (

    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={assets.watch1} className='w-full md:max-w-[450px]' alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Welcome to Akinox Watches, your ultimate destination for exquisite timepieces crafted with precision and style. At Akinox, we curate a diverse collection of watches tailored to suit every taste and occasion. Whether you're looking for sophisticated men's watches, elegant women's designs, or fun and durable watches for kids, Akinox offers something special for everyone.</p>
          <p>Explore our range and find the perfect watch that complements your lifestyle at Akinox Watches.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our collection spans across analog, digital, and hybrid analog+digital watches, blending classic craftsmanship with modern technology. Each timepiece is meticulously selected to ensure quality, reliability, and timeless appeal.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Diverse Collection</b>
          <p className='text-gray-600'>Explore a wide range of men's, women's, and kids' watches, including analog, digital, and analog+digital styles to match every preference.</p>
        </div>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Quality & Craftsmanship</b>
          <p className='text-gray-600'> Each timepiece is crafted with premium materials, ensuring durability, precision, and timeless elegance. </p>
        </div>
        <div className='border px-10 md:px-16 sm:py-20 flex flex-col gap-5'>
          <b>Seamless Shopping Experience</b>
          <p className='text-gray-600'>Enjoy a user-friendly interface, secure transactions, and excellent customer support for a hassle-free purchase.</p>
        </div>
      </div>

      <NewsLetterBox/>
      
    </div>
    
  )
}

export default About