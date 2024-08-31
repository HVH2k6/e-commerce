"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, DatePicker, Form, Input, message } from "antd";
import dayjs from "dayjs";
import SelectedProduct from "@/components/selected/SelectedProduct";
import axios from "axios";
import { API } from "@/utils/constant";
import { HandleCreateSale } from "@/action/HandleCreateSale";

type FieldType = {
    title: string;
    time_start: Date;
    time_end: Date;
    list_product: [];
};
const CreateSaleProduct: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        await HandleCreateSale(values);

        message.success("Tạo sale thành công");
        form.resetFields();
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const defaultValue = dayjs("2024-01-01");

    return (
        <Form
            form={form} // Link the form instance
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Tiêu đề sale"
                name="title"
                rules={[{ required: true, message: "Please input your title!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Thời gian bắt đầu" name="time_start">
                <DatePicker defaultValue={defaultValue} showTime />
            </Form.Item>
            <Form.Item<FieldType> label="Thời gian kết thúc" name="time_end">
                <DatePicker defaultValue={defaultValue} showTime />
            </Form.Item>

            <Form.Item<FieldType>
                label="Danh sách sản phẩm"
                name="list_product"
                rules={[{ required: true, message: "Please select at least one product!" }]}
            >
                <SelectedProduct
                    onSelectProduct={(list_product) => form.setFieldsValue({ list_product })}
                    // selectedValue={form.getFieldValue("list_product")}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateSaleProduct;
