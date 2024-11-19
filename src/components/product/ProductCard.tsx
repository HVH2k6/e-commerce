import React from 'react';
import StarIcon from '../icon/StarIcon';
import { Button } from 'antd';
import IProduct from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import createSlug from '@/context/create-slug';
interface IProps {
  data: IProduct;
}
const ProductCard = (props: IProps) => {
  const { data } = props;
  if (!data) return <p>Loading...</p>;

  return (
    <div className='w-full rounded-md border border-slate-300'>
      <Link href={`/product/${data.slug}`}>
        <Image
          src={data.image}
          alt='Anh'
          className='w-full h-52 object-cover object-center rounded-md mix-blend-multiply'
          width={200}
          height={200}
        />

        <div className='p-2'>
          <h3 className='text-xl font-semibold mb-3'>{data.name}</h3>
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center'>
              <span>{data.rating}</span> <StarIcon></StarIcon>
            </div>
          </div>
          {data.sale ? (
            <div className=''>
              <span className='font-medium text-red-500  line-through'>
                {data.price} VNĐ
              </span>
              <div className='flex items-center gap-x-2'>
                <span className='p-1 text-xs rounded-md bg-slate-200 '>
                  {data.sale}%
                </span>
                <span className='text-sm'>
                  {Math.floor(Number((data.price * (100 - data.sale)) / 100))}{' '}
                  VNĐ
                </span>
              </div>
            </div>
          ) : (
            <span className='font-semibold'>
              {data.price} VNĐ
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
