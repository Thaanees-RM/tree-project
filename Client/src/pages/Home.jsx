
import React from 'react'
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


const Home = () => {

  const [index, setIndex] = useState(0);

  const slides = [
    {
      title: 'Our Mission',
      img: '/assets/mission.png',
      text:
        'We are committed to mobilizing individuals, communities, and organizations to take direct climate action through tree planting. By creating a platform where people can contribute, share, and be recognized for their efforts, we aim to inspire a global culture of environmental responsibility and sustainable living.',
    },
    {
      title: 'Our Vision',
      img: '/assets/vision.png',
      text:
        'We envision a world where environmental restoration is driven by collective action. Through accessible, community-powered efforts like tree planting, we strive to foster a planet where every individual feels empowered to protect, preserve, and our natural ecosystems for generations to come.',

    },
  ];

  useEffect(() => {
    AOS.init({ duration: 2000, once: false });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);

    }, 2000); // change every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const current = slides[index];



  return (
    <>
      {/* Main bg */}
      <div className='flex flex-col gap-14 md:gap-20 px-8 py-14 md:p-20 bg-[#E3FFEF] relative'>

        {/* overlay gradient */}
        <img src="/assets/Vector-2.png" alt="" className='absolute left-0 top-90 hidden md:flex'/>
        <img src="/assets/Vector-3.png" alt="" className='absolute right-0 top-150 hidden md:flex'/> 

        {/* Hero Section */}
        <div className='hidden md:flex flex-col gap-4 pb-20 relative'>
          {/* Left Section */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-7xl font-bold text-black w-250 leading-24'>
              <span data-aos='fade-in' data-aos-delay='200'>Join the Green Movement</span> 
              <span data-aos='fade-in' data-aos-delay='800'> Plant a Tree.</span>
              <span data-aos='fade-in' data-aos-delay='1200'> Make a Difference.</span>               
            </h1>
            <p data-aos='fade-in' data-aos-delay='1600' className='text-2xl font-medium text-black w-150'>
              Join thousands of others in creating a greener, healthier planet—one tree at a time.
            </p>
            <div data-aos='fade-in' data-aos-delay='2000' className='flex flex-row gap-4 mt-8'>
              <a href="/join">
                <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-white bg-[#006A34] rounded-sm py-3 w-50 group cursor-pointer'>
                  <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                    Be a Member
                  </p>
                  <img src="/assets/handshake.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                </button>
              </a>
              <a href="#join-section">
                <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-[#006A34] bg-none border-[1px] border-[#006A34] rounded-sm py-3 w-50 group cursor-pointer'>
                  <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                    How to Join
                  </p>
                  <img src="/assets/arrow-down.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                </button>
              </a>
              
            </div>
          </div>

          {/* Right Section */}
          <div data-aos='fade-in' data-aos-delay='2400' className='absolute right-0 top-40'>
            <div className='relative'>
              <img src="/assets/Home-Hero-img.png" alt="" className='w-160 h-110 rounded-[50px] backdrop-blur-sm opacity-80'/>

              {/* img top element */}
              <div className='flex flex-col text-base w-51 gap-1 rounded-3xl font-medium text-black bg-white text-center py-3 absolute -left-25 bottom-16'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                  <p>
                    Over 1 Million
                  </p>
                  <img src="/assets/tree.png" alt="" />
                  <p>
                    Planted
                  </p>
                </div>
                <p>
                  2020 - 2021
                </p>
              </div>

            </div>
          </div>
        
        </div>

        {/* Mobile Hero Section */}
        <div className='flex flex-col gap-12 md:hidden'>
          {/* Left Section */}
          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl font-bold text-black leading-9 text-center'>
              <span data-aos='fade-in' data-aos-delay='200'>Join the Green Movement. </span> 
              <span data-aos='fade-in' data-aos-delay='800'> Plant a Tree.</span>
              <span data-aos='fade-in' data-aos-delay='1200'> Make a Difference.</span>               
            </h1>
            <p data-aos='fade-in' data-aos-delay='1600' className='text-base text-center font-medium text-black'>
              Join thousands of others in creating a greener, healthier planet—one tree at a time.
            </p>
            <div data-aos='fade-in' data-aos-delay='2000' className='flex flex-col gap-4 mt-8 items-center justify-center'>
              <Link to="/join">
                <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-white bg-[#006A34] rounded-sm py-3 w-60 group cursor-pointer'>
                  <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                    Be a Member
                  </p>
                  <img src="/assets/handshake.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                </button>
              </Link>
              <Link to="#join-section">
                <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-[#006A34] bg-none border-[1px] border-[#006A34] rounded-sm py-3 w-60 group cursor-pointer'>
                  <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                    How to Join
                  </p>
                  <img src="/assets/arrow-down.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div data-aos='fade-in' data-aos-delay='2400' className=''>
            <div className='relative flex items-center justify-center'>
              <img src="/assets/Home-Hero-img.png" alt="" className='w-full h-70 rounded-[50px] backdrop-blur-sm opacity-80'/>

              {/* img top element */}
              <div className='flex flex-col text-base w-51 gap-1 rounded-3xl font-medium text-black bg-white text-center py-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex flex-row gap-2 items-center justify-center'>
                  <p>
                    Over 1 Million
                  </p>
                  <img src="/assets/tree.png" alt="" />
                  <p>
                    Planted
                  </p>
                </div>
                <p>
                  2020 - 2021
                </p>
              </div>

            </div>
          </div>
        
        </div>

        {/* Mission Vision */}
        <div className='flex flex-col gap-4 items-center justify-center'>

          <div className='flex flex-col gap-6 md:gap-10 items-center justify-center md:pt-20 md:w-180 transition-all duration-500 ease-in-out'>
            <div 
              data-aos="fade-up" data-aos-delay="200" className='flex flex-row gap-3 items-center'>
              <h1 className='text-2xl md:text-5xl font-bold text-black'>{current.title}</h1>
              <img src={current.img} alt={current.title} className='w-10 md:w-20 rounded-full' />
            </div>
            <p 
              data-aos="fade-up" data-aos-delay="400" className='text-base md:text-2xl font-normal text-black leading-6 md:leading-9 text-center max-w-4xl'>
              {current.text}
            </p>
          </div>

          <div 
            data-aos="fade-up" data-aos-delay="400" className='flex flex-row gap-3 justify-center items-center mt-4'>
            {slides.map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === i ? 'bg-[#006A34] scale-110' : 'bg-gray-300'
                }`}
              ></span>
            ))}
          </div>

        </div>

        {/* Impact section */}
        <div 
          data-aos="fade-up" data-aos-delay="400" className='flex flex-row gap-5 items-center justify-center'>
          <h1 className='text-2xl md:text-5xl font-bold text-black'>
            Our Impact So Far
          </h1>
          <img src="/assets/leaf.png" alt="leaf" className='w-10 h-10 md:w-16 md:h-16' />
        </div>

        <div className='flex flex-col md:flex-row items-center gap-10 md:gap-30'>
          {/* Left Section */}
          <div className='hidden md:flex items-center justify-center relative '>
            <div 
              data-aos="fade-up" data-aos-delay="400" className=" bg-gradient-to-b from-[#75BA96] to-[#BDEAD7] w-145 h-150 rounded-4xl ml-40">                
            </div>
            <img data-aos="fade-up" data-aos-delay="600" src="/assets/impact.jpg" alt="" className='w-145 h-150 rounded-4xl absolute top-20 left-0 object-cover ' />
          </div>
          {/* Mobile Left Section */}
          <div data-aos="fade-up" data-aos-delay="400" className='flex md:hidden items-center justify-center'>
            <img src="/assets/impact.jpg" alt="" className=' rounded-4xl object-cover h-70 ' />
          </div>
          {/* Right Section */}
          <div className='flex flex-col justify-between md:w-110 h-120 md:h-140 items-center bg-[#005D2D] px-6 py-8 md:mt-10 rounded-xl text-lg md:text-2xl text-white text-center font-light' data-aos="fade-up" data-aos-delay="500">
            <p>
              <span className='font-bold'>2020 - 2021</span>
            </p>
            <div className='flex flex-row gap-2'>
              <p>
                Trees planted:
              </p>
              <span className='font-bold'>1 Million </span>
              <img src="/assets/tree-1.png" alt="" />
            </div>
            <p>
              Geographical reach: 
              <span className='font-bold'> Nationwide participation across urban and rural areas </span>
            </p>
            <p>
              Participants: 
              <span className='font-bold'> Thousands of individuals, including students, professionals, and community groups</span>
            </p>
            <p>
              Environmental Impact: 
              <span className='font-bold'> Significant contribution to reducing carbon footprint</span>
            </p>

          </div>


        </div>

        {/* How to Join */}
        <div className='flex flex-col gap-10 items-center justify-center py-10 border-5 border-[#005D2D] rounded-3xl md:mt-20' id="join-section" 
        data-aos="fade-up" data-aos-delay="200">
          <h1 className='text-4xl md:text-5xl font-bold text-[#006A34]' data-aos="fade-up" data-aos-delay="400">
            How to Join
          </h1>
          {/* Details section */}
          <div className='hidden md:flex flex-row gap-5 items-center justify-center'>
            <div className='flex flex-col gap-5 items-center justify-center' data-aos="fade-up" data-aos-delay="700">
              <img src="/assets/step-1.jpg" alt="" className='w-105 h-110 rounded-3xl object-cover'/>
              <p className='text-2xl font-bold text-[#006A34]'>Plant a Tree</p>
            </div>
            <div className='flex flex-col gap-5 items-center justify-center' data-aos="fade-up" data-aos-delay="700">
              <img src="/assets/step-2.jpg" alt="" className='w-105 h-110 rounded-3xl object-cover'/>
              <p className='text-2xl font-bold text-[#006A34]'>Take a Picture</p>
            </div>
            <div className='flex flex-col gap-5 items-center justify-center' data-aos="fade-up" data-aos-delay="700">
              <img src="/assets/step-3.jpg" alt="" className='w-105 h-110 rounded-3xl object-cover'/>
              <p className='text-2xl font-bold text-[#006A34]'>Register</p>
            </div>
          </div>

          {/* Mobile version */}
          <div className='md:hidden flex flex-col gap-6 items-start justify-center text-xl font-medium text-[#006A34]' data-aos="fade-up" data-aos-delay="300">
            <div className='flex flex-row gap-2'>
              <p>
                1. Plant a Tree
              </p>
              <img src="/assets/tree-2.png" alt="tree" />
            </div>
            <div className='flex flex-row gap-2'>
              <p>
                2. Take a Picture
              </p>
              <img src="/assets/camera.png" alt="tree" />
            </div>
            <div className='flex flex-row gap-2'>
              <p>
                3. Register
              </p>
              <img src="/assets/check.png" alt="tree" />
            </div>
          </div>

        </div>

        {/* Call to Action */}
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
              <button className='text-base font-normal text-white bg-[#01B157] w-full md:w-100 py-3 rounded-sm text-center shadow-[0px_1px_8.5px_0px_#5BE4A84F] hover:bg-[#01B157B2] cursor-pointer' data-aos="fade-up" data-aos-delay="800">
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
    </>
  )
}

export default Home

