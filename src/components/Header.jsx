import React from 'react'

const Header = () => {
  return (
    <header className='flex flex-row justify-between items-center w-full h-25 px-20 bg-[#E3FFEF]'>
      {/* LOGO SECTION */}
      <div>
        <h2 className='font-bold text-2xl text-[#006A34]'>
          LOGO
        </h2>
      </div>
      {/* NAVIGATION SECTION */}
      <div className='flex flex-row gap-6 items-center'>
        <a href="" className='font-medium text-base text-black'>
          Privacy Policy
        </a>
        <button className='font-medium text-base text-white text-center bg-[#006A34] w-20 py-2 rounded-sm'>
          Join
        </button>
      </div>
    </header>
  )
}

export default Header