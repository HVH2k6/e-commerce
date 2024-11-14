import { API } from '@/utils/constant';
import ProductCard from './ProductCard';
import TimeCountDown from '../time/TimeCountDown';
import IProduct from '@/types/product';
import ISale from '@/types/sale';

const FlashSaleProductList = async () => {
  const response = await fetch(`${API.SALE}`, {
    method: 'GET',
    next: { tags: ['sale'] },
  });
  const data = await response.json();
  // console.log('FlashSaleProductList ~ data:', data);

  const timeNow = new Date().getTime();

 

  return (
    <>
      {data.map((product: ISale, index: number) => (
        <div className='mt-5' key={index}>
          {timeNow >= new Date(product.timeStart).getTime() &&
          timeNow <= new Date(product.timeEnd).getTime() ? (
            <div className='box-content-home-page'>
              <div className='flex items-center mb-8'>
                <h2 className='text-3xl font-bold'>{product.titleSale}</h2>
                <TimeCountDown
                  time_start={product.timeStart}
                  time_end={product.timeEnd}
                ></TimeCountDown>
                <button className='ml-auto text-blue-500 font-medium'>
                  Xem thêm
                </button>
              </div>
              <div className='grid grid-cols-4 gap-x-5'>
                {product?.listProductSale &&
                  product?.listProductSale.map((item: any, index: number) => (
                    <ProductCard key={index} data={item}></ProductCard>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </>
  );
};

export default FlashSaleProductList;
