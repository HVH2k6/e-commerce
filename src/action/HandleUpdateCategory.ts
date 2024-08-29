'use server';

import { API } from '@/utils/constant';
import { revalidateTag } from 'next/cache';

export const HandleUpdateCategory = async (id: number, data: any) => {
  const response = await fetch(`${API.CATEGORY}/update/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Use JSON.stringify here
  });
  console.log(response);
  revalidateTag('category');

  return await response.json();
};
