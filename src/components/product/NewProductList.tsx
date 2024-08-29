import React from 'react';
import NewProductLarge from './NewProductLarge';
import NewProductSmall from './SmallProductLarge';

const NewProductList = () => {
  return (
    <div className="">
      <h2 className='text-3xl font-bold mb-10'>Sản phẩm mới nhất</h2>
      <div className='grid grid-cols-2 gap-x-7'>
      <div>
        <NewProductLarge></NewProductLarge>{' '}
      </div>
      <div className='grid grid-rows-2 gap-y-5 h-[350px] overflow-hidden'>
        <NewProductSmall></NewProductSmall>
        <NewProductSmall></NewProductSmall>
      </div>
    </div>
    </div>
  );
};

export default NewProductList;
