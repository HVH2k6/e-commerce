"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface IProps {
    path: string;
    icon: string;
    name: string;
}
export default function HeaderItem({ path, icon, name }: IProps) {
    const pathName = usePathname();

  const isActive = path === pathName;
    return (
        <Link href={path} className={`header-action-link ${isActive ? "active" : ""}`}>
            <img src={icon} alt="" />
            <span>{name}</span>
        </Link>
    );
}
