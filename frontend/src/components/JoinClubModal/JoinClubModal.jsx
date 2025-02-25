import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Spin, Result, Tag, Divider } from 'antd';
import { 
  CheckCircleOutlined, 
  TeamOutlined, 
  EnvironmentOutlined,
  InfoCircleOutlined,
  CodeOutlined
} from '@ant-design/icons';
import clubService from '../../services/club.service';
import Avatar from '../Avatar/Avatar';
import './JoinClubModal.css';

const JoinClubModal = ({ isOpen, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('form'); // form, preview, success
  const [clubPreview, setClubPreview] = useState(null);
  
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      
      // Kiểm tra mã câu lạc bộ trước khi tham gia
      const response = await clubService.getClubByCode(values.clubCode);
      
      if (response.success) {
        setClubPreview(response.data);
        setStep('preview');
      }
    } catch (error) {
      message.error(error.message || 'Không tìm thấy câu lạc bộ');
    } finally {
      setLoading(false);
    }
  };
  
  const handleConfirmJoin = async () => {
    try {
      setLoading(true);
      const response = await clubService.joinClub(form.getFieldValue('clubCode'));
      
      if (response.success) {
        setStep('success');
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      message.error(error.message || 'Lỗi khi tham gia câu lạc bộ');
      setStep('form');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    form.resetFields();
    setStep('form');
    setClubPreview(null);
    onClose();
  };
  
  const handleTryAgain = () => {
    form.resetFields();
    setStep('form');
    setClubPreview(null);
  };
  
  const renderContent = () => {
    switch (step) {
      case 'preview':
        return (
          <div className="club-preview">
            <Avatar 
              src={clubPreview.avatar}
              alt={clubPreview.name}
              text={clubPreview.name?.charAt(0)}
              size="large"
              className="club-preview-avatar"
            />
            <h3 className="club-preview-name">{clubPreview.name}</h3>
            
            <div className="club-preview-code">
              <CodeOutlined /> Mã CLB: <Tag color="blue">{clubPreview.club_code}</Tag>
            </div>
            
            <div className="club-preview-stats">
              <div className="club-stat-item">
                <TeamOutlined /> 
                <span>{clubPreview.member_count} thành viên</span>
              </div>
              
              {clubPreview.province && (
                <div className="club-stat-item">
                  <EnvironmentOutlined /> 
                  <span>{clubPreview.province}</span>
                </div>
              )}
            </div>
            
            <Divider className="club-preview-divider">
              <InfoCircleOutlined /> Giới thiệu
            </Divider>
            
            <div className="club-preview-description">
              {clubPreview.description || 'Chưa có mô tả'}
            </div>
            
            <div className="club-preview-actions">
              <Button onClick={() => setStep('form')}>Quay lại</Button>
              <Button 
                type="primary" 
                onClick={handleConfirmJoin}
                loading={loading}
              >
                Xác nhận tham gia
              </Button>
            </div>
          </div>
        );
        
      case 'success':
        return (
          <Result
            status="success"
            icon={<CheckCircleOutlined />}
            title="Yêu cầu tham gia đã được gửi!"
            subTitle="Quản trị viên câu lạc bộ sẽ xem xét yêu cầu của bạn trong thời gian sớm nhất."
            extra={[
              <Button key="close" onClick={handleCancel}>
                Đóng
              </Button>,
              <Button key="dashboard" type="primary" onClick={handleCancel}>
                Quay lại trang chủ
              </Button>,
            ]}
          />
        );
        
      default: // form
        return (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="clubCode"
              label="Mã câu lạc bộ"
              rules={[
                { required: true, message: 'Vui lòng nhập mã câu lạc bộ' },
                { min: 3, message: 'Mã câu lạc bộ phải có ít nhất 3 ký tự' }
              ]}
            >
              <Input placeholder="Nhập mã câu lạc bộ" />
            </Form.Item>
            
            <Form.Item className="form-actions">
              <Button onClick={handleCancel}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Tiếp tục
              </Button>
            </Form.Item>
          </Form>
        );
    }
  };
  
  return (
    <Modal
      title={step === 'success' ? null : "Tham gia câu lạc bộ"}
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={step === 'preview' ? 500 : (step === 'success' ? 500 : 400)}
      className="join-club-modal"
      destroyOnClose
    >
      <Spin spinning={loading && step !== 'success'}>
        {renderContent()}
      </Spin>
    </Modal>
  );
};

export default JoinClubModal; 