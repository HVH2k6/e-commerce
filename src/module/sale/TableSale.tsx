'use client';
import ShowListProduct from '@/components/modal/ShowListProduct';
import ISale from '@/types/sale';
import { Space } from 'antd';
import Table, { ColumnType } from 'antd/es/table';
import React from 'react';
import UpdateSaleProduct from './UpdateSaleProduct';
interface IProps {
  data: ISale[] | [];
}
export default function TableSale(props: IProps) {
  const { data } = props;

  const columns: ColumnType<ISale>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
    },

    {
      title: 'Tiêu dề giảm giá',
      dataIndex: 'titleSale',
    },
    {
      title: 'Thời gian bắt đầu',
      // dataIndex: ,
      render: (_, record) => (
        <span>{new Date(record.timeStart).toLocaleString()}</span>
      ),
    },
    {
      title: 'Thời gian kết thúc',
      // dataIndex: ,
      render: (_, record) => (
        <span>{new Date(record.timeEnd).toLocaleString()}</span>
      ),
    },
    {
      title: 'Danh sách sản phẩm sale',
      render: (_, record) => (
        <>
          <ShowListProduct
            data={record.listProductSale}
            key={record.id}
          ></ShowListProduct>
        </>
      ),
    },
    {
      title: 'Hành động',
      render: (_, record) => (
        <Space size='middle' key={record.id}>
          <UpdateSaleProduct id={record.id}></UpdateSaleProduct>
          {/* <DeleteProduct id={record.id}></DeleteProduct> */}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <div className=''>
        <Table rowKey={'id'} dataSource={data} columns={columns} />
      </div>
    </div>
  );
}
