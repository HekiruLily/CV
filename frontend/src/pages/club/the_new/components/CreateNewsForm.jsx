import React, { useState, useRef } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { 
  CameraOutlined, 
  VideoCameraOutlined,
  SmileOutlined,
  EnvironmentOutlined,
  TagOutlined,
  UserOutlined,
  LockOutlined,
  SendOutlined,
  CloseOutlined
} from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import ClubNewsService from '../../../../services/clubNews.service';
import './CreateNewsForm.css';

const { TextArea } = Input;
const { Option } = Select;

const CreateNewsForm = ({ clubCode, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [visibility, setVisibility] = useState('Public');
  const [activityType, setActivityType] = useState('News');

  const handleSubmit = async (values) => {
    try {
      if (!content && !selectedImage) {
        message.error('Vui lòng nhập nội dung hoặc chọn ảnh!');
        return;
      }

      setLoading(true);
      const formData = {
        title: content || 'Bài viết mới',
        content: content,
        activity_type: activityType,
        visibility: visibility,
        image: selectedImage
      };

      await ClubNewsService.createNews(clubCode, formData);
      message.success('Đăng bài viết thành công!');
      resetForm();
      if (onSuccess) onSuccess();
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi đăng bài');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    form.resetFields();
    setContent('');
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        message.error('Ảnh phải nhỏ hơn 5MB!');
        return;
      }
      if (!file.type.startsWith('image/')) {
        message.error('Chỉ được tải lên file ảnh!');
        return;
      }
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onEmojiClick = (event) => {
    setContent((prevContent) => prevContent + event.emoji);
  };

  const getActivityTypeIcon = (type) => {
    switch (type) {
      case 'Run':
        return '🏃';
      case 'Event':
        return '📅';
      case 'News':
        return '📰';
      case 'Notice':
        return '📢';
      default:
        return '📝';
    }
  };

  return (
    <div className="create-news-form">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          activity_type: 'News',
          visibility: 'Public'
        }}
      >
        <div className="form-header">
          <h2>Tạo bài viết</h2>
          <div className="post-options">
            <Button 
              type="text" 
              className="visibility-btn"
              onClick={(e) => e.preventDefault()}
            >
              <span className="visibility-icon">
                {visibility === 'Public' ? <UserOutlined /> : <LockOutlined />}
              </span>
              {visibility === 'Public' ? 'Công khai' : 'Riêng tư'}
              <Select
                value={visibility}
                onChange={setVisibility}
                className="visibility-select"
                dropdownClassName="visibility-dropdown"
              >
                <Option value="Public">
                  <UserOutlined /> Công khai
                </Option>
                <Option value="Private">
                  <LockOutlined /> Riêng tư
                </Option>
              </Select>
            </Button>
            <span className="separator">•</span>
            <Button 
              type="text" 
              className="activity-btn"
              onClick={(e) => e.preventDefault()}
            >
              <span className="activity-icon">
                {getActivityTypeIcon(activityType)}
              </span>
              {activityType}
              <Select
                value={activityType}
                onChange={setActivityType}
                className="activity-select"
                dropdownClassName="activity-dropdown"
              >
                <Option value="Run">
                  🏃 Chạy bộ
                </Option>
                <Option value="Event">
                  📅 Sự kiện
                </Option>
                <Option value="News">
                  📰 Tin tức
                </Option>
                <Option value="Notice">
                  📢 Thông báo
                </Option>
              </Select>
            </Button>
          </div>
        </div>

        <div className="content-input">
          <TextArea 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Bạn đang nghĩ gì?"
            autoSize={{ minRows: 3, maxRows: 6 }}
            bordered={false}
          />
        </div>

        {/* Custom Image Preview */}
        {previewUrl && (
          <div className="custom-image-preview">
            <div className="image-wrapper">
              <img src={previewUrl} alt="Preview" />
              <Button
                className="remove-image-btn"
                icon={<CloseOutlined />}
                onClick={removeImage}
              />
            </div>
          </div>
        )}

        <div className="form-tools">
          <div className="tool-buttons">
            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              style={{ display: 'none' }}
            />
            
            <Button 
              type="text" 
              icon={<CameraOutlined />}
              onClick={() => fileInputRef.current?.click()}
            >
              Ảnh
            </Button>
            <Button type="text" icon={<VideoCameraOutlined />}>
              Video
            </Button>
            <Button 
              type="text" 
              icon={<SmileOutlined />} 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="emoji-button"
            >
              Cảm xúc
            </Button>
            <Button type="text" icon={<EnvironmentOutlined />}>
              Check in
            </Button>
            <Button type="text" icon={<TagOutlined />}>
              Gắn thẻ
            </Button>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon={<SendOutlined />}
            className="submit-button"
            disabled={!content && !selectedImage}
          >
            Đăng
          </Button>
        </div>
      </Form>

      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default CreateNewsForm; 