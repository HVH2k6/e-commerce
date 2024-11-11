'use client';
import IRole from '@/types/role';
import { API } from '@/utils/constant';
import { Select } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
interface SelectedRoleProps {
  onChange: (value: string | null) => void;
  selectedValue?: string | null | undefined; // Added prop for pre-selected value
}

const SelectedRole: React.FC<SelectedRoleProps> = ({
  onChange,
  selectedValue,
}) => {
  const [listRole, setListRole] = useState([]);
  async function getRole() {
    const response = await axios.get(`${API.ROLE}/getAll`);
    const data = response.data;
    setListRole(data);
  }
  getRole();
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <div>
      <Select
        style={{ width: 120 }}
        defaultValue={selectedValue}
        onChange={handleChange}
        options={listRole.map((role: IRole) => ({
          label: role.name_role,
          value: role.id,
        }))}
      />
    </div>
  );
};

export default SelectedRole;
