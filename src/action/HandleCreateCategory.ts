"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleCreateCategory = async (data: any) => {
    console.log("HandleCreateCategory ~ data:", data)
    const response = await fetch(`${API.CATEGORY}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag('category')

    return await response.json();
};
