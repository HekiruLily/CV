import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import TournamentService from '../../services/tournamentService';
import './CreateTournament.css';

const { Option } = Select;
const { TextArea } = Input;

const CreateTournament = ({ onCancel, onSuccess }) => {
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // Prepare tournament data
      const tournamentData = {
        tournament_code: values.tournament_code,
        tournament_name: values.tournament_name,
        tournament_description: values.tournament_description,
        tournament_location: values.tournament_location,
        tournament_start_date: values.tournament_start_date.format('YYYY-MM-DD'),
        tournament_end_date: values.tournament_end_date.format('YYYY-MM-DD'),
        tournament_registration_deadline: values.tournament_registration_deadline.format('YYYY-MM-DD'),
        tournament_types: JSON.stringify({
          format: values.format,
          categories: values.categories
        }),
        tournament_status: 'Pending',
        tournament_prize_pool: values.tournament_prize_pool,
        tournament_rules: values.tournament_rules,
        tournament_link: values.tournament_link,
        tournament_image: imageUrl
      };

      // Call API to create tournament
      const response = await TournamentService.createTournament(tournamentData);
      
      if (response.success) {
        message.success('Tạo giải đấu thành công!');
        if (onSuccess) onSuccess();
      } else {
        message.error('Tạo giải đấu thất bại: ' + response.message);
      }
    } catch (error) {
      message.error('Có lỗi xảy ra: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      message.success('Tải ảnh lên thành công!');
    } else if (info.file.status === 'error') {
      message.error('Tải ảnh lên thất bại.');
    }
  };

  return (
    <div className="create-tournament-container">
      <div className="create-tournament-header">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={onCancel}
          className="back-button"
        >
          Quay lại
        </Button>
        <h1>Tạo giải đấu mới</h1>
      </div>

      <div className="create-tournament-form">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            format: 'elimination',
            categories: ['5K']
          }}
        >
          <div className="form-section">
            <h2>Thông tin cơ bản</h2>
            
            <Form.Item
              name="tournament_code"
              label="Mã giải đấu"
              rules={[{ required: true, message: 'Vui lòng nhập mã giải đấu!' }]}
            >
              <Input placeholder="Ví dụ: MARATHON2024" />
            </Form.Item>

            <Form.Item
              name="tournament_name"
              label="Tên giải đấu"
              rules={[{ required: true, message: 'Vui lòng nhập tên giải đấu!' }]}
            >
              <Input placeholder="Nhập tên giải đấu" />
            </Form.Item>

            <Form.Item
              name="tournament_description"
              label="Mô tả"
            >
              <TextArea rows={4} placeholder="Mô tả chi tiết về giải đấu" />
            </Form.Item>

            <Form.Item
              name="tournament_location"
              label="Địa điểm tổ chức"
              rules={[{ required: true, message: 'Vui lòng nhập địa điểm tổ chức!' }]}
            >
              <Input placeholder="Nhập địa điểm tổ chức giải đấu" />
            </Form.Item>
          </div>

          <div className="form-section">
            <h2>Thời gian</h2>
            
            <div className="date-row">
              <Form.Item
                name="tournament_start_date"
                label="Ngày bắt đầu"
                rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu!' }]}
              >
                <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày bắt đầu" />
              </Form.Item>

              <Form.Item
                name="tournament_end_date"
                label="Ngày kết thúc"
                rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc!' }]}
              >
                <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày kết thúc" />
              </Form.Item>
            </div>

            <Form.Item
              name="tournament_registration_deadline"
              label="Hạn đăng ký"
              rules={[{ required: true, message: 'Vui lòng chọn hạn đăng ký!' }]}
            >
              <DatePicker format="DD/MM/YYYY" placeholder="Chọn hạn đăng ký" />
            </Form.Item>
          </div>

          <div className="form-section">
            <h2>Thông tin thi đấu</h2>
            
            <Form.Item
              name="format"
              label="Hình thức thi đấu"
              rules={[{ required: true, message: 'Vui lòng chọn hình thức thi đấu!' }]}
            >
              <Select placeholder="Chọn hình thức thi đấu">
                <Option value="elimination">Loại trực tiếp</Option>
                <Option value="round_robin">Vòng tròn</Option>
                <Option value="group_stage">Chia bảng</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="categories"
              label="Cự ly thi đấu"
              rules={[{ required: true, message: 'Vui lòng chọn ít nhất một cự ly!' }]}
            >
              <Select mode="multiple" placeholder="Chọn các cự ly">
                <Option value="5K">5K</Option>
                <Option value="10K">10K</Option>
                <Option value="21K">Half Marathon (21K)</Option>
                <Option value="42K">Full Marathon (42K)</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="tournament_prize_pool"
              label="Giải thưởng (VNĐ)"
              rules={[{ required: true, message: 'Vui lòng nhập giải thưởng!' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                placeholder="Nhập tổng giải thưởng"
              />
            </Form.Item>
          </div>

          <div className="form-section">
            <h2>Thông tin bổ sung</h2>
            
            <Form.Item
              name="tournament_rules"
              label="Điều lệ giải"
            >
              <TextArea rows={4} placeholder="Nhập điều lệ giải đấu" />
            </Form.Item>

            <Form.Item
              name="tournament_link"
              label="Liên kết"
            >
              <Input placeholder="Nhập liên kết website giải đấu (nếu có)" />
            </Form.Item>

            <Form.Item
              label="Ảnh giải đấu"
            >
              <Upload
                name="file"
                action="/api/upload"
                onChange={handleImageChange}
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
              </Upload>
              {imageUrl && (
                <div className="image-preview">
                  <img src={imageUrl} alt="Tournament banner" />
                </div>
              )}
            </Form.Item>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              className="submit-button"
            >
              Tạo giải đấu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateTournament;