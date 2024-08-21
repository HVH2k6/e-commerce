"use client";
import { Table } from "antd";

export default function TableProduct() {
    const dataSource = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
    ];

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            key: "age",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
    ];
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <div className="">
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </div>
    )
}
