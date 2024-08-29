"use client";
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const DropdownCategory: React.FC = () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <div onClick={(e) => e.preventDefault()} className='px-3 py-2 rounded-md bg-slate-200/85 font-medium'>
      <Space>
        Danh mục
        <DownOutlined />
      </Space>
    </div>
  </Dropdown>
);

export default DropdownCategory;