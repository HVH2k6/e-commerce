import IProduct from '@/types/product';
import { API } from '@/utils/constant';
import axios from 'axios';
import React from 'react';
import ProductCard from './ProductCard';


const NewProductList =async () => {
  const response = await axios.get(`${API.Product}/getAll`);
  const data = response.data; 
  if (!data) return <p>Loading...</p>;
  return (
    <div className="">
      <h2 className='text-3xl font-bold mb-10'>Sản phẩm mới nhất</h2>
     <div className="grid grid-cols-6 gap-5">
     {data.map((item: IProduct) => ( <ProductCard data={item} key={item.id} />))}
     </div>
    </div>
    
  );
};

export default NewProductList;
