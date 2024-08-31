"use client";
import { useState } from "react";
import { Button, message, Modal, Form, Input, Space, Select } from "antd";
import axios from "axios";
import { API, listMethodPermission, listModulePermission } from "@/utils/constant";
import type { FormProps } from "antd";
import { HandleCreatePermission } from "@/action/HandleCreatePermission";

type FieldType = {
    name: string;
    apiPath?: string;
    module: string;
    method: string;
};

const CreatePermission = () => {
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
            await HandleCreatePermission(values);
            message.success("Tạo permisson thành công");
            setOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Error creating role:", error);
            message.error("Đã xảy ra lỗi khi tạo role");
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
                Tạo mới permisson
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
                        label="Permision name"
                        name="name"
                        rules={[{ required: true, message: "Please input your name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Url api"
                        name="apiPath"
                        rules={[{ required: true, message: "Please input the api!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <div className="flex justify-center">
                        <Space wrap>
                            <Form.Item name="module">
                                <Select
                                    placeholder="Chọn module"
                                    style={{ width: 200 }}
                                    options={listModulePermission.map((item) => ({
                                        value: item.name,
                                        label: item.name,
                                    }))}
                                />
                            </Form.Item>
                        </Space>
                    </div>
                    <div className="flex justify-center">
                        <Space wrap>
                            <Form.Item name="method">
                                <Select
                                    placeholder="Chọn method"
                                    style={{ width: 200 }}
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

export default CreatePermission;
