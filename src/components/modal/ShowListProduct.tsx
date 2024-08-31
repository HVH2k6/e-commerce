'use client';
import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import IProduct from '@/types/product';
import Image from 'next/image';

interface IProps {
  data: IProduct[] | [];
}

const ShowListProduct = (props: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data } = props;
  if (!data) return null;
  return (
    <div>
      <Button type='primary' onClick={showModal}>
        Xem chi tiết
      </Button>
      <Modal
        title='Danh sách sản phẩm'
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <div className='relative overflow-x-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  Id sản phẩm
                </th>
                <th scope='col' className='px-6 py-3'>
                  Hình ảnh
                </th>
                <th scope='col' className='px-6 py-3'>
                  Tên sản phẩm
                </th>
                <th scope='col' className='px-6 py-3'>
                  Giá
                </th>
                <th scope='col' className='px-6 py-3'>
                  Giảm giá
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((product) => (
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    key={product?.id}
                  >
                    <td className='px-6 py-4'>{product?.id}</td>
                    <td className='px-6 py-4'>
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        width={50}
                        height={50}
                        style={{ objectFit: 'cover' }}
                      />
                    </td>
                    <td className='px-6 py-4'>{product?.name}</td>
                    <td className='px-6 py-4'>{product?.price}$</td>
                    <td className='px-6 py-4'>{product?.sale}%</td>
                  </tr>
                ))
              ) : (
                <p>Không có sản phẩm nào trong danh sách sale</p>
              )}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default ShowListProduct;
