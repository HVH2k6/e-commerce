import CreateRole from "@/module/role/CreateRole";
import ListRole from "@/module/role/ListRole";
import { API } from "@/utils/constant";

export default async function RolePage() {
    const response = await fetch(`${API.ROLE}/getAll`, {
        method: "GET",
        next: {
            tags: ["role"],
        },
    });
    const data = await response.json();
    return (
        <>
        <CreateRole />
        <ListRole data={data}/>
        </>

    );
}
