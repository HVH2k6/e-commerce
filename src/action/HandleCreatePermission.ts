'use server';

import { API } from '@/utils/constant';
import { revalidateTag } from 'next/cache';

export const HandleCreatePermission = async (data: any) => {
    try {
        const response = await fetch(`${API.PERMISSION}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server Error:', errorText);
            throw new Error(`Failed to create permission: ${errorText}`);
        }

        revalidateTag('permission');

        return await response.json();
    } catch (error) {
        console.error('Error in HandleCreatePermission:', error);
        throw error;
    }
};
