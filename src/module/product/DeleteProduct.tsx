"use client";
import { HandleDeleteProduct } from "@/action/HandleDeleteProduct";
import { Button, Modal, message } from "antd";
import { useState } from "react";

const DeleteProduct = ({id}: {id: number}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setLoading(true);
        setConfirmLoading(true);

        try {
            await HandleDeleteProduct(id);
            message.success("Xóa thành công");

            setOpen(false);
        } catch (error: any) {
            const messageError = error.response?.data.message;
            if (messageError) {
                message.error(messageError);
            }
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
            <Button danger  onClick={showModal} >Xóa sản phẩm</Button>
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
                        Xóa
                    </Button>,
                ]}
            >
                Bạn có muốn xóa blog voi tên ID <span className="text-red-500">{id}</span> ?
            </Modal>
        </>
    );
};

export default DeleteProduct;
