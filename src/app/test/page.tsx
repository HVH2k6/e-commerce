"use client";
import UploadImage from "@/components/file/UploadImage";

export default function Test() {
    return (
        <div>
            <UploadImage onUploadSuccess={(url) => console.log(url)}></UploadImage>
        </div>
    );
}