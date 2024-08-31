export const MenuHeader = [
    {
        name: "Trang chủ",
        path: "/",
    },
    {
        name: "Sản phẩm",
        path: "/product",
    },
    {
        name: "Thương hiệu",
        path: "/brand",
    },
    {
        name: "Giới thiệu",
        path: "/about",
    },
];
const LOCAL_API = "http://localhost:5000/api";

export const API = {
    Product: LOCAL_API + "/product",
    CLOUD: LOCAL_API + "/cloud",
    CATEGORY: LOCAL_API + "/category",
    AUTH: LOCAL_API + "/auth",
    ROLE: LOCAL_API + "/role",
    PERMISSION: LOCAL_API + "/permission",
    SALE: LOCAL_API + "/sale",
};
export const listModulePermission = [
    {
        name: "Product",
    },
    {
        name: "CLOUD",
    },
    {
        name: "CATEGORY",
    },
    {
        name: "AUTH",
    },
    {
        name: "ROLE",
    },
    {
        name: "PERMISSION",
    },
    {
        name: "SALE",
    },
];
export const listMethodPermission = [
    {
        name_method: "POST",
    },
    {
        name_method: "GET",
    },
    {
        name_method: "DELETE",
    },
    {
        name_method: "PATCH",
    },
];
