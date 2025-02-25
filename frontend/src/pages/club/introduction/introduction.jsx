import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message, Card, Row, Col, Statistic, Button, Avatar, Tag } from 'antd';
import { 
    TeamOutlined,
    TrophyOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined
} from '@ant-design/icons';
import './introduction.css';
import clubService from '../../../services/club.service';

const Introduction = () => {
    const { clubCode } = useParams();
    const [clubInfo, setClubInfo] = useState(null);

    useEffect(() => {
        fetchClubInfo();
    }, [clubCode]);

    const fetchClubInfo = async () => {
        try {
            const response = await clubService.getClubIntroduction(clubCode);
            if (response.success) {
                setClubInfo(response.data);
            }
        } catch (error) {
            message.error(error.message || 'Không thể tải thông tin câu lạc bộ');
        }
    };

    if (!clubInfo) return null;

    return (
        <div className="club-introduction">
            {/* Banner Section */}
            <div className="club-banner">
                <div className="banner-content">
                    <h1>{clubInfo.name}</h1>
                    <p className="club-motto">
                        {clubInfo.description || 'Nơi quy tụ những người đam mê chạy bộ, cùng nhau rèn luyện sức khỏe và chinh phục những thử thách mới.'}
                    </p>
                    <div className="club-stats">
                        <div className="stat-item">
                            <TeamOutlined />
                            <div className="stat-content">
                                <span className="stat-value">{clubInfo.member_count}</span>
                                <span className="stat-label">Thành viên</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <CalendarOutlined />
                            <div className="stat-content">
                                <span className="stat-value">
                                    {new Date(clubInfo.created_at).getFullYear()}
                                </span>
                                <span className="stat-label">Thành lập</span>
                            </div>
                        </div>
                        <div className="stat-item">
                            <TeamOutlined />
                            <div className="stat-content">
                                <span className="stat-value">{clubInfo.creator_name}</span>
                                <span className="stat-label">Người sáng lập</span>
                            </div>
                        </div>
                        <div className='stat-item'>
                            <EnvironmentOutlined />
                            <div className="stat-content">
                                <span className="stat-value">{clubInfo.province}</span>
                                <span className="stat-label">Địa điểm</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <Row gutter={[24, 24]}>
                    {/* Club Rules */}
                    <Col xs={24} md={18}>
                        <Card className="info-card rules-card">
                            <h2 className="section-title">Quy tắc của CLB</h2>
                            <ul className="rules-list">
                                <li>Tôn trọng và hỗ trợ các thành viên khác trong CLB</li>
                                <li>Tham gia đầy đủ các buổi sinh hoạt và hoạt động của CLB</li>
                                <li>Đóng góp ý kiến xây dựng cho sự phát triển của CLB</li>
                                <li>Tuân thủ quy định về trang phục và an toàn khi tham gia hoạt động</li>
                                <li>Thông báo trước nếu không thể tham gia các hoạt động đã đăng ký</li>
                                <li>Không được đưa ra ý kiến phê phán về các thành viên khác</li>
                            </ul>
                        </Card>
                    </Col>

                    {/* Social Media Links */}
                    <Col xs={24} md={6}>
                        <Card className="info-card social-card">
                            <h2 className="section-title">Kênh truyền thông</h2>
                            <div className="social-links">
                                <a href="#facebook" className="social-link">
                                    <FacebookOutlined />
                                    <div className="social-info">
                                        <span className="platform">Facebook</span>
                                        <span className="account">{clubInfo.name}</span>
                                    </div>
                                </a>
                                <a href={`mailto:${clubInfo.creator_email}`} className="social-link">
                                    <InstagramOutlined />
                                    <div className="social-info">
                                        <span className="platform">Email</span>
                                        <span className="account">{clubInfo.creator_email}</span>
                                    </div>
                                </a>
                                <a href="#location" className="social-link">
                                    <YoutubeOutlined />
                                    <div className="social-info">
                                        <span className="platform">Địa điểm</span>
                                        <span className="account">
                                            {clubInfo.district && clubInfo.province 
                                                ? `${clubInfo.district}, ${clubInfo.province}`
                                                : clubInfo.location || 'Chưa cập nhật'}
                                        </span>
                                    </div>
                                </a>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Introduction;
