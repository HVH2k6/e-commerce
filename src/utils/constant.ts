import Product from "@/app/admin/product/page"

export const MenuHeader = [
    {
        name: "Trang chủ", 
        path: "/",

        
    },
    {
        name:"Sản phẩm",
        path: "/product",
        
    },
    {
        name:"Thương hiệu",
        path: "/brand",
    },
    {
        name:"Giới thiệu",
        path: "/about",
    }

 
   
] 
const LOCAL_API = "http://localhost:5000/api";

export const API = {
    Product: LOCAL_API + "/product",
    CLOUD: LOCAL_API + "/cloud",

    CATEGORY: LOCAL_API + "/category"

 
}