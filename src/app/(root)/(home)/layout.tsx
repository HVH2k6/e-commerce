import SidebarCategory from "@/components/layout/sidebar/SidebarCategory";
import "../_style/style.scss";

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="main-content-layout">
        <SidebarCategory></SidebarCategory>
        <div className="main-content-home">
            {children}
        </div>
    </div>;
}
