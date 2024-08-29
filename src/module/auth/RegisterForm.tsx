"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { API } from "@/utils/constant";
import Link from "next/link";

type FieldType = {
    fullname?: string;
    email?: string;
    password?: string;
};

const RegisterForm: React.FC = () => {
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const response = await axios.post(`${API.AUTH}/register`, values);
            message.success("Đăng ký thanh cong");
        } catch (error:any) {
            const messageError = error.response?.data.message;
            message.error(messageError);
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div className="">
            <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Họ tên"
                name="fullname"
                rules={[{ required: true, message: "Please input your fullname!" }]}
            >
                <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        type: "email",
                        message: "The input is not valid E-mail!",
                    },
                ]}
            >
                <Input style={{ width: 400 }} />
            </Form.Item>
            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password style={{ width: 400 }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        <div className="flex mt-8 items-center">
            <span>Bạn đã có tài khoản? <Link  href="/auth/login">Đăng nhập</Link></span>
        </div>
        </div>
    );
};

export default RegisterForm;
