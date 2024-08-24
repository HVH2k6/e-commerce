import Banner from "@/components/banner/Banner";
import Card from "@/components/product/Card";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Banner></Banner>
            <div className="list-product-layout">
                <div className="list-product-layout-top">
                    <h3 className="title-list-product" id="top-deal">
                        Top deal giá rẻ
                    </h3>
                    <Link href={"/"} className="see-more">
                        Xem tất cả
                    </Link>
                </div>
                <div className="list-product">
                    <Card></Card>
                    
                </div>
            </div>
        </div>
    );
}
