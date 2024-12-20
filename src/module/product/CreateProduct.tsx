'use client';
import { useState } from 'react';
import { Button, message, Modal, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

import type { FormProps } from 'antd';
import { API } from '@/utils/constant';
import UploadImage from '@/components/file/UploadImage';
import { HandleCreateProduct } from '@/action/HandleCreateProduct';
import SelectedCategory from '@/components/selected/Selected';
import UploadMultipleImages from '@/components/file/UploadMultipleImage';
import TextEditor from '@/components/editor/TextEditor';
import GroupInput from '@/components/input/GroupInput';

type FieldType = {
  name: string;
  price: string;
  description: string;
  image: string;
  sale: string;
  trending?: boolean;
  category?: string;
  list_image?: string[];
  quantity: number;
  detail_selected?: { color: string; size: string; price: number }[];
};

const CreateProduct = () => {
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

    try {
      const response = await HandleCreateProduct(values);
      console.log(response);
      message.success('Tạo sản phẩm thành công');
      setOpen(false);
      form.resetFields();
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
  const deleteImageWhenClose = async (image: string) => {
    try {
      await axios.delete(`${API.CLOUD}/cloudinary/delete`, {
        data: { url: image },
      });
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Handle cancel event, resetting fields and deleting images from Cloudinary
  const handleCancel = () => {
    const image = form.getFieldValue('image');
    const list_image = form.getFieldValue('list_image');

    // Delete the main image if it exists
    if (image) {
      deleteImageWhenClose(image);
    }

    // Delete each image in the list_image array if it exists
    if (list_image && Array.isArray(list_image)) {
      list_image.forEach((imgUrl) => {
        deleteImageWhenClose(imgUrl);
      });
    }

    // Close the modal and reset the form fields
    setOpen(false);
    form.resetFields();
  };



  return (
    <>
      <Button type='primary' onClick={showModal}>
        Tạo sản phẩm
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
          name='createProduct'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tên sản phẩm'
            name='name'
            rules={[
              { required: true, message: 'Please input your name product!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label='Giá sản phẩm'
            name='price'
            rules={[
              { required: true, message: 'Please input your price product!' },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item<FieldType>
            label='Giảm giá sản phẩm'
            name='sale'
            rules={[
              {
                required: true,
                message: 'Please input your sale product!',
                min: 0,
                max: 100,
              },
            ]}
          >
            <Input min={0} max={100} />
          </Form.Item>
          <Form.Item<FieldType>
            label='Chọn nhóm sản phẩm'
            name='category'
            // rules={[{ required: true, message: "Please input your category product!" }]}
          >
            <SelectedCategory
              onChange={(value) => form.setFieldsValue({ category: value })}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label='Nội dung'
            name='description'
            rules={[
              {
                required: true,
                message: 'Please input your content!',
              },
            ]}
          >
            <TextEditor
              onChange={(value) => form.setFieldsValue({ description: value })}
              value=''
            />
          </Form.Item>
          <Form.Item<FieldType>
            label='Số lượng'
            name='quantity'
            rules={[
              {
                required: true,
                message: 'Please input your quantity!',
              },
            ]}
          >
          <InputNumber />
          </Form.Item>
          <Form.Item<FieldType>
            label="Chi tiết lựa chọn"
            name="detail_selected"
          >
            <GroupInput
              value={form.getFieldValue('detail_selected') || []}
              onChange={(value) => form.setFieldsValue({ detail_selected: value })}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label='Hình ảnh'
            name='image'
            rules={[
              { required: true, message: 'Please input your image product!' },
            ]}
          >
            <UploadImage
              onUploadSuccess={(url) => form.setFieldsValue({ image: url })}
            />
          </Form.Item>
          <Form.Item<FieldType> label='Danh sách hình ảnh' name='list_image'>
            <UploadMultipleImages
              onUploadSuccess={(urls) =>
                form.setFieldsValue({ list_image: urls })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateProduct;
