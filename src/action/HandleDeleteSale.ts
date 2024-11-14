"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleDeleteSale = async (id: any) => {
    const response = await fetch(`${API.SALE}/delete/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        
    });

    revalidateTag('product')

    return await response.json();
};
