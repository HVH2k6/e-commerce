"use client";
import React, { useEffect, useState } from "react";
import { Radio, Select, Space } from "antd";
import type { ConfigProviderProps, RadioChangeEvent, SelectProps } from "antd";
import { API } from "@/utils/constant";
import { DefaultOptionType } from "antd/es/select";
import axios from "axios";
import IProduct from "@/types/product";

type SizeType = ConfigProviderProps["componentSize"];
interface SelectedProps {
  onSelectProduct: (value: string | string[] | null) => void;
  selectedValue?: string | string[] | null | undefined;
}

const SelectedProduct: React.FC<SelectedProps> = ({ onSelectProduct, selectedValue }) => {
    const handleChange = (value: string | string[]) => {
        onSelectProduct(value);
    };

    const [options, setOptions] = useState<DefaultOptionType[]>([]);

    useEffect(() => {
        async function getProducts() {
            const response = await axios.get(`${API.Product}/getAll`);
            const data = await response.data;

            setOptions(data.map((product: IProduct) => ({ label: product.name, value: product.id })));
        }

        getProducts();
    }, []);

    return (
        <Select
            mode="tags"
            placeholder="Please select"
            onChange={handleChange}
            style={{ width: "100%" }}
            options={options}
            value={selectedValue} // Ensure that the Select component shows the correct pre-selected value
        />
    );
};

export default SelectedProduct;
