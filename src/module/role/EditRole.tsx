import React, { useEffect, useState } from 'react';
import { Button, message, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { API } from '@/utils/constant';

interface EditRoleProps {
  id: string;
}

type FieldType = {
  name_role?: string;
  description?: string;
};

const EditRole: React.FC<EditRoleProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const fetchRoleData = async () => {
        try {
          const response = await axios.get(`${API.ROLE}/get-data-update/${Number(id)}`);
          form.setFieldsValue(response.data);
          setOpen(false);
        } catch (error) {
          console.error('Error fetching role data:', error);
          message.error('Failed to load role data');
        }
      };
      fetchRoleData();
    }
  }, [id, form]);

  const handleOk = async () => {
    form.submit();
  };

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    setConfirmLoading(true);

    try {
      await axios.post(`${API.ROLE}/update/${id}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      message.success('Sửa role thành công');
      setOpen(false);
      // form.resetFields();
    } catch (error) {
      console.error('Error updating role:', error);
      message.error('Đã xảy ra lỗi khi sửa role');
    } finally {
      setLoading(false);
      setConfirmLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
          name='editRole'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Role'
            name='name_role'
            rules={[{ required: true, message: 'Please input your role!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label='Mô tả'
            name='description'
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditRole;
