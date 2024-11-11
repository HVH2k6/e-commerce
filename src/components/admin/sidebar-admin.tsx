import React from 'react';

import {
  AppstoreOutlined,
  ClusterOutlined,
  FolderOutlined,
  GroupOutlined,
  HomeOutlined,
  IdcardOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';
import LinkAdminSidebar from './LinkAdminSidebar';

import SaleIcon from '../icon/SaleIcon';

type MenuItem = Required<MenuProps>['items'][number];

const SidebarAdmin = () => {
  const items: MenuItem[] = [
    {
      key: 'sub0',
      icon: <HomeOutlined />,
      label: <LinkAdminSidebar name='Trang chủ' url='/' />,
    },
    {
      key: 'sub1',
      icon: <AppstoreOutlined />,
      label: <LinkAdminSidebar name='Trang tổng quan' url='/admin/dashboard' />,
    },
    {
      key: 'sub2',
      icon: <FolderOutlined />,
      label: <LinkAdminSidebar name='Sản phẩm' url='/admin/product' />,
    },
    {
      key: 'sub2.1',
      icon: <SaleIcon />,
      label: (
        <LinkAdminSidebar
          name='Thêm danh sách giảm giá'
          url='/admin/sale-product'
        />
      ),
    },
    {
      key: 'sub3',
      label: <LinkAdminSidebar name='Danh mục' url='/admin/category' />,
      icon: <GroupOutlined />,
    },
    {
      key: 'sub4',
      label: <LinkAdminSidebar name='Người dùng' url='/admin/auth' />,
      icon: <TeamOutlined />,
    },

    {
      key: 'sub5',
      label: <LinkAdminSidebar name='Nhóm quyềm' url='/admin/role' />,
      icon: <IdcardOutlined />,
    },
    {
      key: 'sub6',
      label: <LinkAdminSidebar name='Phân quyền' url='/admin/permission' />,
      icon: <ClusterOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{ width: 256 }}
      mode='inline'
      items={items}
    />
  );
};

export default SidebarAdmin;
