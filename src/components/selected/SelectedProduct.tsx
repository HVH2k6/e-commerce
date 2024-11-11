'use client';
import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import { API } from '@/utils/constant';
import type { DefaultOptionType } from 'antd/es/select';
import IProduct from '@/types/product';

interface IProductSelect {
  id: number;
  name: string;
}

interface SelectedProps {
  onSelectProduct: (value: number[]) => void; // Sử dụng number[] cho ID
  selectedValue?: IProductSelect[] | undefined;
}

const SelectedProduct: React.FC<SelectedProps> = ({
  onSelectProduct,
  selectedValue,
}) => {
  const [options, setOptions] = useState<DefaultOptionType[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // Để theo dõi các ID đã chọn

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`${API.Product}/getAll`);
        const data = response.data;

        setOptions(
          data.map((product: IProduct) => ({
            label: product.name,
            value: product.id,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }

    getProducts();
  }, []);

  useEffect(() => {
    if (selectedValue) {
      setSelectedIds(selectedValue.map((item) => item.id));
    }
  }, [selectedValue]);

  const handleChange = (value: number[]) => {
    setSelectedIds(value);
    onSelectProduct(value); // Cập nhật danh sách giá trị đã chọn lên parent
  };

  return (
    <Select
      mode='multiple'
      placeholder='Please select products'
      onChange={handleChange}
      style={{ width: '100%' }}
      options={options}
      value={selectedIds}
      tagRender={({ label, value, closable, onClose }) => {
        // Cung cấp custom rendering cho các tag
        const name =
          options.find((option) => option.value === value)?.label || '';
        return (
          <span
            style={{
              display: 'inline-block',
              padding: '2px 4px',
              marginRight: '4px',
              border: '1px solid #d9d9d9',
              borderRadius: '2px',
              backgroundColor: '#f0f0f0',
            }}
          >
            {name}
            {closable && (
              <a
                onClick={onClose}
                style={{ marginLeft: '4px', color: 'red', fontSize: '12px' }}
              >
                X
              </a>
            )}{' '}
            {/* Xóa mục */}
          </span>
        );
      }}
    />
  );
};

export default SelectedProduct;
