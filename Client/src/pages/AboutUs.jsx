import React from 'react'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {

  useEffect(() => {
      AOS.init({ duration: 2000, once: false });
    }, []);

  return (
    <>
      <div className='flex flex-col gap-14 md:gap-20  py-14  bg-[#E3FFEF] relative'>

        {/* overlay gradient */}
        <img src="/assets/Vector-2.png" alt="" className='absolute left-0 top-120 hidden md:flex'/>
        <img src="/assets/Vector-3.png" alt="" className='absolute right-0 top-170 hidden md:flex'/> 

        {/* Hero Section */}
        <div className='flex flex-col md:flex-row px-10 md:px-20 gap-18'>
          {/* left Section */}
          <div className='flex flex-col gap-5 md:w-[65%] items-center md:items-start text-center md:text-start'>
            <div className='px-2 py-2 bg-white rounded-2xl flex items-center justify-center w-30' data-aos='fade-up' data-aos-delay='200'>
              <p className='text-base font-medium text-[#01B157]'>
                About Us
              </p>
            </div>
            <h1 className='text-3xl md:text-5xl font-bold text-black  md:leading-16' data-aos='fade-up' data-aos-delay='300'>
              Together, We Grow a Greener Future
            </h1>
            <p className='text-xl md:text-2xl font-medium text-black' data-aos='fade-up' data-aos-delay='400'>
              Join our global movement to combat climate change through community-driven tree planting initiatives. Every tree planted today creates a sustainable tomorrow for generations to come.
            </p>
            <div className='flex flex-col md:flex-row gap-4 mt-8' data-aos='fade-up' data-aos-delay='500'>
              <a href="/join">
                  <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-white bg-[#006A34] rounded-sm py-3 w-90 md:w-60 group cursor-pointer'>
                    <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                      Be a Member
                    </p>
                    <img src="/assets/handshake.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                  </button>
                </a>
                <a href="#join-section">
                  <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-[#006A34] bg-none border-[1px] border-[#006A34] rounded-sm py-3 w-90 md:w-60 group cursor-pointer'>
                    <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                      How to Join
                    </p>
                    <img src="/assets/arrow-down.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                  </button>
                </a>
            </div>

          </div>
          {/* right Section */}
          <div className='flex flex-col gap-2 items-center justify-center' data-aos='fade-up' data-aos-delay='300'>
            <img src="/assets/AboutHero.jpg" alt="" className='w-160 h-90 rounded-[30px] object-bottom object-cover' style={{ boxShadow: '0px 2px 4px 0px #00000040' }}/>
          </div>
        </div>

        {/* Mission Vision */}
        <div className='flex flex-col gap-4 items-center justify-center px-10'>
          <div className='flex flex-col gap-6 md:gap-10 items-center justify-center md:p-10 md:w-250'>
            <div className='flex flex-row gap-3 items-center' data-aos='fade-up' data-aos-delay='300'>
              <img src='/assets/mission.png' alt='' className='w-10 md:w-20 rounded-full' />
              <h1 className='text-2xl md:text-5xl font-bold text-black'>Why We Exist</h1>
            </div>
            <p className='text-base md:text-2xl font-normal text-black leading-6 md:leading-9 text-center max-w-5xl' data-aos='fade-up' data-aos-delay='400'>
              Our planet faces unprecedented environmental challenges. Climate change, deforestation, and urban pollution threaten our future. We believe that meaningful climate action starts with community engagement and individual responsibility. Through verified tree planting and digital recognition, we're building a global network of environmental stewards committed to creating lasting positive change.
            </p>
          </div>
        </div>

        {/* Who can join */}
        <div className='flex flex-row items-center px-10 md:gap-20 md:px-20 py-20 bg-[#005D2D] z-20'>
          <div className='hidden md:flex' data-aos='fade-up' data-aos-delay='300'>
            <img src="/assets/AboutJoin.jpg" alt="" className='w-140 h-80 rounded-[30px] object-cover'/>
          </div>
          <div className='flex flex-col gap-6 md:gap-4 items-center md:items-start justify-between'>
            <div className='flex' data-aos='fade-up' data-aos-delay='350'>
              <h1 className='text-3xl font-bold text-white mb-5 '>Who Can Join</h1>
            </div>
            <div className='flex flex-row gap-5 items-center' data-aos='fade-up' data-aos-delay='400'>
              <img src="/assets/Users.png" alt="" className='w-10 h-10' />
              <p className='text-xl md:text-2xl font-normal text-white'>
                Students and educational institutions
              </p>
            </div>
            <div className='flex flex-row gap-5 items-center' data-aos='fade-up' data-aos-delay='450'>
              <img src="/assets/Users.png" alt="" className='w-10 h-10' />
              <p className='text-xl md:text-2xl font-normal text-white'>
                Environmental professionals and organizations
              </p>
            </div>
            <div className='flex flex-row gap-5 items-center' data-aos='fade-up' data-aos-delay='500'>
              <img src="/assets/Users.png" alt="" className='w-10 h-10' />
              <p className='text-xl md:text-2xl font-normal text-white'>
                Community groups and volunteers
              </p>
            </div>
            <div className='flex flex-row gap-5 items-center' data-aos='fade-up' data-aos-delay='550'>
              <img src="/assets/Users.png" alt="" className='w-10 h-10' />
              <p className='text-xl md:text-2xl font-normal text-white'>
                Corporate teams and sustainability initiatives
              </p>
            </div>
          </div>
        </div>

        {/* Our Progress */}
        <div className='flex flex-col gap-20 items-center justify-center'>
          <h1 className='text-3xl md:text-5xl font-bold text-black' data-aos='fade-up' data-aos-delay='300'>Our Progress</h1>
          <div className='flex flex-col md:flex-row gap-10' data-aos='fade-up' data-aos-delay='400'>
            <div className='flex flex-col gap-4 py-8 w-[400px]  bg-[#FCFCFC] rounded-[20px] items-center justify-center' style={{ boxShadow: '0px 4px 15px 0px #005D2D40' }}>
              <img src="/assets/tree-3.png" alt="" className='w-20 h-20' />
              <p className='text-5xl font-medium text-[#005D2D]'>
                1 Million+
              </p>
              <p className='text-base md:text-2xl font-normal text-[#005D2D]'>
                Trees Planted
              </p>
              <p className='text-base font-normal text-[#01B157]'>
                Verified Contributions Worldwide
              </p>
            </div>
            <div className='flex flex-col gap-4 py-8 w-[400px] bg-[#FCFCFC] rounded-[20px] items-center justify-center' style={{ boxShadow: '0px 4px 15px 0px #005D2D40' }}>
              <img src="/assets/Globe.png" alt="" className='w-20 h-20' />
              <p className='text-5xl font-medium text-[#005D2D]'>
                Urban & Rural
              </p>
              <p className='text-base md:text-2xl font-normal text-[#005D2D]'>
                Areas Covered
              </p>
              <p className='text-base font-normal text-[#01B157]'>
                From city parks to forest restoration
              </p>
            </div>
            <div className='flex flex-col gap-4 py-8 w-[400px] bg-[#FCFCFC] rounded-[20px] items-center justify-center' style={{ boxShadow: '0px 4px 15px 0px #005D2D40' }}>
              <img src="/assets/Certificate.png" alt="" className='w-20 h-20' />
              <p className='text-5xl font-medium text-[#005D2D]'>
                Thousands
              </p>
              <p className='text-base md:text-2xl font-normal text-[#005D2D]'>
                Verified Certificates
              </p>
              <p className='text-base font-normal text-[#01B157]'>
                Digital recognition issued
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className='px-5 md:px-20 py-10'>
          <div className='flex flex-row gap-10 py-10 px-8 bg-gradient-to-r from-[#006A3C] to-[#4E896B] rounded-3xl' 
          data-aos="fade-up" data-aos-delay="200">
            {/* Left section */}
            <div className='flex flex-col items-start justify-center gap-6'>
              <h1 className='text-2xl md:text-5xl font-bold text-white' data-aos="fade-up" data-aos-delay="400">
                Let's Make This Year Even Greener.
              </h1>
              <p className='text-base md:text-2xl font-medium text-white' data-aos="fade-up" data-aos-delay="600">
                Our planet needs more than promises — it needs action. With over 1 million trees already in the ground, your next step could be the one that sparks a ripple of change for generations to come.
              </p>
              <a href="/join">
                <button className='text-base font-normal text-white bg-[#01B157] w-50 md:w-100 py-3 rounded-sm text-center shadow-[0px_1px_8.5px_0px_#5BE4A84F] hover:bg-[#01B157B2] cursor-pointer' data-aos="fade-up" data-aos-delay="800">
                  Be a Member
                </button>
              </a>
            </div>
            {/* Right section */}
            <div className='hidden md:flex' data-aos="fade-up" data-aos-delay="400">
              <img src="/assets/HomeEnd.jpg" alt="" className='rounded-xl object-cover w-450 h-100'/>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AboutUs