import React from 'react';
import { Switch } from 'antd';

interface ToggleAuthProps {
  onChecked: (value: boolean | null) => void;
  selectedValue?: boolean
}
const ToggleAuth: React.FC<ToggleAuthProps> = ({
  onChecked,
  selectedValue,
}) => {
  const onChange = (checked: boolean) => {
    onChecked(checked ? true : false);
  };

  return <Switch defaultChecked={selectedValue} onChange={onChange} />;
};

export default ToggleAuth;
