import React from 'react';
import StarIcon from '../icon/StarIcon';
import { Button } from 'antd';
import IProduct from '@/types/product';
interface IProps {
  data: IProduct;
}
const ProductCard = (props: IProps) => {
  const { data } = props;
  // console.log("ProductCard ~ data:", data)

  return (
    <div className='w-full rounded-md border border-slate-300'>
      <img
        src={data.image}
        alt=''
        className='w-full h-52 object-cover object-center rounded-md mix-blend-multiply'
      />

      <div className='p-2'>
        <h3 className='text-xl font-semibold mb-5'>{data.name}</h3>
        {data.sale && (
          <div className=''>
            <span className='font-medium text-red-500 text-xl line-through'>
              {data.price}$
            </span>
            <div className='flex items-center gap-x-2'>
              <span className='p-1 text-xs rounded-md bg-slate-200 '>
                {data.sale}%
              </span>
              <span className='text-sm'>
                {Math.floor(Number((data.price * (100 - data.sale)) / 100))}$
              </span>
            </div>
          </div>
        )}
        <span className='font-medium'>{data.price}$</span>

        <div className='flex items-center justify-between my-5'>
          <div className='flex items-center'>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
            <StarIcon></StarIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
