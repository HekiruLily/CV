import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Modal } from 'antd';
import { App } from 'antd';
import { 
    FacebookOutlined, 
    InstagramOutlined, 
    YoutubeOutlined 
} from '@ant-design/icons';
import clubService from '../../../services/club.service';

const { TextArea } = Input;

const ClubEditForm = ({ clubInfo, visible, onCancel, onSuccess }) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Initialize form values when clubInfo changes or modal becomes visible
    React.useEffect(() => {
        if (visible && clubInfo) {
            form.setFieldsValue({
                club_code: clubInfo.club_code,
                name: clubInfo.name,
                description: clubInfo.description,
                province: clubInfo.province,
                district: clubInfo.district,
                location: clubInfo.location,
                facebook_url: clubInfo.facebook_url,
                instagram_url: clubInfo.instagram_url,
                youtube_channel_url: clubInfo.youtube_channel_url
            });
        }
    }, [clubInfo, visible, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await clubService.updateClubInfo(clubInfo.club_id, values);
            if (response.success) {
                message.success('Cập nhật thông tin câu lạc bộ thành công');
                onSuccess(values);
            }
        } catch (error) {
            message.error(error.message || 'Lỗi khi cập nhật thông tin câu lạc bộ');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa thông tin câu lạc bộ"
            open={visible}
            onCancel={onCancel}
            footer={null}
            width={700}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="club_code"
                            label="Mã câu lạc bộ"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mã câu lạc bộ' },
                                { pattern: /^[a-zA-Z0-9_-]+$/, message: 'Mã câu lạc bộ chỉ được chứa chữ cái, số, gạch ngang và gạch dưới' }
                            ]}
                        >
                            <Input placeholder="Nhập mã câu lạc bộ" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Tên câu lạc bộ"
                            rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ' }]}
                        >
                            <Input placeholder="Nhập tên câu lạc bộ" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <TextArea rows={4} placeholder="Nhập mô tả về câu lạc bộ" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="province"
                            label="Tỉnh/Thành phố"
                            rules={[{ required: true, message: 'Vui lòng nhập tỉnh/thành phố' }]}
                        >
                            <Input placeholder="Nhập tỉnh/thành phố" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="district"
                            label="Quận/Huyện"
                        >
                            <Input placeholder="Nhập quận/huyện" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="location"
                            label="Địa điểm"
                        >
                            <Input placeholder="Nhập địa điểm cụ thể" />
                        </Form.Item>
                    </Col>
                </Row>

                <h3>Kênh truyền thông</h3>
                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="facebook_url"
                            label="Facebook"
                        >
                            <Input 
                                prefix={<FacebookOutlined />} 
                                placeholder="Liên kết Facebook" 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="instagram_url"
                            label="Instagram"
                        >
                            <Input 
                                prefix={<InstagramOutlined />} 
                                placeholder="Liên kết Instagram" 
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="youtube_channel_url"
                            label="YouTube"
                        >
                            <Input 
                                prefix={<YoutubeOutlined />} 
                                placeholder="Liên kết YouTube" 
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item className="form-actions">
                    <Button onClick={onCancel} style={{ marginRight: 8 }}>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ClubEditForm; 