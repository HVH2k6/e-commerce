"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from "next/cache";

export const HandleCreatePermission = async (data: any) => {
    const response = await fetch(`${API.PERMISSION}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag("permission");

    if(response.ok) {
        return await response.json();
    }
};
