import React from 'react'
import {
  FaFacebookF,
  FaYoutube,
  FaTiktok,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer 
      className='relative flex flex-col justify-between px-20 py-8 bg-[#005D2D] w-full h-125'
      style={{
    backgroundImage: "url('/assets/Vector.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
    backgroundSize: 'cover',
    }}>
      

      {/* Footer content */}
      <div className='flex flex-row justify-between items-start py-10'>
        {/* Social media links */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl text-white font-bold'>
            LOGO
          </h2>
          <div>
            <form action="" className='flex flex-row justify-between items-center bg-white/40 px-2.5 py-2 rounded-lg w-90'>
              <input 
                type="email"
                placeholder="Enter your email"
                className='text-white font-normal text-base z-20'
                required
              />
              <button className='bg-[#01B157] px-2.5 py-1 rounded-sm text-white font-bold text-base'>
                Subscribe
              </button>
            </form>
          </div>
          <h2 className='text-2xl text-white/70 font-bold'>
            Social Links
          </h2>
          {/* Social media icons */}
          <div className="flex gap-4 justify-start items-center text-2xl text-white">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="" />
            </a>
          </div>
        </div>
        {/* Contact information */}
        <div className='flex flex-row items-start gap-26 pr-20'>
          {/* Quick Links */}
          <div>
            <h2 className='text-2xl text-white font-bold mb-6'>
              Quick Links
            </h2>
            <nav className='flex flex-col gap-6'>
              <a href="" className='font-normal text-base text-white'>Our Mission</a>
              <a href="" className='font-normal text-base text-white'>Our Work</a>
              <a href="" className='font-normal text-base text-white'>How to Join</a>
            </nav>
          </div>
          {/* Contact us */}
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl text-white font-bold'>
              Contact Us
            </h2>
            <div className="flex flex-row gap-4 items-center justify-start">
              <FaPhoneAlt className='text-2xl text-white' />
              <a href="" className='font-normal text-base text-white'>+94 71 234 5679</a>
            </div>
            <div className="flex flex-row gap-4 items-center justify-start">
              <FaEnvelope className='text-2xl text-white' />
              <a href="" className='font-normal text-base text-white'>r2r@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className='flex flex-row justify-between items-center text-white text-base font-normal'>
        <p>
          Copyright &copy; 2025. All rights reserved.
        </p>
        <div className='flex flex-row items-center gap-6'>
          <a href="">
            Privacy Policy
          </a>
          <a href="">
            Terms of Service
          </a>
        </div>
      </div>

    </footer>
  )
}

export default Footer;
