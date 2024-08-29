'use client';
import ICategory from '@/types/category';

import { Button, Space, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import UpdateCategory from './UpdateCategory';
import DeleteCategory from './DeleteCategory';
// import DeleteProduct from "./DeleteProduct";
// import UpdateProduct from "./UpdateProduct";
interface IProps {
  data: ICategory[] | [];
}
export default function TableCategory(props: IProps) {
  const { data } = props;
  const columns: ColumnType<ICategory>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
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
      title: 'Tên danh mục',
      dataIndex: 'name_category',
    },
    {
      title: 'Id danh mục cha',
      dataIndex: 'parent_id',
    },
    {
      title: 'Hành động',
      render: (_, record) => (
          <Space size='middle' key={record.id}>
              <UpdateCategory id={record.id}></UpdateCategory>
             <DeleteCategory id={record.id}></DeleteCategory>
          </Space>
        ),
    },
  ];
  return (
    <div>
      <h1>Danh sách</h1>
      <div className=''>
        <Table rowKey={'id'} dataSource={data} columns={columns} />
      </div>
    </div>
  );
}
