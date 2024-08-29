"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkAdminSidebar({url, name}: {url: string, name: string}) {
    const pathname = usePathname()
    const isActive = pathname === url
    return (
        <Link href={url} className={`link-admin-sidebar ${isActive ? 'active' : ''}`}>
            {name}
        </Link>
    )
}