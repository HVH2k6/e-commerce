'use client';

import { Image, InputNumber, message } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import StarIcon from '../icon/StarIcon';
import IProduct from '@/types/product';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface IProps {
  data: IProduct;
}
const DetailProduct = (props: IProps) => {
  const { data } = props;
  // console.log('DetailProduct ~ data:', data);
  const thumbnail = data.image;
  // Set the initial main image URL
  const [mainImageUrl, setMainImageUrl] = useState(thumbnail);

  // List of thumbnail images
  const listImageArray = Array.isArray(data.list_image)
    ? data.list_image
    : JSON.parse(data.list_image || '[]');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    color: string;
    size: string;
    price: number;
  } | null>(null);

  // Nội dung mô tả
  const description = data.description || '';
  
  const [quantityProduct, setQuantityProduct] = useState(1);
  // Xử lý rút gọn mô tả nếu cần
  const MAX_LENGTH = 550;
  const isLongDescription = description.length > MAX_LENGTH;
  const {addToCart} = useCart();

  const shortDescription = isLongDescription
    ? description.slice(0, MAX_LENGTH) + '...'
    : description;
    const router = useRouter();
    const handleAddToCart = () => {
      if (selectedItem) {
        const cartItem = {
          id: data.id,
          name: data.name,
          image: data.image,
          color: selectedItem.color,
          size: selectedItem.size,
          quantity: quantityProduct,
          price: selectedItem.price,
          slug: data.slug,
        };
        
        addToCart(cartItem);
        router.push("/product/checkout")

      }else{
        return message.warning("Vui lòng chọn mục cần mua")
      }
    }
  return (
    <div className='product-detail-layout'>
      <div className='product-detail-info'>
        <div className='product-detail-image p-5 bg-white rounded-lg'>
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`),
            }}
          >
            <div className='border border-gray-300 rounded-lg flex items-center justify-center'>
              <Image
                src={mainImageUrl}
                alt=''
                className='custom-image-detail-product'
                width={'100%'}
                height={320}
              />
            </div>
          </Image.PreviewGroup>

          {/* Thumbnails */}
          <div className='flex items-center gap-x-3 mt-6 overflow-x-auto'>
            <img
              src={data.image}
              alt=''
              className='h-20 object-cover object-center rounded-lg cursor-pointer'
              width={80}
              height={60}
              onClick={() => setMainImageUrl(data.image)} // Set main image when clicked
            />

            {listImageArray &&
              listImageArray.map((url: string) => (
                <div
                  key={url}
                  className={`border border-gray-300 rounded-lg ${
                    mainImageUrl === url ? 'border-blue-500' : ''
                  }`.trim()}
                >
                  <img
                    src={url}
                    alt=''
                    className='h-20 object-cover object-center rounded-lg cursor-pointer'
                    width={80}
                    height={60}
                    onClick={() => setMainImageUrl(url)} // Set main image when clicked
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Product Overview */}
        <div className='product-detail-overview'>
          <div className='box-content-page'>
            <div className='mb-1.5'>
              <span>Thương hiệu</span>
              <Link href={'/brand'} className='text-blue-500 inline-block ml-2'>
                Apple
              </Link>
            </div>
            <div className='mb-1.5'>
              <span>Danh mục</span>
              <Link
                href={`/category/${data?.category}`}
                className='text-blue-500 inline-block ml-2'
              >
                Apple
              </Link>
            </div>
            <h3 className='font-semibold mb-2 text-2xl'>{data.name}</h3>
            <div className='flex items-center mb-3'>
              <div className='font-medium flex items-center gap-x-2'>
                <span>4.5</span> <StarIcon></StarIcon>
              </div>
              <span className='inline-block ml-5'>Đã bán 60</span>
            </div>
            <div className='flex items-center gap-x-2 mb-3'>
              <span className='font-semibold text-red-500 text-lg'>
                {selectedItem?.price || data.price}VNĐ
              </span>
              <div className='flex items-center gap-x-2'>
                <span className='p-1 text-xs rounded-md bg-slate-200'>10%</span>
                <span className='font-medium  line-through'>
                  {(selectedItem?.price || data.price) -
                    (selectedItem?.price || data.price) * data.sale}{' '}
                  VNĐ
                </span>
              </div>
            </div>
            <div className=''>
              <h3 className='font-semibold mb-2'>Chọn chi tiết</h3>
              <div className='flex items-center flex-wrap gap-4'>
                {data.detail_selected.map((item, index: number) => (
                  <div
                    className={`border rounded-lg px-3 py-2 cursor-pointer ${
                      selectedItem?.color === item.color &&
                      selectedItem?.size === item.size &&
                      selectedItem?.price === item.price
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    }`}
                    key={index}
                    onClick={() => setSelectedItem(item)} // Set selected item on click
                  >
                    {item.color} - {item.size} - {item.price}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='box-content-page mt-10'>
            <h4 className='font-semibold'>Mô tả</h4>
            <div className='description-product'>
              <div
                dangerouslySetInnerHTML={{
                  __html: showFullDescription ? description : shortDescription,
                }}
              ></div>
            </div>

            {/* Nút Load More */}
            {isLongDescription && (
              <button
                className='text-blue-500 mt-4'
                onClick={() => setShowFullDescription((prev) => !prev)}
              >
                {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className='product-detail-payment box-content-page'>
        <h4 className='font-semibold'>Chi tiết thanh toán</h4>
        <div className='flex items-center'>
          <img
            src={data.image}
            alt='anh'
            className='w-16 h-20 object-cover'
            loading='lazy'
          />
          <h3 className='font-semibold ml-2'>{data.name}</h3>
          <div className='flex items-center'>
            <div
              className={`border border-gray-300 rounded-lg p-2${
                quantityProduct === 1 &&
                'cursor-not-allowed pointer-events-none'
              }`}
              onClick={() => {
                setQuantityProduct(quantityProduct - 1);
                if (quantityProduct < 1) setQuantityProduct(1);
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 12h-15'
                />
              </svg>
            </div>
            <InputNumber
              value={quantityProduct}
              min={1}
              max={999}
              onChange={(value) => {
                if (value) setQuantityProduct(value);
              }}
            />
            <div
              className={`border border-gray-300 rounded-lg p-2${
                quantityProduct === 999 &&
                'cursor-not-allowed pointer-events-none'
              }`}
              onClick={() => {
                setQuantityProduct(quantityProduct + 1);
                if (quantityProduct > 999) setQuantityProduct(999);
              }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 4.5v15m7.5-7.5h-15'
                />
              </svg>
            </div>
          </div>
        </div>
        {selectedItem ? (
          <div className='mt-5'>
            <h4 className='font-semibold'>Chi tiết sản phẩm đã chọn:</h4>
            <p>Màu sắc: {selectedItem.color}</p>
            <p>Kích thước: {selectedItem.size}</p>
            <p>Giá: {selectedItem.price} VNĐ</p>
            <span>Tổng giá: {selectedItem?.price * quantityProduct}</span>
          </div>
        ) : (
          <p>Hãy chọn chi tiết sản phẩm</p>
        )}
        <button
          className='block mt-5 font-semibold text-white bg-red-400 w-full py-2 rounded-md text-center'
        onClick={handleAddToCart}
        >
          Mua ngay
        </button>
        
      </div>
    </div>
  );
};

export default DetailProduct;
