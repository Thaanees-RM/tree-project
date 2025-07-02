import React from 'react'
import { Menu} from 'lucide-react';

const Header = () => {
  return (
    <>
      <header className='hidden md:flex flex-row justify-between items-center w-full h-25 px-20 bg-[#E3FFEF]'>
        {/* LOGO SECTION */}
        <div>
          <a href="home" className='font-bold text-2xl text-[#006A34]'>
            LOGO
          </a>
        </div>
        {/* NAVIGATION SECTION */}
        <div className='flex flex-row gap-6 items-center'>
          <a href="privacy-policy" className='font-medium text-base text-black'>
            Privacy Policy
          </a>
          <button className='font-medium text-base text-white text-center bg-[#006A34] w-20 py-2 rounded-sm'>
            Join
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className='flex md:hidden flex-row justify-between items-center w-full h-20 px-10 py-12 bg-[#E3FFEF]'>
        {/* LOGO SECTION */}
        <div>
          <a href="home" className='font-bold text-2xl text-[#006A34]'>
            LOGO
          </a>
        </div>

        <div className='flex flex-row gap-4 items-center'>
          <button className='font-medium text-base text-white text-center bg-[#006A34] w-20 py-2 rounded-sm'>
            Join
          </button>
          <button>
            <Menu size={30} className="text-black" />
          </button>
        </div>
      </div>
    </>
    
  )
}

export default Header