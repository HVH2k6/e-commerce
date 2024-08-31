import React from "react";
import StarIcon from "../icon/StarIcon";
import { Button } from "antd";
import IProduct from "@/types/product";
interface IProps {
    data: IProduct;
}
const ProductCard = (props: IProps) => {
    const { data } = props;

    return (
        <div className="w-full rounded-md border border-slate-300">
            <img src={data.image} alt="" className="w-full h-60 object-cover object-center rounded-md" />

            <div className="p-2">
                <h3 className="text-xl font-semibold mb-5">{data.name}</h3>
                <div className="flex items-center justify-between">
                    <span className="bg-blue-300/40 text-blue-500 px-2 py-1.5 rounded-md">Apple</span>
                    <span className="bg-green-300/40 text-green-500 px-2 py-1.5 rounded-md">Đồng hồ</span>
                </div>

                <div className="flex items-center justify-between my-5">
                    <div className="flex items-center">
                        <StarIcon></StarIcon>
                        <StarIcon></StarIcon>
                        <StarIcon></StarIcon>
                        <StarIcon></StarIcon>
                    </div>
                    <span className="font-medium">{data.price}$</span>
                </div>
                <Button type="primary" className="w-full">
                    Mua ngay
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;
