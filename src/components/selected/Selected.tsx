"use client";
import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';
import axios from 'axios';
import { API } from '@/utils/constant';

type TreeNode = {
  title: string;
  value: string;
  children?: TreeNode[];
};

interface SelectedCategoryProps {
  onChange: (value: string | null) => void;
  selectedValue?: string | null | undefined; // Added prop for pre-selected value
}

const SelectedCategory: React.FC<SelectedCategoryProps> = ({ onChange, selectedValue }) => {
  const [value, setValue] = useState<string | null| undefined>(selectedValue);
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API.CATEGORY}/getAll`);
        const categories = response.data;

        // Format data
        const formattedData = formatTreeData(categories);
        setTreeData(formattedData);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Update value when selectedValue changes
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  // Function to format category data into tree structure
  const formatTreeData = (categories: any[]): TreeNode[] => {
    const transformNode = (category: any): TreeNode => ({
      title: category.name_category,
      value: category.id,
      children: category.children ? category.children.map(transformNode) : [],
    });

    return categories.map(transformNode);
  };

  const handleChange = (newValue: string | null) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder='Chọn danh mục cha (nếu có)'
      allowClear
      treeDefaultExpandAll
      onChange={handleChange}
      treeData={treeData}
    />
  );
};

export default SelectedCategory;
