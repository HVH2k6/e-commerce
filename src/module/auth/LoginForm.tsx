"use client";
import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import { API } from "@/utils/constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

type FieldType = {
    email?: string;
    password?: string;
};

const LoginForm: React.FC = () => {
    const router = useRouter();
    const { userInfo, setUserInfo } = useAuth();

    if (userInfo) {
        router.push("/");
        return null;
    }

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const response = await axios.post(`${API.AUTH}/login`, values);
            if (response.status === 200) {
                message.success("Đăng nhập thành công");
                const token = response.data.token;
                console.log("onFinish ~ token:", token);

                localStorage.setItem("access_token", token);
                Cookies.set("access_token", token, { expires: 10 });

                const userResponse = await axios.get(`${API.AUTH}/get-user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userResponse.data) {
                    setUserInfo(userResponse.data);
                }

                router.push("/");
            }
        } catch (error: any) {
            const messageError = error.response?.data.message;
            if (messageError) {
                message.error(messageError);
            }
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
                <span>
                    Bạn chưa có tài khoản? <Link href="/auth/register">Đăng ký</Link>
                </span>
            </div>
        </div>
    );
};

export default LoginForm;
