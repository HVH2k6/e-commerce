import Banner from "@/components/banner/Banner";

import FlashSaleProductList from "@/components/product/FlashSaleProductList";
import NewProductList from "@/components/product/NewProductList";

export default function HomePage() {
    return (
        <div>
            <Banner></Banner>
            <div className="pt-12">
                <NewProductList></NewProductList>
                <div className="pt-10">
                    <FlashSaleProductList></FlashSaleProductList>
                </div>
            </div>
        </div>
    );
}
