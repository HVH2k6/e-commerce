import { API } from '@/utils/constant';
import ProductCard from './ProductCard';
import TimeCountDown from '../time/TimeCountDown';

const FlashSaleProductList = async () => {
  const response = await fetch(`${API.SALE}`, {
    method: 'GET',
    next:{tags: ['sale']}
  });
  const data = await response.json();

  const timeNow = new Date();

  return (
    <>
      {data.map((product: any, index: number) => (
        <>
          {timeNow <= new Date(product.timeStart) ||
          timeNow > new Date(product.timeEnd) ? null : (
            <div key={index} className='mb-10 last:mb-0'>
              <div className='flex items-center mb-8'>
                <h2 className='text-3xl font-bold'>{product.titleSale}</h2>
                <TimeCountDown
                  time_start={product.timeStart}
                  time_end={product.timeEnd}
                ></TimeCountDown>
                <button className='ml-auto text-blue-500 font-medium'>
                  Xem thêm
                </button>
              </div>
              <div className='grid grid-cols-4 gap-x-5'>
                {product?.listProductSale &&
                  product?.listProductSale.map((item: any, index: number) => (
                    <ProductCard key={index} data={item}></ProductCard>
                  ))}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default FlashSaleProductList;
