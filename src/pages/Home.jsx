import React from 'react'
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


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
    AOS.init({ duration: 2000 });
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
      <div className='flex flex-col gap-20 px-20 py-20 bg-[#E3FFEF]'>

        {/* Hero Section */}
        <div className='flex flex-col gap-4 pb-20 relative'>
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
              <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-white bg-[#006A34] rounded-sm py-3 w-50 group cursor-pointer'>
                <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                  Be a Member
                </p>
                <img src="/assets/handshake.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
              </button>
              <button className='flex flex-row items-center justify-center gap-2 text-base font-medium text-[#006A34] bg-none border-[1px] border-[#006A34] rounded-sm py-3 w-50 group cursor-pointer'>
                <p className='translate-x-2 transition-all duration-300 group-hover:-translate-x-1'>
                  How to Join
                </p>
                <img src="/assets/arrow-down.png" alt="" className='opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
              </button>
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

        {/* Mission Vision */}
        <div className='flex flex-col gap-4 items-center justify-center'>

          <div className='flex flex-col gap-10 items-center justify-center pt-20 w-180 transition-all duration-500 ease-in-out'>
            <div className='flex flex-row gap-2 items-center'>
              <h1 className='text-5xl font-bold text-black'>{current.title}</h1>
              <img src={current.img} alt={current.title} />
            </div>
            <p className='text-2xl font-normal text-black leading-9 text-center max-w-4xl'>
              {current.text}
            </p>
          </div>

          <div className='flex flex-row gap-3 justify-center items-center mt-4'>
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
        <div className='flex flex-row gap-5 items-center justify-center'>
          <h1 className='text-5xl font-bold text-black'>
            Our Impact So Far
          </h1>
          <img src="/assets/leaf.png" alt="leaf" className='w-16 h-16' />
        </div>

        <div className='flex flex-row items-center gap-30'>
          {/* Left Section */}
          <div className='flex items-center justify-center relative '>
            <div className="bg-gradient-to-b from-[#75BA96] to-[#BDEAD7] w-145 h-150 rounded-4xl ml-40"></div>
            <img src="/assets/impact.jpg" alt="" className='w-145 h-150 rounded-4xl absolute top-20 left-0 object-cover ' />
          </div>
          {/* Right Section */}
          <div className='flex flex-col justify-between w-110 h-140 items-center bg-[#005D2D] px-6 py-8 mt-10 rounded-xl text-2xl text-white text-center font-light'>
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
        <div className='flex flex-col gap-10 items-center justify-center py-10 border-5 border-[#005D2D] rounded-3xl mt-20'>
          <h1 className='text-5xl font-bold text-[#006A34]'>
            How to Join
          </h1>
          {/* Details section */}
          <div className='flex flex-row gap-5 items-center justify-center'>
            <div className='flex flex-col gap-5 items-center justify-center'>
              <img src="/assets/step-1.jpg" alt="" className='w-105 h-110 rounded-3xl object-cover'/>
              <p className='text-2xl font-bold text-[#006A34]'>Plant a Tree</p>
            </div>
            <div className='flex flex-col gap-5 items-center justify-center'>
              <img src="/assets/step-2.jpg" alt="" className='w-105 h-110 rounded-3xl object-cover'/>
              <p className='text-2xl font-bold text-[#006A34]'>Take a Picture</p>
            </div>
            <div className='flex flex-col gap-5 items-center justify-center'>
              <img src="/assets/step-3.jpg" alt="" className='w-105 h-110 rounded-3xl object-cover'/>
              <p className='text-2xl font-bold text-[#006A34]'>Register</p>
            </div>
          </div>

        </div>

        {/* Call to Action */}
        <div className='flex flex-row gap-10 py-10 px-8 bg-gradient-to-r from-[#006A3C] to-[#4E896B] rounded-3xl'>
          {/* Left section */}
          <div className='flex flex-col items-start justify-center gap-6'>
            <h1 className='text-5xl font-bold text-white'>
              Let's Make This Year Even Greener.
            </h1>
            <p className='text-2xl font-medium text-white'>
              Our planet needs more than promises — it needs action. With over 1 million trees already in the ground, your next step could be the one that sparks a ripple of change for generations to come.
            </p>
            <button className='text-base font-normal text-white bg-[#01B157] w-100 py-3 rounded-sm text-center shadow-[0px_1px_8.5px_0px_#5BE4A84F] hover:bg-[#01B157B2]'>
              Be a Member
            </button>
          </div>
          {/* Right section */}
          <div>
            <img src="/assets/HomeEnd.jpg" alt="" className='rounded-xl object-cover w-450 h-100'/>
          </div>
        </div>



      </div>
    </>
  )
}

export default Home