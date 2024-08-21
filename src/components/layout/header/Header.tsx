import Link from "next/link";
import "../style/layout.scss";
import { MenuHeader } from "@/utils/constant";
import logo from "../../../../public/tikilogo.png";
import Image from "next/image";
import HeaderItem from "@/share/HeaderItem";
import CartCount from "@/share/CartCount";
export default function Header() {
    return (
        <header className="header">
            <div className="container header-container">
                <div className="header-logo">
                    <Link href={"/"}>
                        <Image src={logo} alt="logo" width={96} height={40} />
                        <span className="header-logo-text">Tốt & Nhanh</span>
                    </Link>
                </div>
                <div className="header-main">
                    <div className="header-main-top">
                        <div className="header-search">
                            <input type="text" className="header-search-input" />
                            <button className="header-search-button">Tìm kiếm</button>
                        </div>
                        <div className="header-action">
                            {MenuHeader.map((item, index) => (
                                <HeaderItem icon={item.icon} name={item.name} path={item.path} key={index} />
                            ))}
                            <CartCount></CartCount>
                        </div>
                    </div>
                    <div className="header-main-bottom">
                        <div className="header-bottom-item">Điện tử</div>
                        <div className="header-bottom-item">Gia dụng</div>
                        <div className="header-bottom-item">Thể thao</div>
                        <div className="header-bottom-item">Sách</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
