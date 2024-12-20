'use client';

import { HandleUpdateProduct } from '@/action/HandleUpdateProduct';
import TextEditor from '@/components/editor/TextEditor';
import UploadImage from '@/components/file/UploadImage';
import UploadMultipleImages from '@/components/file/UploadMultipleImage';
import GroupInput from '@/components/input/GroupInput';

import SelectedCategory from '@/components/selected/Selected';
import { API } from '@/utils/constant';
import { Button, Form, FormProps, Input, InputNumber, Modal, message } from 'antd';
import { useEffect, useState } from 'react';

type FieldType = {
  name: string;
  price: string;
  description: string;
  category?: string;
  image: string;
  list_image?:string;
  quantity: number;
  detail_selected?: { color: string; size: string; price: number }[];
};

const UpdateProduct = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    const handleFetchDataUpdate = async () => {
      try {
        const response = await fetch(`${API.Product}/update/${id}`, {
          method: 'GET',
        });

        const data = await response.json();
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
      const response = await HandleUpdateProduct(id, values);

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
        Sửa sản phẩm
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
            label='Số lượng'
            name='quantity'
            rules={[
              {
                required: true,
                message: 'Please input your price product!',
              },
            ]}
          >
          <InputNumber />
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
            label='Chọn nhóm sản phẩm'
            name='category'
            rules={[
              {
                required: true,
                message: 'Please input your category product!',
              },
            ]}
          >
            <SelectedCategory
              onChange={(value) => form.setFieldsValue({ category: value })}
              selectedValue={form.getFieldValue('category')}
            />
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
          <Form.Item<FieldType> label='Hình ảnh' name='image'>
            <UploadImage
              initialImageUrl={form.getFieldValue('image')}
              onUploadSuccess={(url) => form.setFieldsValue({ image: url })}
            />
          </Form.Item>
          <Form.Item<FieldType> label='Danh sách hình ảnh' name='list_image'>
            <UploadMultipleImages
              onUploadSuccess={(urls) =>
                form.setFieldsValue({ list_image: urls })
              }
              initialImageUrls={form.getFieldValue('list_image')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProduct;
