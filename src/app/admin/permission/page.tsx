import CreatePermission from "@/module/permission/CreatePermission";
import ListPermission from "@/module/permission/ListPermission";
import { API } from "@/utils/constant";

export default async function PermissionPage() {
    const response = await fetch(`${API.PERMISSION}`, {
        method: "GET",
        next: {
            tags: ["permission"],
        },
    })
const data = await response.json();
    return (
        <>
         <CreatePermission />
         <ListPermission permissions={data} />
        </>
    )
}
