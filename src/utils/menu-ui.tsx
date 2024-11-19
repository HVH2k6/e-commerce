import CommentIcon from "@/components/icon/CommentIcon";
import ListIcon from "@/components/icon/ListIcon";
import MapIcon from "@/components/icon/MapIcon";
import UserIcon from "@/components/icon/UserIcon";


export const SidebarProfileData = [
    {
        name:"Hồ sơ",
        path:"/profile",
        icon:(<UserIcon></UserIcon>),
    },
    {
        name:"Quản lý đơn hàng",
        path:"/profile/order",
        icon:(<ListIcon></ListIcon>),
    },
    {
        name:"Quản lý địa chỉ",
        path:"/profile/address",
        icon:(<MapIcon></MapIcon>),
    },
    {
        name:"Quản lý bình luận",
        path:"/profile/comment",
        icon:(<CommentIcon></CommentIcon>),
    },
]