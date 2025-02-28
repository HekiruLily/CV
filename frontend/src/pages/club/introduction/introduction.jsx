import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message, Card, Row, Col, Button } from 'antd';
import { 
    TeamOutlined,
    TrophyOutlined,
    CalendarOutlined,
    EnvironmentOutlined,
    FacebookOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    EditOutlined
} from '@ant-design/icons';
import './introduction.css';
import clubService from '../../../services/club.service';
import ClubEditForm from './ClubEditForm';

const Introduction = () => {
    const { clubCode } = useParams();
    const navigate = useNavigate();
    const [clubInfo, setClubInfo] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchClubInfo();
        checkAdminStatus();
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

    const checkAdminStatus = async () => {
        try {
            // Get user clubs to check if user is admin of this club
            const response = await clubService.getUserClubs();
            if (response.success) {
                const currentClub = response.data.find(club => club.club_code === clubCode);
                if (currentClub && currentClub.role === 'Admin') {
                    setIsAdmin(true);
                }
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    };

    const showEditModal = () => {
        if (!isAdmin) {
            message.warning('Bạn không có quyền chỉnh sửa thông tin câu lạc bộ này');
            return;
        }
        setIsEditModalVisible(true);
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };

    const handleUpdateSuccess = (values) => {
        setIsEditModalVisible(false);
        // If club_code was changed, navigate to the new URL
        if (values.club_code !== clubCode) {
            navigate(`/club/${values.club_code}/introduction`);
        } else {
            // Refresh club info
            fetchClubInfo();
        }
    };

    if (!clubInfo) return null;

    return (
        <div className="club-introduction">
            {/* Banner Section */}
            <div className="club-banner">
                {isAdmin && (
                    <div className="edit-banner-button" onClick={showEditModal}>
                        <EditOutlined /> Chỉnh sửa
                    </div>
                )}
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
                                {clubInfo.facebook_url && (
                                    <a 
                                        href={clubInfo.facebook_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="social-link"
                                    >
                                        <FacebookOutlined />
                                        <div className="social-info">
                                            <span className="platform">Facebook</span>
                                            <span className="account">Trang Facebook</span>
                                        </div>
                                    </a>
                                )}
                                
                                {clubInfo.instagram_url && (
                                    <a 
                                        href={clubInfo.instagram_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="social-link"
                                    >
                                        <InstagramOutlined />
                                        <div className="social-info">
                                            <span className="platform">Instagram</span>
                                            <span className="account">Trang Instagram</span>
                                        </div>
                                    </a>
                                )}
                                
                                {clubInfo.youtube_channel_url && (
                                    <a 
                                        href={clubInfo.youtube_channel_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="social-link"
                                    >
                                        <YoutubeOutlined />
                                        <div className="social-info">
                                            <span className="platform">Youtube</span>
                                            <span className="account">Kênh Youtube</span>
                                        </div>
                                    </a>
                                )}
                                
                                {!clubInfo.facebook_url && !clubInfo.instagram_url && !clubInfo.youtube_channel_url && (
                                    <div className="no-social-links">
                                        Chưa có kênh truyền thông
                                    </div>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* Club Edit Form Modal */}
            <ClubEditForm 
                clubInfo={clubInfo}
                visible={isEditModalVisible}
                onCancel={handleCancel}
                onSuccess={handleUpdateSuccess}
            />
        </div>
    );
};

export default Introduction;
