import createSlug from '@/context/create-slug';
import ICategory from '@/types/category';
import { API } from '@/utils/constant';
import { assert } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const SideBarCategory = async () => {
  const response = await fetch(`${API.CATEGORY}/`, {
    method: 'GET',
    next: {
      tags: ['category'],
    },
  });

  const data = await response.json();
  if (!data) return <p>Loading...</p>;
  return (
    <div className='sidebar-category'>
      <h3 className='font-medium mb-3'>Danh mục</h3>
      <ul className='flex flex-col gap-y-2'>
        {data &&
          data.map((item: ICategory) => (
            <li key={item.id} className='px-4 py-2 rounded-xl hover:bg-gray-500/30'>
              <Link href={createSlug(item.name_category)} className='flex items-center'>
                <Image
                  src={item.image!}
                  alt={item.name_category}
                  width={42}
                  height={42}
                  className='mr-4 size-[42px]'
                />
                <span>{item.name_category}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SideBarCategory;
