import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Link href={"/"}>Home</Link>
            <div className="flex items-center justify-center h-screen ">{children}</div>
        </div>
    );
}
