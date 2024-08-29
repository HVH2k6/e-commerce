"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleCreateProduct = async (data: any) => {
    const response = await fetch(`${API.Product}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag('product')

    return await response.json();
};
