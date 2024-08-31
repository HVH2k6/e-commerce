import { API } from "@/utils/constant";
import ProductCard from "./ProductCard";
import TimeCountDown from "../time/TimeCountDown";

const FlashSaleProductList = async () => {
    const response = await fetch(`${API.SALE}`, {
        method: "GET",
    });
    const data = await response.json();

    const timeNow = new Date();
    if (timeNow < new Date(data.timeStart) || timeNow > new Date(data.timeEnd)) {
        return null;
    } else {
        return (
            <div>
                <div className="flex items-center mb-8">
                    <h2 className="text-3xl font-bold">Sản phẩm sale sốc</h2>
                    <TimeCountDown time_start={data.timeStart} time_end={data.timeEnd}></TimeCountDown>
                    <button className="ml-auto text-blue-500 font-medium">Xem thêm</button>
                </div>
                <div className="grid grid-cols-4 gap-x-5">
                    {data?.listProductSale &&
                        data?.listProductSale.map((product: any, index: number) => (
                            <ProductCard key={index} data={product}></ProductCard>
                        ))}
                </div>
            </div>
        );
    }
};

export default FlashSaleProductList;
