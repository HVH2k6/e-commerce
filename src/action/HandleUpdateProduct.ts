"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleUpdateProduct = async (id: number, data: any) => {
 
    const response = await fetch(`${API.Product}/update/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag('product')

    return await response.json();
};
