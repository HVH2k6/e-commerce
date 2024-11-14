import React from 'react';

const DetailProduct = () => {
  return (
    <div className='product-detail-layout'>
      <div className='product-detail-info'>
        <div className='product-detail-image p-5 bg-white rounded-lg'>
          <div className='border border-gray-300 rounded-lg flex items-center justify-center'>
            <img
              src='https://images.unsplash.com/photo-1731566121399-cc28c206e0ac?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt=''
              className='w-full h-96 object-cover object-center rounded-lg'
            />
          </div>
        </div>
        <div className='product-detail-overview p-5 bg-blue-400'></div>
      </div>
      <div className='product-detail-payment p-5 bg-green-300'></div>
    </div>
  );
};

export default DetailProduct;
