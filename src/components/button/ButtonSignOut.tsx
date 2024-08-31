import React, { useState } from 'react';
import {  Popconfirm } from 'antd';
import { useAuth } from '@/context/AuthContext';


const ButtonSignOut: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { signOut } = useAuth();

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    signOut();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Popconfirm
      title='Warning'
      description='Bạn muốn đăng xuất'
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <button onClick={showPopconfirm}>
        Đăng xuất
      </button>
    </Popconfirm>
  );
};

export default ButtonSignOut;
