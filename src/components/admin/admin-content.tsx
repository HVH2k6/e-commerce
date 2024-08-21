"use client";
import React, { useState } from "react";

import { Button, Layout, Menu, theme } from "antd";
import SidebarAdmin from "./sidebar-admin";
import "./style/admin-layout.scss";
const { Header, Sider, Content } = Layout;

const AdminContent = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div className="admin-content">
            <div className="admin-flex-left">
                <Layout>
                    <SidebarAdmin></SidebarAdmin>
                </Layout>
            </div>

            <div className="admin-flex-right">
                <Layout>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </div>
        </div>
    );
};

export default AdminContent;
