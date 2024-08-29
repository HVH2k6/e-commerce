import AdminContent from "@/components/admin/admin-content";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
        <AdminContent>
            {children}
        </AdminContent>
    )
}
