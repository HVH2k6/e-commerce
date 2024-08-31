"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from "next/cache";

export const HandleUpdateSale = async (id: number, data: any) => {
    const response = await fetch(`${API.SALE}/update/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag("sale");

    return await response.json();
};
