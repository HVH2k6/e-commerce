'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import ICart from '@/types/cart';
import Table, { ColumnType } from 'antd/es/table';
import { Button, Space, Spin } from 'antd';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
const CheckOut = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { userInfo, loading } = useAuth();
  const columns: ColumnType<ICart>[] = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      render: (image) => (
        <img
          src={image}
          alt='image'
          width={50}
          height={50}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            onClick={() => updateQuantity(record.id, -1)}
            disabled={record.quantity === 1}
          >
            -
          </Button>
          <span style={{ margin: '0 10px' }}>{record.quantity}</span>
          <Button onClick={() => updateQuantity(record.id, 1)}>+</Button>
        </div>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (price, record) => <span>{price * record.quantity} VNĐ</span>, // Hiển thị giá tổng
    },
    {
      title: 'Màu sắc',
      dataIndex: 'color',
    },
    {
      title: 'Size',
      dataIndex: 'size',
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space size='middle' key={record.id}>
          <Button danger onClick={() => removeFromCart(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];
  // if (loading) {
  //   return <Spin></Spin>;
  // }

  return (
    <div>
      <h1>Giỏ Hàng</h1>
      <div className='mt-5 grid grid-cols-12 gap-x-5'>
        <div className='col-span-9'>
          <Table rowKey={'id'} dataSource={cart} columns={columns} />
        </div>
        <div className='col-span-3'>
          <div className='box-content-page'>
            <h4 className='font-semibold mb-2'>Thông tin thanh toán</h4>
            {!userInfo?.address && (
              <p>Vui lòng cập nhật địa chỉ <Link href={"/profile"}>Tại đây</Link></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
