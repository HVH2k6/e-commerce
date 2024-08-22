"use client";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { API } from "@/utils/constant";
import axios from "axios";

interface UploadImageProps {
    onUploadSuccess: (url: string) => void;
}
const UploadImage: React.FC<UploadImageProps> = ({ onUploadSuccess }) => {
    const [urlImage, setUrlImage] = React.useState<string>("");
    const props: UploadProps = {
        name: "file",
        action: `${API.CLOUD}/cloudinary`,

        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                const url = info.file.response.url;
                setUrlImage(url);
                onUploadSuccess(url);  // Call the callback function with the URL
                message.success("upload success.");
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
        const handleRemove =async () => {
            const response = await axios.delete(`${API.CLOUD}/cloudinary/delete` ,{
                data: { url:  urlImage },
            });
            console.log(response);


        }
    return (
        <Upload {...props} onRemove={handleRemove}>
            <Button icon={<UploadOutlined />} >Click to Upload</Button>
        </Upload>
    );
};

export default UploadImage;
