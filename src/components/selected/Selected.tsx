"use client";
import React from "react";
import { Select } from "antd";
interface Option {
    onSelect: (value: string) => void;
}
const SelectedGroup: React.FC = () => {
  const handleChange = (value: string) => {
    
  };
  return(
    <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        onChange={handleChange}
        options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
        ]}
    />
)
}

export default SelectedGroup;
