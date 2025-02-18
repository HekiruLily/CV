import React, { useState } from 'react';
import { Button, List, Avatar, Layout, Form, Input, Upload, Select, Row, Col, Table, Tag } from 'antd';
import { PlusOutlined, UserAddOutlined, UploadOutlined } from '@ant-design/icons';
import './club.css';

const { Sider, Content } = Layout;

const CreateClubForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <div className="create-club-form-container">
        <h2>Đăng ký Câu lạc bộ</h2>
        <p className="form-description">Điền thông tin để đăng ký câu lạc bộ mới</p>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="clubName"
                label="Tên câu lạc bộ"
                rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ!' }]}
              >
                <Input placeholder="Nhập tên câu lạc bộ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="clubCode"
                label="Mã câu lạc bộ"
                rules={[{ required: true, message: 'Vui lòng nhập mã câu lạc bộ!' }]}
              >
                <Input placeholder="Nhập mã câu lạc bộ" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="province"
                label="Tỉnh/Thành phố"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  options={[
                    { value: 'hanoi', label: 'Hà Nội' },
                    { value: 'hcm', label: 'TP. Hồ Chí Minh' },
                    // Thêm các tỉnh thành khác
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="district"
                label="Quận/Huyện"
                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
              >
                <Select
                  placeholder="Chọn quận/huyện"
                  options={[
                    // Các quận huyện sẽ được cập nhật dựa theo tỉnh/thành phố
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="ward"
            label="Phường/Xã/Thôn"
          >
            <Input placeholder="Nhập phường/xã/thôn (không bắt buộc)" />
          </Form.Item>

          <Form.Item
            name="clubImage"
            label="Ảnh câu lạc bộ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="files"
              action="/upload.do"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Tải lên ảnh đại diện cho câu lạc bộ</p>
              <p className="ant-upload-hint">
                Kéo thả hoặc click để chọn ảnh
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
          >
            <Input placeholder="https://" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả ngắn"
          >
            <Input.TextArea 
              placeholder="Mô tả về câu lạc bộ..."
              rows={4}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            name="rules"
            label="Nguyên tắc"
          >
            <Input.TextArea 
              placeholder="Các nguyên tắc của câu lạc bộ..."
              rows={4}
              showCount
              maxLength={1000}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              className="submit-button"
            >
              Đăng ký câu lạc bộ
            </Button>
          </Form.Item>
        </Form>
      </div>

      <PendingClubsList />
    </>
  );
};

const Sidebar = ({ onCreateClick }) => {
  return (
    <Sider className="club-sidebar" width={300}>
      <div className="sidebar-content">
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          className="create-club-btn"
          block
          onClick={onCreateClick}
        >
          Tạo câu lạc bộ
        </Button>
        <Button 
          type="primary" 
          icon={<UserAddOutlined />} 
          className="join-club-btn"
          block
        >
          Tham gia câu lạc bộ
        </Button>

        <h2 className="club-heading">Câu lạc bộ của bạn</h2>
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              id: 1,
              name: 'Hà Nội Running',
              members: 156,
              avatar: 'H'
            },
            {
              id: 2,
              name: 'VN Marathon',
              members: 89,
              avatar: 'V'
            },
            {
              id: 3,
              name: 'Trail Running',
              members: 45,
              avatar: 'T'
            }
          ]}
          renderItem={club => (
            <List.Item className="club-item">
              <List.Item.Meta
                avatar={
                  <Avatar className="club-avatar">
                    {club.avatar}
                  </Avatar>
                }
                title={club.name}
                description={`${club.members} thành viên`}
              />
            </List.Item>
          )}
        />
      </div>
    </Sider>
  );
};

const ClubList = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <Layout className="club-layout">
      <Sidebar onCreateClick={() => setShowCreateForm(true)} />
      <Content className="club-content">
        {showCreateForm ? (
          <CreateClubForm />
        ) : (
          <>
            <CreateClubForm />
          </>
        )}
      </Content>
    </Layout>
  );
};

const PendingClubsList = () => {
  const columns = [
    {
      title: 'TÊN CLB',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div className="club-name">{text}</div>
          <div className="club-code">Mã: {record.code}</div>
        </div>
      ),
    },
    {
      title: 'ĐỊA ĐIỂM',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'NGÀY TẠO',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'TRẠNG THÁI',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <Tag color="warning">
          {status}
        </Tag>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Button type="link">Chi tiết</Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Câu lạc bộ 1',
      code: 'CLB001',
      location: 'Hà Nội',
      createdDate: '2024-03-20',
      status: 'Chờ duyệt',
    },
    {
      key: '2',
      name: 'Câu lạc bộ 2',
      code: 'CLB002',
      location: 'TP. HCM',
      createdDate: '2024-03-21',
      status: 'Chờ duyệt',
    },
  ];

  return (
    <div className="pending-clubs-container">
      <h2 className="section-title">Danh sách chờ duyệt</h2>
      <p className="section-description">Các câu lạc bộ đang trong quá trình xét duyệt</p>
      
      <Table 
        columns={columns} 
        dataSource={data}
        pagination={false}
        className="pending-clubs-table"
      />
    </div>
  );
};

export default ClubList;
