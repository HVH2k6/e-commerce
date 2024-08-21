import React from "react";
import { AppstoreOutlined, FolderOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import LinkAdminSidebar from "./LinkAdminSidebar";

type MenuItem = Required<MenuProps>["items"][number];

const SidebarAdmin = () => {
  
    const items: MenuItem[] = [
        {
            key: "sub1",
            icon: <AppstoreOutlined />,
            label: <LinkAdminSidebar name="Trang tổng quan" url="/admin/dashboard"/>
        },
        {
            key: "sub2",
            icon: <FolderOutlined />,
            label: <LinkAdminSidebar name="Sản phẩm" url="/admin/product"/>,
        },
        {
            key: "sub4",
            label: "Navigation Three",
            icon: <SettingOutlined />,
            // children: [
            //   { key: '9', label: 'Option 9' },
            //   { key: '10', label: 'Option 10' },
            //   { key: '11', label: 'Option 11' },
            //   { key: '12', label: 'Option 12' },
            // ],
        },
    ];

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click", e);
    };
    return <Menu onClick={onClick} style={{ width: 256 }} mode="inline" items={items} />;
};

export default SidebarAdmin;
