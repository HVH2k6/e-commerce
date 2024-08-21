"use client";
import { useState } from "react";
import { Button, message, Modal, Form, Input } from "antd";
import axios from "axios";

import type { FormProps } from "antd";
import { API } from "@/utils/constant";
import UploadImage from "@/components/file/UploadImage";

type FieldType = {
    name: string;
    price: string;
    description: string;
    image: string;
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

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoading(true);
        setConfirmLoading(true);

        try {
            const response = await axios.post(`${API.Product}/create`, values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            message.success("Tạo sản phẩm thành công");
            setOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Error creating sản phẩm:", error);
            message.error("Đã xảy ra lỗi khi tạo sản phẩm");
        } finally {
            setLoading(false);
            setConfirmLoading(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tạo sản phẩm
            </Button>
            <Modal
                open={open}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={950}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Return
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Submit
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="createRole"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên sản phẩm"
                        name="name"
                        rules={[{ required: true, message: "Please input your name product!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Giá sản phẩm"
                        name="price"
                        rules={[{ required: true, message: "Please input your price product!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Mổ tả sản phẩm"
                        name="description"
                        rules={[{ required: true, message: "Please input your description product!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Hình ảnh"
                        name="image"
                        rules={[{ required: true, message: "Please input your image product!" }]}
                    >
                        <UploadImage onUploadSuccess={(url) => form.setFieldsValue({ image: url })} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateProduct;
