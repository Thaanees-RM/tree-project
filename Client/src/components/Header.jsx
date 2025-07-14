// import React from 'react'
// import {Menu} from 'lucide-react';


// const Header = () => {

  
  
//   return (
//     <>
//       <header className='hidden md:flex flex-row justify-between items-center w-full h-25 px-20 bg-[#E3FFEF]'>
//         {/* LOGO SECTION */}
//         <div>
//           <a href="home" className='font-bold text-2xl text-[#006A34]'>
//             LOGO
//           </a>
//         </div>
//         {/* NAVIGATION SECTION */}
//         <div className='flex flex-row gap-6 items-center'>
//           <a href="privacy-policy" className='font-medium text-base text-black'>
//             Privacy Policy
//           </a>
//           <button className='font-medium text-base text-white text-center bg-[#006A34] w-20 py-2 rounded-sm'>
//             Join
//           </button>
//         </div>
//       </header>

//       {/* Mobile Header */}
//       <div className='flex md:hidden flex-row justify-between items-center w-full h-20 px-10 py-12 bg-[#E3FFEF]'>
//         {/* LOGO SECTION */}
//         <div>
//           <a href="home" className='font-bold text-2xl text-[#006A34]'>
//             LOGO
//           </a>
//         </div>

//         <div className='flex flex-row gap-4 items-center'>
//           <button className='font-medium text-base text-white text-center bg-[#006A34] w-20 py-2 rounded-sm'>
//             Join
//           </button>
//           <button>
//             <Menu size={30} className="text-black" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className='md:hidden fixed top-5 left-5 w-[90%] h-65 bg-white z-10 px-10 py-5 rounded-2xl'>
//         <div className='flex flex-row items-center justify-center'>
//           <a href="home" className='font-bold text-2xl text-[#006A34]'>
//             LOGO
//           </a>
          

//         </div>
//         <div className='flex flex-col gap-6 items-center justify-center'>
//           <a href="privacy-policy" className='font-medium text-base text-black'>
//             Privacy Policy
//           </a>
//           <button className='font-medium text-base text-white text-center bg-[#006A34] w-20 py-2 rounded-sm'>
//             Join
//           </button>
//         </div>
//       </div>
//     </>
    
//   )
// }

// export default Header

import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className='hidden md:flex flex-row justify-between items-center w-full h-25 px-20 bg-[#E3FFEF]'>
        <div>
          <a href="home" className='font-bold text-2xl text-[#006A34]'>LOGO</a>
        </div>
        <div className='flex flex-row gap-6 items-center'>
          <a href="privacy-policy" className='font-medium text-base text-black'>Privacy Policy</a>
          <Link to="/join">
            <button className='font-medium text-base text-white bg-[#006A34] w-20 py-2 rounded-sm cursor-pointer'>Join</button>
          </Link>
          
        </div>
      </header>

      {/* Mobile Header */}
      <div className='flex md:hidden flex-row justify-between items-center w-full h-20 px-10 py-12 bg-[#E3FFEF]'>
        <a href="home" className='font-bold text-2xl text-[#006A34]'>LOGO</a>

        <div className='flex items-center gap-4'>
          <Link to="/join">
            <button className='font-medium text-base text-white bg-[#006A34] w-20 py-2 rounded-sm'>Join</button>
          </Link>
          

          {/* Hamburger Button */}
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
            <a href="home" className='font-bold text-3xl text-[#006A34]'>LOGO</a>
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
            <a href="privacy-policy" className='font-medium text-lg text-black'>Privacy Policy</a>
            <Link to="/join">
              <button className='font-medium text-base text-white bg-[#006A34] w-34 py-2 rounded-sm'>
                Join
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
