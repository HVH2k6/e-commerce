'use server';

import { API } from '@/utils/constant';
import { revalidateTag } from 'next/cache';

export const HandleUpdateUser = async (id: number, data: any) => {
  const response = await fetch(`${API.AUTH}/update/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Use JSON.stringify here
  });

  return await response.json();
};
