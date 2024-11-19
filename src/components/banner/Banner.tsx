'use client';

import { Carousel } from 'antd';
export default function Banner() {
  return (
    <Carousel arrows autoplay>
        <div className='w-full h-80 relative rounded-lg'>
          <img
            src='https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full object-cover object-center rounded-lg'
          />
          <div className='absolute bottom-5 left-5 max-w-2xl'>
            <button className='bg-blue-500 text-white px-4 py-3 rounded-md rounded-2xl'>
              Buy now
            </button>
          </div>
        </div>
        <div className='w-full h-80 relative rounded-lg'>
          <img
            src='https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full object-cover object-center rounded-lg'
          />
          <div className='absolute bottom-5 left-5 max-w-2xl'>
            <button className='bg-blue-500 text-white px-4 py-3 rounded-md rounded-2xl'>
              Buy now
            </button>
          </div>
        </div>
      </Carousel>
  );
}
