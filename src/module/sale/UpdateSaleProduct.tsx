'use client';
import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, Modal, message } from 'antd';
import dayjs from 'dayjs';
import SelectedProduct from '@/components/selected/SelectedProduct';
import axios from 'axios';
import { API } from '@/utils/constant';
import { HandleCreateSale } from '@/action/HandleCreateSale';
import { HandleUpdateSale } from '@/action/HandleUpdateSale';
import { useRouter } from 'next/navigation';

type FieldType = {
  title: string;
  time_start: Date;
  time_end: Date;
  list_product: string[]; // Adjust type to string array
};

const UpdateSaleProduct = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${API.SALE}/get-data-update/${id}`);
      const data = {
        ...response.data,
        time_start: dayjs(response.data.time_start),
        time_end: dayjs(response.data.time_end),
      };

      form.setFieldsValue(data); // Populate the form with fetched data
      if (!response.data) return;
    }
    fetchData();
  }, [id, form]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    form.submit();
  };

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    setConfirmLoading(true);
    try {
      await HandleUpdateSale(id, values);

      message.success('Sale updated successfully');
      setOpen(false);
      router.refresh();
    } catch (error) {
      message.error('Error occurred while updating sale');
    } finally {
      setLoading(false);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
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
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
            <DatePicker showTime />
          </Form.Item>
          <Form.Item<FieldType> label='Thời gian kết thúc' name='time_end'>
            <DatePicker showTime />
          </Form.Item>

          <Form.Item<FieldType>
            label='Danh sách sản phẩm'
            name='list_product'
            rules={[
              {
                type: 'array',
                required: true,
                min: 1,
                message: 'Please select at least one product',
              },
            ]}
          >
            <SelectedProduct
              onSelectProduct={
                (list_product) => form.setFieldsValue({ list_product }) // Update form value
              }
              selectedValue={form.getFieldValue('listProductSale')}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateSaleProduct;
