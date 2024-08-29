"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleFetchDataUpdateProduct = async (id: any) => {
    const response = await fetch(`${API.Product}/update/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    });

    revalidateTag('product')

    return await response.json();
};
