import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message, Card, Row, Col, Statistic, Button, Avatar, Tag } from 'antd';
import { 
    EditOutlined, 
    TeamOutlined, 
    CalendarOutlined, 
    EnvironmentOutlined,
    UserOutlined,
    ThunderboltOutlined
} from '@ant-design/icons';
import './introduction.css';
import clubService from '../../../services/club.service';
import { useGlobal } from '../../../contexts/GlobalContext';

const Introduction = () => {
    const { showLoading, hideLoading, setIsEditClubModalOpen } = useGlobal();
    const { clubCode } = useParams();
    const [clubInfo, setClubInfo] = useState(null);

    useEffect(() => {
        fetchClubInfo();
    }, [clubCode]);

    const fetchClubInfo = async () => {
        try {
            showLoading('Đang tải thông tin câu lạc bộ...');
            const response = await clubService.getClubIntroduction(clubCode);
            if (response.success) {
                setClubInfo(response.data);
            }
        } catch (error) {
            message.error(error.message || 'Không thể tải thông tin câu lạc bộ');
        } finally {
            hideLoading();
        }
    };

    const handleEdit = () => {
        setIsEditClubModalOpen(true);
    };

    if (!clubInfo) {
        return <div>Không tìm thấy thông tin câu lạc bộ</div>;
    }

    return (
        <div className="club-introduction">
            {/* Hero Section */}
            <div className="hero-banner" style={{
                backgroundImage: `url(${clubInfo.banner || 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80'})`
            }}>
                <div className="hero-content">
                    <Avatar 
                        size={120} 
                        src={clubInfo.avatar || 'https://images4.alphacoders.com/136/thumb-1920-1369866.png'} 
                        icon={<UserOutlined />}
                        className="club-avatar"
                    />
                    <h1>{clubInfo.name}</h1>
                    <Tag color="blue" icon={<ThunderboltOutlined />}>Câu lạc bộ chạy bộ</Tag>
                </div>
            </div>

            <div className="main-content">
                <Row gutter={[24, 24]}>
                    {/* Left Column - Club Description */}
                    <Col xs={24} lg={16}>
                        <Card 
                            title={
                                <div className="card-title">
                                    <span>Giới thiệu câu lạc bộ</span>
                                    <Button 
                                        type="primary" 
                                        icon={<EditOutlined />} 
                                        onClick={handleEdit}
                                        className="edit-button"
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </div>
                            }
                            className="info-card"
                        >
                            <p className="club-description">{clubInfo.description}</p>
                        </Card>
                    </Col>

                    {/* Right Column - Club Stats & Info */}
                    <Col xs={24} lg={8}>
                        <Card className="info-card stats-card">
                            <Statistic
                                title="Thành viên"
                                value={clubInfo.member_count}
                                prefix={<TeamOutlined />}
                                className="club-statistic"
                            />
                            <div className="info-divider" />
                            <div className="info-item">
                                <CalendarOutlined />
                                <span className="info-label">Ngày thành lập:</span>
                                <span className="info-value">
                                    {new Date(clubInfo.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                            <div className="info-item">
                                <EnvironmentOutlined />
                                <span className="info-label">Địa điểm:</span>
                                <span className="info-value">
                                    {`${clubInfo.district}, ${clubInfo.province}`}
                                </span>
                            </div>
                            <div className="info-item">
                                <UserOutlined />
                                <span className="info-label">Người sáng lập:</span>
                                <span className="info-value">{clubInfo.creator_name}</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Introduction;