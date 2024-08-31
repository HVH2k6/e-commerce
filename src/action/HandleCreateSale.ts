"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from "next/cache";

export const HandleCreateSale = async (data: any) => {
    const response = await fetch(`${API.SALE}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag("sale");

    return await response.json();
};
