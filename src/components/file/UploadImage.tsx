
'use client';
import React, { useState, useEffect } from 'react';
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, message, Upload, Spin } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import { API } from '@/utils/constant';
import axios from 'axios';
import Image from 'next/image';

interface UploadImageProps {
  onUploadSuccess: (url: string) => void;
  initialImageUrl?: string;
}

const UploadImage: React.FC<UploadImageProps> = ({
  onUploadSuccess,
  initialImageUrl,
}) => {
  const [urlImage, setUrlImage] = useState<string>(initialImageUrl || '');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl);

  useEffect(() => {
    if (initialImageUrl) {
      setImageUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const url = info.file.response.url;
      setImageUrl(url);
      setUrlImage(url);
      onUploadSuccess(url);
    } else if (info.file.status === 'error') {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleRemove = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API.CLOUD}/cloudinary/delete`, {
        data: { url: urlImage },
      });
      setLoading(false);
      if (response.status === 200) {
        setImageUrl(undefined);
        setUrlImage('');
        message.success('Image removed successfully.');
      } else {
        message.error('Failed to remove the image.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error removing image:', error);
      message.error('An error occurred while removing the image.');
    }
  };

  const props: UploadProps = {
    name: 'file',
    action: `${API.CLOUD}/cloudinary`,
    onChange: handleChange,
    showUploadList: false,
  };

  return (
    <div>
      {imageUrl ? (
        <div style={{ marginBottom: 16 }}>
          <Image
            alt='image'
            src={imageUrl}
            width={200}
            height={200}
            style={{ objectFit: 'cover' }}
            className='rounded'
          />
          <Button onClick={handleRemove} danger loading={loading}>
            Remove Image
          </Button>
        </div>
      ) : (
        <Upload {...props}>
          <Button icon={<UploadOutlined />} loading={loading}>
            Click to Upload
          </Button>
        </Upload>
      )}
      {loading && (
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
    </div>
  )
}

export default UploadImage
