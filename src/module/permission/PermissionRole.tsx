"use client";
import { useEffect, useState } from "react";
import { Button, message, Modal, Form, Collapse, Checkbox } from "antd";
import axios from "axios";
import { API } from "@/utils/constant";
import type { CollapseProps, FormProps } from "antd";

// import  "./style/style.scss"

interface EditRoleProps {
    id: string;
}

type Permission = {
    id: string;
    name: string;
    apiPath: string;
    modules: string;
    method: string;
};

type GroupedPermissions = {
    [module: string]: Permission[];
};

type FieldType = {
    name_role?: string;
    description?: string;
};

const PermissionRole: React.FC<EditRoleProps> = ({ id }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState<GroupedPermissions>({});
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get(`${API.PERMISSION}`);
                setPermissions(response.data);
            } catch (error) {
                console.error("Error fetching permissions:", error);
                message.error("Failed to load permissions");
            }
        };
        fetchPermissions();
    }, []);

    const fetchRoleData = async () => {
        try {
            const response = await axios.get(`${API.ROLE}/get-data-role-check/${id}`);
            const roleData = response.data;
            form.setFieldsValue(roleData);
            setSelectedPermissions(roleData.permission ? JSON.parse(roleData.permission) : []);
        } catch (error) {
            console.error("Error fetching role data:", error);
            message.error("Failed to load role data");
        }
    };
    

    const showModal = () => {
        fetchRoleData();
        setOpen(true);
    };

    const handleOk = async () => {
        form.submit();
    };

    const handleCheckboxChange = (permissionId: string, checked: boolean) => {
        setSelectedPermissions((prev) =>
            checked ? [...prev, permissionId] : prev.filter((id) => id !== permissionId),
        );
    };

    const handleCheckAllChange = (module: string, checked: boolean) => {
        const modulePermissions = permissions[module]?.map((perm) => perm.id) || [];
        setSelectedPermissions((prev) =>
            checked
                ? [...prev, ...modulePermissions.filter((id) => !prev.includes(id))]
                : prev.filter((id) => !modulePermissions.includes(id)),
        );
    };

    const isModuleChecked = (module: string) => {
        const modulePermissions = permissions[module]?.map((perm) => perm.id) || [];
        return modulePermissions.every((id) => selectedPermissions.includes(id));
    };

    const items: CollapseProps["items"] = Object.keys(permissions).map((module) => ({
        key: module,
        label: (
            <>
                {module}
                <Checkbox
                    checked={isModuleChecked(module)}
                    onChange={(e) => handleCheckAllChange(module, e.target.checked)}
                    style={{ marginLeft: 8 }}
                />
            </>
        ),
        children: (
            <ul>
                {permissions[module]?.map((item: Permission) => (
                    <li key={item.id}>
                        <Checkbox
                            checked={selectedPermissions.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                        >
                            {item.name} - {item.apiPath} - {item.method}
                        </Checkbox>
                    </li>
                ))}
            </ul>
        ),
    }));

    // const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    //     setLoading(true);
    //     setConfirmLoading(true);

    //     try {
    //         const data = {
    //             ...values,
    //             permission: selectedPermissions,
    //         };

    //         const response = await axios.post(`${API.ROLE}/update-permission/${Number(id)}`, data, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         console.log("Response:", response.data);
    //         message.success("Role updated successfully");
    //         setOpen(false);
    //         form.resetFields();
    //         setSelectedPermissions([]);
    //     } catch (error) {
    //         console.error("Error updating role:", error);
    //         message.error("Error occurred while updating role");
    //     } finally {
    //         setLoading(false);
    //         setConfirmLoading(false);
    //     }
    // };
    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        setLoading(true);
        setConfirmLoading(true);

        try {
            const data = {
                ...values,
                permission: selectedPermissions, // Gửi danh sách ID của permissions
            };

            const response = await axios.post(`${API.ROLE}/update-permission/${Number(id)}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response:", response.data);
            message.success("Role updated successfully");
            setOpen(false);
            form.resetFields();
            setSelectedPermissions([]);
        } catch (error) {
            console.error("Error updating role:", error);
            message.error("Error occurred while updating role");
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
        setSelectedPermissions([]);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit Permissions
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
                    name="editRole"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Collapse accordion items={items} />
                </Form>
            </Modal>
        </>
    );
};

export default PermissionRole;
