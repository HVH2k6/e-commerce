"use client";
import { HandleDeleteProduct } from "@/action/HandleDeleteProduct";
import { HandleUpdateProduct } from "@/action/HandleUpdateProduct";
import UploadImage from "@/components/file/UploadImage";
import { API } from "@/utils/constant";
import { Button, Form, FormProps, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";

type FieldType = {
    name: string;
    price: string;
    description: string;
    image: string;
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
                    method: "GET",
                });

                const data = await response.json();
                form.setFieldsValue(data);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoading(true);
        setConfirmLoading(true);

        try {
            const response = await HandleUpdateProduct(id, values);

            message.success("Sửa sản phẩm thành công");
            setOpen(false);
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
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Sửa sản phẩm
            </Button>
            <Modal
                open={open}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
                width={950}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        Update
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
                    <Form.Item<FieldType> label="Hình ảnh" name="image">
                        <UploadImage
                            initialImageUrl={form.getFieldValue("image")}
                            onUploadSuccess={(url) => form.setFieldsValue({ image: url })}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateProduct;
