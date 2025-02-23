import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { message } from 'antd';
import './introduction.css';
import { EditOutlined } from '@ant-design/icons';
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
        <div>
            <div className="introduction-container">
                <div className="header-section">
                    <h2 className="club-name">{clubInfo.name}</h2>
                    <button className="edit-button" onClick={handleEdit}>
                        <EditOutlined /> Chỉnh sửa
                    </button>
                </div>
                
                <div className="content-section">

                    <img 
                        src={clubInfo.avatar || 'https://images4.alphacoders.com/136/thumb-1920-1369866.png'}
                        alt="Club" 
                        className="club-image"
                    />

                    <div className="text-section">
                        <p className="club-description">
                            {clubInfo.description}
                        </p>
                        
                        <div className="info-box">
                            <div className="info-item">
                                <span className="info-label">Ngày thành lập</span>
                                <span className="info-value">
                                    {new Date(clubInfo.created_at).toLocaleDateString('vi-VN')}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Số thành viên</span>
                                <span className="info-value">{clubInfo.member_count} người</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Địa điểm</span>
                                <span className="info-value">
                                    {`${clubInfo.district}, ${clubInfo.province}`}
                                </span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Người tạo</span>
                                <span className="info-value">{clubInfo.creator_name}</span>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
            <div className="club-description-container">
                <h3>Mô tả câu lạc bộ</h3>
                <p>{clubInfo.description}</p>
            </div>
        </div>
    );
};

export default Introduction;
