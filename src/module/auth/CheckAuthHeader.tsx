'use client';

import { useAuth } from '@/context/AuthContext';
import { Badge, Button, Dropdown, MenuProps, Space, Spin } from 'antd';
import Link from 'next/link';
import ButtonSignOut from '@/components/button/ButtonSignOut';
import { BellFilled } from '@ant-design/icons';

export default function CheckAuthHeader() {
  const { userInfo, loading } = useAuth();

  const covertTextToLowerCase = (text: string) => text.toLowerCase();
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div>
          <Link href='/profile'>Hồ sơ</Link>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div>
          {userInfo !== null && userInfo?.name_role == 'admin' && (
            <Link href='/admin/dashboard'>Quản lý</Link>
          )}
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div>
          <ButtonSignOut />
        </div>
      ),
    },
  ];

  if (loading) {
    return <Spin size='small' />;
  }

  return (
    <>
      {!userInfo || Object.keys(userInfo).length === 0 ? (
        <>
          <div className='header-nav-item'>
            <Link href={'/auth/login'}>Tài khoản</Link>
          </div>
        </>
      ) : (
        <div className='flex items-center gap-x-4 relative flex-col'>
          <Space direction='horizontal'>
            <Space wrap>
              <Dropdown menu={{ items }} placement='bottomLeft' arrow>
                <img src={userInfo.avatar} alt='' className='avatar' />
              </Dropdown>
            </Space>
            <Badge count={5} size='small'>
              <BellFilled shape='square' size={40} />
            </Badge>
          </Space>
        </div>
      )}
    </>
  );
}
