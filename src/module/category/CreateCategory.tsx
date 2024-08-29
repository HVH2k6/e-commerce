'use client';
import { useState } from 'react';
import { Button, message, Modal, Form, Input } from 'antd';
import axios from 'axios';

import type { FormProps } from 'antd';
import { API } from '@/utils/constant';
import UploadImage from '@/components/file/UploadImage';

import SelectedCategory from '@/components/selected/Selected';
import { HandleCreateCategory } from '@/action/HandleCreateCategory';

type FieldType = {
  name_category: string;
  description?: string;
  parent_id: string;
  image?: string;
};

const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    form.submit();
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setLoading(true);
    setConfirmLoading(true);
    if (!values.parent_id) {
      values.parent_id = '';
    }
    if (!values.image) {
      values.image = '';
    }
    if (!values.description) {
      values.description = '';
    }
    try {
      const response = await HandleCreateCategory(values);
      console.log(response);
      message.success('Tạo danh mục thành công');
      setOpen(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating danh mục:', error);
      message.error('Đã xảy ra lỗi khi tạo danh mục');
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
    form.resetFields();
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Tạo danh mục
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tên danh mục'
            name='name_category'
            rules={[
              { required: true, message: 'Please input your name category!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='Mổ tả danh mục' name='description'>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Chọn danh mục cha'
            name='parent_id'
            initialValue='' // Giá trị mặc định là chuỗi rỗng
          >
            <SelectedCategory
              onChange={(value) => form.setFieldValue('parent_id', value)}
            />
          </Form.Item>

          <Form.Item<FieldType> label='Hình ảnh' name='image'>
            <UploadImage
              onUploadSuccess={(url) => form.setFieldsValue({ image: url })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCategory;
