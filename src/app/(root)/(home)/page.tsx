import Banner from '@/components/banner/Banner';
import SideBarCategory from '@/components/layout/SideBarCategory';

import FlashSaleProductList from '@/components/product/FlashSaleProductList';
import NewProductList from '@/components/product/NewProductList';

export default function HomePage() {
  return (
    <div>
      <div className='pt-10'>
        {/* <FlashSaleProductList></FlashSaleProductList> */}
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-3'>
            <SideBarCategory></SideBarCategory>
          </div>

          <div className='col-span-9 '>
            <div className='box-content-home-page'>
              <Banner></Banner>
            </div>

            <FlashSaleProductList></FlashSaleProductList>
          </div>
        </div>
      </div>
    </div>
  );
}
