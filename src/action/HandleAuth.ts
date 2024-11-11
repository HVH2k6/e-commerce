'use server';

import { API } from '@/utils/constant';
import { revalidateTag } from 'next/cache';

export const HandleCreateAuth = async (data: any) => {
  const response = await fetch(`${API.AUTH}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  revalidateTag('auth');

  return await response.json();
};
