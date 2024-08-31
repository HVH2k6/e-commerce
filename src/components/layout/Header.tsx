import Link from "next/link";
import React from "react";
import DropdownCategory from "../dropdown/DropdownCategory";
import { MenuHeader } from "@/utils/constant";
import CheckAuthHeader from "@/module/auth/CheckAuthHeader";
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
          <CheckAuthHeader/>
        </header>
    );
};

export default Header;
