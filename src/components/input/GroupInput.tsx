import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';

interface DetailItem {
  color: string;
  size: string;
  price: number;
}

interface GroupInputProps {
  value?: DetailItem[];
  onChange?: (value: DetailItem[]) => void;
}

const GroupInput: React.FC<GroupInputProps> = ({ value = [], onChange }) => {
  const [detailSelected, setDetailSelected] = useState<DetailItem[]>(value);

  // Thêm một dòng mới vào detailSelected
  const handleAddRow = () => {
    const updatedDetails = [...detailSelected, { color: '', size: '', price: 0 }];
    setDetailSelected(updatedDetails);
    onChange?.(updatedDetails); // Gọi onChange để cập nhật parent
  };

  // Cập nhật giá trị của từng ô input
  const handleInputChange = (index: number, field: keyof DetailItem, inputValue: string) => {
    const updatedDetails = detailSelected.map((item, idx) =>
      idx === index ? { ...item, [field]: inputValue } : item
    );
    setDetailSelected(updatedDetails);
    onChange?.(updatedDetails); // Gọi onChange để cập nhật parent
  };

  // Xóa một dòng khỏi detailSelected
  const handleRemoveRow = (index: number) => {
    const updatedDetails = detailSelected.filter((_, idx) => idx !== index);
    setDetailSelected(updatedDetails);
    onChange?.(updatedDetails); // Gọi onChange để cập nhật parent
  };

  return (
    <div>
      {detailSelected.map((item, index) => (
        <Space key={index} className="mb-4" align="baseline">
          <Input
            placeholder="Color"
            value={item.color}
            onChange={(e) => handleInputChange(index, 'color', e.target.value)}
            style={{ width: 150 }}
          />
          <Input
            placeholder="Size"
            value={item.size}
            onChange={(e) => handleInputChange(index, 'size', e.target.value)}
            style={{ width: 150 }}
          />
          <Input
            placeholder="Price"
            type="number"
            value={item.price}
            onChange={(e) => handleInputChange(index, 'price', e.target.value)}
            style={{ width: 150 }}
          />
          <Button danger onClick={() => handleRemoveRow(index)} type="primary">
            X
          </Button>
        </Space>
      ))}
      <Button type="dashed" onClick={handleAddRow} style={{ marginBottom: '16px' }}>
        + Add Row
      </Button>
    </div>
  );
};

export default GroupInput;
