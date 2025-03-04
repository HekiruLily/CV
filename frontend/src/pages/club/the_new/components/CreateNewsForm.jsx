import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Select, Button, Tooltip } from 'antd';
import { App } from 'antd';
import { 
  CameraOutlined, 
  VideoCameraOutlined,
  SmileOutlined,
  EnvironmentOutlined,
  TagOutlined,
  UserOutlined,
  LockOutlined,
  CloseOutlined
} from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';
import ClubNewsService from '../../../../services/clubNews.service';
import './CreateNewsForm.css';
import Avatar from '../../../../components/Avatar/Avatar';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const { Option } = Select;

const CreateNewsForm = ({ clubCode, onSuccess }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [visibility, setVisibility] = useState('Public');
  const [activityType, setActivityType] = useState('News');
  const userData = useSelector(state => state.user.userData);

  // Đóng emoji picker khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiPicker && !event.target.closest('.emoji-picker-container') && 
          !event.target.closest('.emoji-button')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

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
    setExpanded(false);
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
      setExpanded(true);
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

  const handleFocus = () => {
    setExpanded(true);
  };

  return (
    <div className="fb-create-news-form" ref={formRef}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          activity_type: 'News',
          visibility: 'Public'
        }}
        className={expanded ? "expanded" : ""}
      >
        <div className="fb-form-header">
          <h2>Tạo bài viết</h2>
          {expanded && (
            <Button 
              type="text" 
              icon={<CloseOutlined />} 
              className="close-form-btn"
              onClick={() => setExpanded(false)}
            />
          )}
        </div>

        <div className="fb-user-input-area">
          <div className="fb-user-avatar">
            <Avatar 
              src={userData?.avatar} 
              alt={userData?.name}
              name={userData?.name}
              icon={!userData?.avatar && <UserOutlined />}
              size='medium'
            />
          </div>
          <div className="fb-input-container">
            {!expanded ? (
              <div 
                className="fb-placeholder-input"
                onClick={handleFocus}
              >
                Bạn đang nghĩ gì?
              </div>
            ) : (
              <>
                <div className="fb-post-options">
                  <Tooltip title="Chọn quyền riêng tư">
                    <Button 
                      type="text" 
                      className="fb-visibility-btn"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="fb-visibility-icon">
                        {visibility === 'Public' ? <UserOutlined /> : <LockOutlined />}
                      </span>
                      {visibility === 'Public' ? 'Công khai' : 'Riêng tư'}
                      <Select
                        value={visibility}
                        onChange={setVisibility}
                        className="fb-visibility-select"
                      >
                        <Option value="Public">
                          <UserOutlined /> Công khai
                        </Option>
                        <Option value="Private">
                          <LockOutlined /> Riêng tư
                        </Option>
                      </Select>
                    </Button>
                  </Tooltip>
                  <span className="fb-separator">•</span>
                  <Tooltip title="Chọn loại bài viết">
                    <Button 
                      type="text" 
                      className="fb-activity-btn"
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="fb-activity-icon">
                        {getActivityTypeIcon(activityType)}
                      </span>
                      {activityType}
                      <Select
                        value={activityType}
                        onChange={setActivityType}
                        className="fb-activity-select"
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
                  </Tooltip>
                </div>

                <div className="fb-content-input">
                  <TextArea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Bạn đang nghĩ gì?"
                    autoSize={{ minRows: 3, maxRows: 10 }}
                    maxLength={5000}
                    showCount
                    bordered={false}
                    autoFocus
                  />
                </div>

                {/* Custom Image Preview */}
                {previewUrl && (
                  <div className="fb-image-preview">
                    <div className="fb-image-wrapper">
                      <img src={previewUrl} alt="Preview" />
                      <Button
                        className="fb-remove-image-btn"
                        icon={<CloseOutlined />}
                        onClick={removeImage}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {expanded && (
          <div className="fb-form-tools">
            <div className="fb-tool-label">Thêm vào bài viết của bạn</div>
            <div className="fb-tool-buttons">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <Tooltip title="Thêm ảnh">
                <Button 
                  type="text" 
                  icon={<CameraOutlined style={{ color: '#45BD62' }} />}
                  onClick={() => fileInputRef.current?.click()}
                  className="fb-tool-btn"
                />
              </Tooltip>
              <Tooltip title="Thêm video">
                <Button 
                  type="text" 
                  icon={<VideoCameraOutlined style={{ color: '#F3425F' }} />}
                  className="fb-tool-btn"
                />
              </Tooltip>
              <Tooltip title="Thêm cảm xúc">
                <Button 
                  type="text" 
                  icon={<SmileOutlined style={{ color: '#F7B928' }} />}
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="fb-tool-btn emoji-button"
                />
              </Tooltip>
              <Tooltip title="Check in">
                <Button 
                  type="text" 
                  icon={<EnvironmentOutlined style={{ color: '#E94878' }} />}
                  className="fb-tool-btn"
                />
              </Tooltip>
              <Tooltip title="Gắn thẻ">
                <Button 
                  type="text" 
                  icon={<TagOutlined style={{ color: '#1877F2' }} />}
                  className="fb-tool-btn"
                />
              </Tooltip>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="fb-submit-button"
              disabled={!content && !selectedImage}
              block
            >
              Đăng
            </Button>
          </div>
        )}
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