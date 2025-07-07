import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className='hidden md:flex flex-row justify-between items-center w-full h-25 px-20 bg-[#E3FFEF]'>
        <div>
          <Link to="/home" className='font-bold text-2xl text-[#006A34]'>LOGO</Link>
        </div>
        <div className='flex flex-row gap-6 items-center'>
          <Link to="/privacy-policy" className='font-medium text-base text-black'>Privacy Policy</Link>
          <Link
            to="/join"
            className='font-medium text-base text-white bg-[#006A34] w-20 py-2 rounded-sm text-center'
          >
            Join
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <div className='flex md:hidden flex-row justify-between items-center w-full h-20 px-10 py-12 bg-[#E3FFEF]'>
        <Link to="/home" className='font-bold text-2xl text-[#006A34]'>LOGO</Link>

        <div className='flex items-center gap-4'>
          <Link
            to="/join"
            className='font-medium text-base text-white bg-[#006A34] w-20 py-2 rounded-sm text-center'
          >
            Join
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="w-8 h-8 text-[#006A34]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {isOpen && (
        <div className='md:hidden fixed top-5 left-5 w-[90%] h-70 bg-white z-50 px-10 py-5 rounded-2xl shadow-lg'>
          <div className='flex flex-row justify-between items-center mb-6 h-[20%]'>
            <Link to="/home" className='font-bold text-3xl text-[#006A34]'>LOGO</Link>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <svg
                className="w-7 h-7 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className='flex flex-col gap-5 items-center justify-center h-[60%]'>
            <Link to="/privacy-policy" className='font-medium text-lg text-black'>Privacy Policy</Link>
            <Link
              to="/join"
              className='font-medium text-base text-white bg-[#006A34] w-34 py-2 rounded-sm text-center'
            >
              Join
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
