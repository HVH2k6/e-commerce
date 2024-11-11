"use client";
import IProduct from "@/types/product";
import IUser from "@/types/user";
import { Button, Space, Table } from "antd";
import { ColumnType } from "antd/es/table";
import UpdateUser from "./UpdateUser";

interface IProps {
    data: IUser[] | [];
}
export default function TableUser(props: IProps) {
    const { data } = props;
    const columns: ColumnType<IUser>[] = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Hình ảnh",
            dataIndex: "avatar",
            render: (avatar) => <img src={avatar} alt="avatar" width={50} height={50} style={{ objectFit: "cover" }}/>,
        },
        {
            title: "Họ tên",
            dataIndex: "fullname",
        },
        {
            title: "email",
            dataIndex: "email",
        },
        {
            title:"Hành động",
            render: (_, record) => (
                <Space size='middle' key={record.id}>
                    <UpdateUser id={record.id}></UpdateUser>
                    {/* <UpdateProduct id={record.id}></UpdateProduct>
                    
                   <DeleteProduct id={record.id}></DeleteProduct> */}
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
