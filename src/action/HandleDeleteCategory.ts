"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleDeleteCategory = async (id: any) => {
    const response = await fetch(`${API.CATEGORY}/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        
    });

    revalidateTag('category')

    return await response.json();
};
