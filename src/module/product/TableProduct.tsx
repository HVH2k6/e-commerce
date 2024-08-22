"use client";
import IProduct from "@/types/product";
import { Button, Space, Table } from "antd";
import { ColumnType } from "antd/es/table";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
interface IProps {
    data: IProduct[] | [];
}
export default function TableProduct(props: IProps) {
    const { data } = props;
    const columns: ColumnType<IProduct>[] = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            render: (image) => <img src={image} alt="image" width={50} height={50} style={{ objectFit: "cover" }}/>,
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
        },
        {
            title:"Hành động",
            render: (_, record) => (
                <Space size='middle' key={record.id}>
                    <UpdateProduct id={record.id}></UpdateProduct>
                   <DeleteProduct id={record.id}></DeleteProduct>
                </Space>
              ),
        }
    ];
    return (
        <div>
            <h1>Danh sách sản phẩm</h1>
            <div className="">
                <Table rowKey={'id'} dataSource={data} columns={columns} />
            </div>
        </div>
    );
}
