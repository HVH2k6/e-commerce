'use client';
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  message,
} from 'antd';
import dayjs from 'dayjs';
import SelectedProduct from '@/components/selected/SelectedProduct';
import axios from 'axios';
import { API } from '@/utils/constant';
import { HandleCreateSale } from '@/action/HandleCreateSale';

type FieldType = {
  title: string;
  time_start: Date;
  time_end: Date;
  list_product: [];
};
const CreateSaleProduct: React.FC = () => {
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
      await HandleCreateSale(values);

      message.success('Tạo sale thành công');
      setOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Đã xảy ra lỗi khi tạo sale');
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
  const defaultValue = dayjs('2024-01-01');

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Tạo danh sách sale
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
          form={form} // Link the form instance
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label='Tiêu đề sale'
            name='title'
            rules={[{ required: true, message: 'Please input your title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='Thời gian bắt đầu' name='time_start'>
            <DatePicker defaultValue={defaultValue} showTime />
          </Form.Item>
          <Form.Item<FieldType> label='Thời gian kết thúc' name='time_end'>
            <DatePicker defaultValue={defaultValue} showTime />
          </Form.Item>

          <Form.Item<FieldType>
            label='Danh sách sản phẩm'
            name='list_product'
            rules={[
              {
                required: true,
                message: 'Please select at least one product!',
              },
            ]}
          >
            <SelectedProduct
              onSelectProduct={(list_product) =>
                form.setFieldsValue({ list_product })
              }
              // selectedValue={form.getFieldValue("list_product")}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSaleProduct;
