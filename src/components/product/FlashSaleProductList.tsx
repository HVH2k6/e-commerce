import ProductCard from "./ProductCard";

const FlashSaleProductList = () => {
  return (
    <div>
      <div className='flex items-center mb-8'>
        <h2 className='text-3xl font-bold'>Sản phẩm sale sốc</h2>
        <div className='flex items-center gap-x-4 ml-8'>
          <span className='p-2 bg-red-500 rounded-md font-medium text-white'>
            03
          </span>
          <span className='p-2 bg-red-500 rounded-md font-medium text-white'>
            03
          </span>
          <span className='p-2 bg-red-500 rounded-md font-medium text-white'>
            03
          </span>
        </div>
        <button className="ml-auto text-blue-500 font-medium">Xem thêm</button>
      </div>
      <div className="grid grid-cols-4 gap-x-5">
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>
        <ProductCard></ProductCard>

      </div>
    </div>
  );
};

export default FlashSaleProductList;
