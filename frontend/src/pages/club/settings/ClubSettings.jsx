import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, message, Row, Col } from 'antd';
import clubService from '../../../services/club.service';
import './ClubSettings.css';

const { TextArea } = Input;

const ClubSettings = () => {
    const { clubCode } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [clubInfo, setClubInfo] = useState(null);

    useEffect(() => {
        fetchClubInfo();
    }, [clubCode]);

    const fetchClubInfo = async () => {
        try {
            const response = await clubService.getClubIntroduction(clubCode);
            if (response.success) {
                setClubInfo(response.data);
                form.setFieldsValue({
                    club_code: response.data.club_code,
                    name: response.data.name,
                    description: response.data.description,
                    province: response.data.province,
                    district: response.data.district,
                    location: response.data.location
                });
            }
        } catch (error) {
            message.error(error.message || 'Không thể tải thông tin câu lạc bộ');
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await clubService.updateClubInfo(clubInfo.club_id, values);
            if (response.success) {
                message.success('Cập nhật thông tin câu lạc bộ thành công');
                // If club_code was changed, navigate to the new URL
                if (values.club_code !== clubCode) {
                    navigate(`/club/${values.club_code}/settings`);
                } else {
                    // Refresh club info
                    fetchClubInfo();
                }
            }
        } catch (error) {
            message.error(error.message || 'Lỗi khi cập nhật thông tin câu lạc bộ');
        } finally {
            setLoading(false);
        }
    };

    if (!clubInfo) return null;

    return (
        <div className="club-settings-container">
            <h1>Cài đặt câu lạc bộ</h1>
            <Card title="Thông tin cơ bản" className="settings-card">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Cập nhật thông tin
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ClubSettings; 