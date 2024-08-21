import Header from "@/components/layout/header/Header";
import "./_style/style.scss";

export default function DefaultLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="">
            <Header></Header>
            <div className="container">
                <div className="main-content">{children}</div>
            </div>
        </div>
    );
}
