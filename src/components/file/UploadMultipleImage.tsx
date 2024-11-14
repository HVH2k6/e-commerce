'use client';
// UploadMultipleImages.tsx
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Spin, Upload } from 'antd';
import axios from 'axios';
import { API } from '@/utils/constant';
import Image from 'next/image';

interface UploadMultipleImagesProps {
  onUploadSuccess: (urls: string[]) => void;
}

const UploadMultipleImages: React.FC<UploadMultipleImagesProps> = ({
  onUploadSuccess,
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const url = info.file.response?.url;
      if (url) {
        const updatedUrls = [...imageUrls, url];
        setImageUrls(updatedUrls);
        onUploadSuccess(updatedUrls); // Pass the updated list of URLs
        setLoading(false);
      }
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const uploadProps = {
    name: 'file',
    action: `${API.CLOUD}/cloudinary`,
    onChange: handleChange,
    multiple: true,
    showUploadList: false,
  };

  return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Upload Multiple Images</Button>
      {loading && <Spin size="small" />}
      {imageUrls.length > 0 && (
        <div>
          {imageUrls.map((url, index) => (
            <div key={index} className='mb-3'>
              <Image src={url} alt={`Image ${index + 1}`} className='size-24 border-2 border-slate-300' width={96} height={96}/>
              <Button
                type='link'
                
                onClick={async () => {
                  try {
                    const response = await axios.delete(
                      `${API.CLOUD}/cloudinary/delete`,
                      {
                        data: { url },
                      }
                    );
                    if (response.status === 200) {
                      const updatedUrls = imageUrls.filter(
                        (imageUrl) => imageUrl !== url
                      );
                      setImageUrls(updatedUrls);
                      onUploadSuccess(updatedUrls); // Pass the updated list of URLs
                      message.success('Image removed successfully.');
                    } else {
                      message.error('Failed to remove the image.');
                    }
                  } catch (error) {
                    console.error('Error removing image:', error);
                    message.error(
                      'An error occurred while removing the image.'
                    );
                  }
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </Upload>
  );
};

export default UploadMultipleImages;
