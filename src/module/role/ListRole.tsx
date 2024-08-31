"use client";

import IRole from "@/types/role";
import { Space, Table } from "antd";
import type { ColumnType } from "antd/es/table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EditRole from "./EditRole";
import PermissionRole from "../permission/PermissionRole";

interface IProps {
    data: IRole[] | [];
    // meta: {
    //   current: number;
    //   pageSize: number;
    //   total: number;
    // };
}
export default function ListRole(props: IProps) {
    const { data } = props;
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, refresh } = useRouter();

    const columns: ColumnType<IRole>[] = [
        {
            title: "Id",
            dataIndex: "id",
        },
        {
            title: "Tên quyền",
            dataIndex: "name_role",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Action",
            key: "action",

            render: (_, record) => (
                <Space size="middle">
                    <EditRole id={record.id} />
                    <PermissionRole id={record.id} />
                    <span>Xóa</span>
                </Space>
            ),
        },
    ];
    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        if (pagination && pagination.current) {
            const params = new URLSearchParams(searchParams);
            params.set("page", pagination.current);
            replace(`${pathname}?${params.toString()}`);
        }
    };
    const handleReload = () => {
        refresh();
    };
    return (
        <>
            <button onClick={handleReload} className="ml-5 bg-blue-400 p-2 rounded-lg">
                <span className="text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                    </svg>
                </span>
            </button>
            <Table
                rowKey={"id"}
                dataSource={data}
                columns={columns}
                onChange={onChange}
                // pagination={{
                //   ...meta,
                //   showTotal: (total, range) => {
                //     return (
                //       <div>
                //         {Math.ceil(range[0] / meta.pageSize)} trên{' '}
                //         {Math.ceil(total / meta.pageSize)} rows
                //       </div>
                //     );
                //   },
                // }}
            />
        </>
    );
}
