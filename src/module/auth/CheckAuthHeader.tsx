"use client";

import { useAuth } from "@/context/AuthContext";
import { Button, Dropdown, MenuProps, Space, Spin } from "antd";
import Link from "next/link";
import ButtonSignOut from "@/components/button/ButtonSignOut";

export default function CheckAuthHeader() {
    const { userInfo, loading } = useAuth();

    const covertTextToLowerCase = (text: string) => text.toLowerCase();
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <div>
                    <Link href="/profile">Hồ sơ</Link>
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <div>
                    {userInfo !== null && covertTextToLowerCase(userInfo.role) === "admin" && (
                        <Link href="/admin/dashboard">Quản lý</Link>
                    )}
                </div>
            ),
        },
        {
            key: "3",
            label: (
                <div>
                    <ButtonSignOut />
                </div>
            ),
        },
    ];

    if (loading) {
        return <Spin size="small" />;
    }

    return (
        <>
            {!userInfo || Object.keys(userInfo).length === 0 ? (
                <>
                    <div className="flex items-center gap-x-5">
                        <button>
                            <Link href={"/auth/login"}>Đăng nhập</Link>
                        </button>
                        <button className="px-3 py-2 bg-blue-500 rounded-lg ">
                            <Link href={"/auth/register"} className="text-white ">
                                Đăng ký
                            </Link>
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center gap-x-4 relative flex-col">
                    <Space direction="vertical">
                        <Space wrap>
                            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                                <img src={userInfo.avatar} alt="" className="avatar" />
                            </Dropdown>
                        </Space>
                    </Space>
                </div>
            )}
        </>
    );
}
