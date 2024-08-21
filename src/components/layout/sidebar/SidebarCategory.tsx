import Link from "next/link";
import "../style/layout.scss";
export default function SidebarCategory() {
    return (
        <div className="sidebar-category">
            {Array.from({ length: 10 }).map((_, index) => (
                <div className="sidebar-category-item" key={index}>
                    <Link className="sidebar-category-item-link" href={"/"}>
                        <div className="sidebar-category-item-icon">
                            <img
                                src="https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp"
                                alt="logo"
                            />
                        </div>
                        <span className="sidebar-category-item-text">Trang chủ</span>
                    </Link>
                </div>
            ))}
        </div>
    );
}
