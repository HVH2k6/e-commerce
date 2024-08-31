
"use client";
import { useState } from "react";
import { Button, message, Modal, Form, Input } from "antd";

import type { FormProps } from "antd";
import { HandleCreateRole } from "@/action/HandleCreateRole";

type FieldType = {
    name_role: string;
    description: string;
};

const CreateRole = () => {
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
            await HandleCreateRole(values);

            message.success("Tạo quyền mới  thành công");
            setOpen(false);
            form.resetFields();
        } catch (error) {
            console.error("Error", error);
            message.error("Đã xảy ra lỗi khi tạo quyền");
        } finally {
            setLoading(false);
            setConfirmLoading(false);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {};

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Tạo quyền
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
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên quyền"
                        name="name_role"
                        rules={[{ required: true, message: "Please input your name role!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mổ tả "
                        name="description"
                        rules={[{ required: true, message: "Please input your description !" }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateRole;
