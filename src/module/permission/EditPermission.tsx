import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Form, Space, Select, Input } from 'antd';
import axios from 'axios';
import { API, listModulePermission } from '@/utils/constant';

interface EditPermissionProps {
  id: string;
}

type FieldType = {
  name?: string;
  apiPath?: string;
};
const EditPermission: React.FC<EditPermissionProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
 
  const listMethodPermission = [
    {
      name_method: 'POST',
    },
    {
      name_method: 'GET',
    },
    {
      name_method: 'DELETE',
    },
  ];

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${API.PERMISSION}/get-permission-update/${id}`
          );
          form.setFieldsValue(response.data);
        } catch (error) {
          console.error('Error fetching role data:', error);
          message.error('Failed to load role data');
        }
      };
      fetchUserData();
    }
  }, [id, form]);

  const handleOk = async () => {
    form.submit();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    setConfirmLoading(true);

    try {
      await axios.post(`${API.PERMISSION}/update/${id}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      message.success('Sửa thành công');
      setOpen(false);
    } catch (error) {
      console.error('Error updating role:', error);
      message.error('Đã xảy ra lỗi khi sửa role');
    } finally {
      setLoading(false);
      setConfirmLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={() => setOpen(true)}>
        Sửa
      </Button>
      <Modal
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={950}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          name='editPermission'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tên quyền'
            name='name'
            rules={[
              { required: true, message: 'Please input your name permission!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label='Api Path'
            name='apiPath'
            rules={[{ required: true, message: 'Please input the api path!' }]}
          >
            <Input />
          </Form.Item>
          <div className='flex justify-center'>
            <Space wrap>
              <Form.Item name='modules'>
                <Select
                  style={{ width: 120 }}
                  options={listModulePermission.map((item) => ({
                    value: item.name,
                    label: item.name,
                  }))}
                />
              </Form.Item>
            </Space>
          </div>
          <div className='flex justify-center'>
            <Space wrap>
              <Form.Item name='method'>
                <Select
                  style={{ width: 120 }}
                  options={listMethodPermission.map((item) => ({
                    value: item.name_method,
                    label: item.name_method,
                  }))}
                />
              </Form.Item>
            </Space>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default EditPermission;
