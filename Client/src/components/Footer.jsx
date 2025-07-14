
import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleHowToJoinScroll = () => {
    const el = document.querySelector('#how-to-join');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    navigate('/home'); // Ensures you're on the home page first
  };

  return (
    <footer
      className='relative flex flex-col justify-between px-10 md:px-20 py-8 bg-[#005D2D] w-full md:h-125'
      style={{
        backgroundImage: "url('/assets/Vector.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'cover',
      }}
    >
      {/* Footer content */}
      <div className='flex flex-col md:flex-row justify-between items-start py-10'>
        {/* Left section */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl text-white font-bold'>LOGO</h2>
          <form className='flex flex-row justify-between items-center bg-white/40 px-2.5 py-2 rounded-lg w-90'>
            <input
              type="email"
              placeholder="Enter your email"
              className='text-white font-normal text-base z-20 bg-transparent outline-none'
              required
            />
            <button className='bg-[#01B157] px-2.5 py-1 rounded-sm text-white font-bold text-base'>
              Subscribe
            </button>
          </form>
          {/* Social Links (desktop) */}
          <div className='hidden md:flex flex-col gap-4'>
            <h2 className='text-2xl text-white/70 font-bold'>Social Links</h2>
            <div className="flex gap-4 justify-start items-center text-2xl text-white">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className='flex flex-col md:flex-row items-start gap-10 md:gap-26 pr-20 pt-10 md:pt-0'>
          {/* Quick Links */}
          <div>
            <h2 className='text-2xl text-white font-bold mb-6'>Quick Links</h2>
            <nav className='flex flex-col gap-6'>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className='font-normal text-base text-white cursor-pointer bg-transparent border-none p-0 text-left'
                style={{ background: 'none', border: 'none' }}
              >
                Our Mission
              </button>
              <button
                type="button"
                onClick={() => navigate('/home')}
                className='font-normal text-base text-white cursor-pointer bg-transparent border-none p-0 text-left'
                style={{ background: 'none', border: 'none' }}
              >
                Our Work
              </button>
              <button
                type="button"
                onClick={handleHowToJoinScroll}
                className='font-normal text-base text-white cursor-pointer bg-transparent border-none p-0 text-left'
                style={{ background: 'none', border: 'none' }}
              >
                How to Join
              </button>
            </nav>
          </div>

          {/* Contact Us */}
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl text-white font-bold'>Contact Us</h2>
            <div className="flex flex-row gap-4 items-center justify-start">
              <FaPhoneAlt className='text-2xl text-white' />
              <a href="tel:+94712345679" className='font-normal text-base text-white'>+94 71 234 5679</a>
            </div>
            <div className="flex flex-row gap-4 items-center justify-start">
              <FaEnvelope className='text-2xl text-white' />
              <a href="mailto:r2r@gmail.com" className='font-normal text-base text-white'>r2r@gmail.com</a>
            </div>
          </div>

          {/* Social Links (mobile) */}
          <div className='flex flex-col gap-4 z-10 md:hidden'>
            <h2 className='text-2xl text-white/70 font-bold'>Follow Us</h2>
            <div className="flex gap-4 justify-start items-center text-2xl text-white">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className='flex flex-col md:flex-row justify-between items-center text-white text-base font-normal gap-2'>
        <p>Copyright &copy; 2025. All rights reserved.</p>
        <div className='flex flex-row items-center gap-6'>
          <button
            type="button"
            onClick={() => navigate('/privacy-policy')}
            className='cursor-pointer bg-transparent border-none text-white text-base font-normal p-0 underline'
            style={{ background: 'none', border: 'none' }}
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => navigate('/terms')}
            className='cursor-pointer bg-transparent border-none text-white text-base font-normal p-0 underline'
            style={{ background: 'none', border: 'none' }}
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
