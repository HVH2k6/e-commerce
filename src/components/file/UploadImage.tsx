"use client";
import React, { useState, useEffect } from "react";
import { LoadingOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import type { UploadProps, UploadFile } from "antd";
import { API } from "@/utils/constant";
import axios from "axios";

interface UploadImageProps {
    onUploadSuccess: (url: string) => void;
    initialImageUrl?: string; // Optional prop for the initial image URL
}

const UploadImage: React.FC<UploadImageProps> = ({ onUploadSuccess, initialImageUrl }) => {
    const [urlImage, setUrlImage] = useState<string>(initialImageUrl || "");
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);

    useEffect(() => {
        if (initialImageUrl) {
            setImageUrl(initialImageUrl);
        }
    }, [initialImageUrl]);

    const handleChange: UploadProps["onChange"] = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
            return;
        }
        if (info.file.status === "done") {
            // Get this URL from the response
            const url = info.file.response.url;
            setLoading(false);
            setImageUrl(url);
            setUrlImage(url);
            onUploadSuccess(url); // Call the callback function with the URL
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleRemove = async () => {
        try {
            const response = await axios.delete(`${API.CLOUD}/cloudinary/delete`, {
                data: { url: urlImage },
            });
            if (response.status === 200) {
                setImageUrl(undefined);
                setUrlImage("");
                message.success("Image removed successfully.");
            } else {
                message.error("Failed to remove the image.");
            }
        } catch (error) {
            console.error("Error removing image:", error);
            message.error("An error occurred while removing the image.");
        }
    };

    const props: UploadProps = {
        name: "file",
        action: `${API.CLOUD}/cloudinary`,
        // beforeUpload,
        onChange: handleChange,
        showUploadList: false,
    };

    return (
        <div>
            {imageUrl ? (
                <div style={{ marginBottom: 16 }}>
                    <img src={imageUrl} alt="Uploaded" style={{ width: "100%", maxHeight: 200, objectFit: "cover" }} />
                    <Button onClick={handleRemove} danger>
                        Remove Image
                    </Button>
                </div>
            ) : (
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            )}
        </div>
    );
};

export default UploadImage;
