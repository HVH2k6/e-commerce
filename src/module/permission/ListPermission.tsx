'use client';
import React, { useState } from 'react';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import EditPermission from './EditPermission';
import { useRouter } from 'next/navigation';

type Permission = {
  _id: string;
  name: string;
  apiPath: string;
  modules: string;
  method: string;
};

type GroupedPermissions = {
  [module: string]: Permission[];
};
interface IProps {
  permissions: GroupedPermissions;
}
const ListPermission = (props: IProps) => {
  const { permissions } = props;
  const { refresh } = useRouter();
  const items: CollapseProps['items'] = Object.keys(permissions).map(
    (module) => ({
      key: module,
      label: <>{module}</>,
      children: (
        <ul>
          {permissions[module]?.map((item: Permission) => (
            <li
              key={item._id}
              className='list-disc list-inside flex items-center justify-between mb-2'
            >
              <span>
                {item.name} - {item.apiPath} - {item.method}
              </span>
              <div className='flex items-center gap-x-4'>
                <EditPermission id={item._id} />
              </div>
            </li>
          ))}
        </ul>
      ),
    })
  );

  const handleReload = () => {
    refresh();
  };
  return (
    <>
      <button
        onClick={handleReload}
        className='ml-5 bg-blue-400 p-2 rounded-lg'
      >
        <span className='text-white'>
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
              d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
            />
          </svg>
        </span>
      </button>
      <div className="mt-5">
      <Collapse items={items} />
      </div>
    </>
  );
};

export default ListPermission;
