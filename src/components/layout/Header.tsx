import Link from "next/link";
import React from "react";
import DropdownCategory from "../dropdown/DropdownCategory";
import { MenuHeader } from "@/utils/constant";
const Header = () => {
    return (
        <header className="container flex items-center justify-between pt-5 pb-10">
            <Link href="/">
                <span className="text-3xl font-extrabold">
                    <span className="text-blue-500">E</span>-commerce
                </span>
            </Link>
            <div className="flex item-center">
                <DropdownCategory></DropdownCategory>
                <ul className="flex items-center gap-x-5 ml-5">
                    {MenuHeader.map((item, index) => (
                        <li key={index}>
                            <Link href={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-x-6">
                <button>
                    <Link href={"/auth/login"}>Đăng nhập</Link>
                </button>
                <button className="px-3 py-2 bg-blue-500 rounded-lg ">
                    <Link href={"/auth/register"} className="text-white ">
                        Đăng ký
                    </Link>
                </button>
            </div>
        </header>
    );
};

export default Header;
