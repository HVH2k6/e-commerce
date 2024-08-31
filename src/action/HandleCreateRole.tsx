"use server";

import { API } from "@/utils/constant";
import { revalidateTag } from "next/cache";

export const HandleCreateRole = async (data: any) => {
    console.log("HandleCreateRole ~ data:", data);
    const response = await fetch(`${API.ROLE}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    revalidateTag("role");

    return await response.json();
};
