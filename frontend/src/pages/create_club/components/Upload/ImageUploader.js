import React from 'react';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const ImageUploader = ({ name = 'avatar', maxCount = 1, onChange, fileList }) => {
    return (
        <Dragger
            name={name}
            listType="picture"
            maxCount={maxCount}
            beforeUpload={() => false} // Không tải file lên ngay lập tức
            onChange={onChange}
            fileList={fileList}
        >
            <p className="ant-upload-drag-icon">
                <UploadOutlined />
            </p>
            <p className="ant-upload-text">Tải lên ảnh đại diện cho câu lạc bộ</p>
            <p className="ant-upload-hint">Kéo thả hoặc click để chọn ảnh</p>
        </Dragger>
    );
};

export default ImageUploader;
