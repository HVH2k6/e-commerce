"use client";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Space } from "antd";

export default function CartCount() {
    return (
        <Space size="middle">
            <Badge count={0} showZero>
            <ShoppingCartOutlined style={{ fontSize: "24px" }}/>
            </Badge>
        </Space>
    );
}
