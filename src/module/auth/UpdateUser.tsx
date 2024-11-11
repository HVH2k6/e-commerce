'use client';

import { HandleUpdateUser } from '@/action/HandleUpdateUser';

import SelectedRole from '@/components/selected/SelectedRole';
import ToggleAuth from '@/components/toggle/ToggleAuth';
import { API } from '@/utils/constant';
import { Button, Form, FormProps, Modal, message } from 'antd';
import { useEffect, useState } from 'react';

type FieldType = {
  role_id: number;
  active:boolean
};

const UpdateUser = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const handleFetchDataUpdate = async () => {
      try {
        const response = await fetch(`${API.AUTH}/get-data-update/${id}`, {
          method: 'GET',
        });

        const data = await response.json();
        if(data.active==1){
          data.active=true
        }else{
          data.active=false
        }
        form.setFieldsValue(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    handleFetchDataUpdate();
  }, [id]);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    form.submit();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    setConfirmLoading(true);

    try {
      const response = await HandleUpdateUser(id, values);

      message.success('Sửa sản phẩm thành công');
      setOpen(false);
    } catch (error) {
      console.error('Error creating sản phẩm:', error);
      message.error('Đã xảy ra lỗi khi tạo sản phẩm');
    } finally {
      setLoading(false);
      setConfirmLoading(false);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type='primary' onClick={showModal}>
        Sửa sản người dùng
      </Button>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        onOk={handleOk}
        onCancel={handleCancel}
        width={950}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Nhóm quyền'
            name='role_id'
          
          >
            <SelectedRole onChange={(value) => form.setFieldsValue({ role_id: value })} selectedValue={form.getFieldValue('role_id')}/>
          </Form.Item>
          <Form.Item<FieldType>
            label='Trạng thái'
            name='active'
         
          >
            <ToggleAuth onChecked={(value) => form.setFieldsValue({ active: value })} selectedValue={form.getFieldValue('active')}/>
          </Form.Item>
          
         
        </Form>
      </Modal>
    </>
  );
};

export default UpdateUser;

