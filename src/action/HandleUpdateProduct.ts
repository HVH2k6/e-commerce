"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from 'next/cache'

export const HandleUpdateProduct = async (id: number, data: any) => {
    console.log("HandleUpdateProduct ~ data:", data);
    console.log("HandleUpdateProduct ~ id:", id);
 
    const response = await fetch(`${API.Product}/update/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Use JSON.stringify here
    });
    console.log(response);
    revalidateTag('product');

    return await response.json();
};
