import React from 'react';
import StarIcon from '../icon/StarIcon';
import { Button } from 'antd';

const ProductCard = () => {
  return (
    <div className='w-full rounded-md border border-slate-300'>
      <img
        src='https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MT3Q3ref_VW_34FR+watch-case-45-stainless-silver-s9_VW_34FR+watch-face-45-stainless-silver-s9_VW_34FR?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=VGhSS0g2WFFuQ1NDd2xwd1MrR3QzWnVsTWtoL3UvVVIySFozL2tLNWx3cVRKdUh0Unp5NXkrc0YwdXBoTFhQK1lmQTM3dWwxOEVOeWkrSnZJS3hUWHNydjc4ZWxiQS90bXRWbjU1eGZDQXFVRi9IMnc3cDFJTlk0QmYvWlpsNG40a2ZsMWFEQUtHTEtwWW1zRk1tSUpzQTl5YVVzblkyVHlGdzlua1JZYkw3eFBYN1QxYzVKQXZvbXpRaU9oa2xkZHZkazlhSGFRM1ZuNElFd082NEFkSlVSRk1IY205VTVKa2JNeXMwalZBVT0='
        alt=''
        className='w-full h-60 object-cover object-center rounded-md'
      />

      <div className='p-2'>
        <h3 className='text-xl font-semibold mb-5'>Apple watch sersies 9</h3>
        <div className='flex items-center justify-between'>
          <span className='bg-blue-300/40 text-blue-500 px-2 py-1.5 rounded-md'>
            Apple
          </span>
          <span className='bg-green-300/40 text-green-500 px-2 py-1.5 rounded-md'>
            Đồng hồ
          </span>
        </div>

        <div className='flex items-center justify-between my-5'>
          <div className='flex items-center'>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
          </div>
          <span className='font-medium'>500$</span>
        </div>
        <Button type='primary' className='w-full'>
          Mua ngay
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
