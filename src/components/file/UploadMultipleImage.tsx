'use client';
import React, { useState } from 'react';
import { Upload, Button, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { API } from '@/utils/constant';
import Image from 'next/image';

interface UploadMultipleImagesProps {
  onUploadSuccess: (urls: string[]) => void;
  initialImageUrls?: string[];
}

const UploadMultipleImages: React.FC<UploadMultipleImagesProps> = ({
  onUploadSuccess,
  initialImageUrls = [],
}) => {
  const [imageUrls, setImageUrls] = useState<string[]>(
    Array.isArray(initialImageUrls) ? initialImageUrls : []
  );
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
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleRemove = async (url: string) => {
    try {
      setLoading(true);

      // Send delete request to API
      const response = await axios.delete(`${API.CLOUD}/cloudinary/delete`, {
        data: { url },
      });

      // Process response
      if (response.status === 200) {
        if (Array.isArray(imageUrls)) {
          const updatedUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
          setImageUrls(updatedUrls);
          onUploadSuccess(updatedUrls); // Update the parent with the new list
          message.success('Image removed successfully.');
        } else {
          throw new Error('imageUrls is not an array');
        }
      } else {
        message.error('Failed to remove the image.');
      }
    } catch (error) {
      console.error('Error removing image:', error);
      message.error('An error occurred while removing the image.');
    } finally {
      setLoading(false);
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
    <div>
      {/* Upload Button */}
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />} loading={loading}>
          Click to Upload Multiple Images
        </Button>
      </Upload>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Spin size='small' />
        </div>
      )}

      {/* Display Uploaded Images */}
      <div style={{ marginTop: 16 }}>
        {imageUrls.length > 0 ? (
          imageUrls.map((url: string, index: number) => (
            <div
              key={index}
              style={{
                marginBottom: 16,
                display: 'inline-block',
                textAlign: 'center',
              }}
            >
              <Image
                alt={`Uploaded Image ${index + 1}`}
                src={url}
                width={100}
                height={100}
                style={{ objectFit: 'cover', marginRight: 8 }}
              />
              <Button type='link' danger onClick={() => handleRemove(url)}>
                Remove
              </Button>
            </div>
          ))
        ) : (
          <p>No images uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default UploadMultipleImages;
