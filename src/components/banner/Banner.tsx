'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
export default function Banner() {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay: 5000 }}
    >
      <SwiperSlide>
        <div className='w-full h-[420px] relative'>
          <img
            src='https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full object-cover object-center'
          />
          <div className='absolute bottom-5 left-5 max-w-2xl'>
            <h2 className=' font-black text-5xl'>Iphone 9 pro max</h2>
            <p className='text-gray-300 block my-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              voluptatum deleniti quae est, possimus dolore, facilis aliquam
              tempore libero asperiores culpa ullam molestiae quasi minima! At
              blanditiis labore cumque perferendis.
            </p>
            <button className='bg-blue-500 text-white px-4 py-3 rounded-md rounded-2xl '>
              Buy now
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='w-full h-[420px] relative'>
          <img
            src='https://images.unsplash.com/photo-1723920515274-ace3503adad6?q=80&w=2013&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt=''
            className='w-full h-full object-cover object-center'
          />
          <div className='absolute bottom-5 left-5 max-w-2xl'>
            <h2 className=' font-black text-5xl'>Iphone 9 pro max</h2>
            <p className='text-gray-300 block my-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              voluptatum deleniti quae est, possimus dolore, facilis aliquam
              tempore libero asperiores culpa ullam molestiae quasi minima! At
              blanditiis labore cumque perferendis.
            </p>
            <button className='bg-blue-500 text-white px-4 py-3 rounded-md rounded-2xl '>
              Buy now
            </button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
