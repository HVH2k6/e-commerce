import Product from "@/app/admin/product/page"

export const MenuHeader = [
    {
        name: "Trang chủ", 
        path: "/",
        icon:"https://salt.tikicdn.com/ts/upload/32/56/db/d919a4fea46f498b5f4708986d82009d.png"
    },
    {
        name:"Đăng nhập",
        path: "/auth/login",
        icon:"https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
    },
   
] 
const LOCAL_API = "http://localhost:5000/api";

export const API = {
    Product: LOCAL_API + "/product",
    CLOUD: LOCAL_API + "/cloud",
}