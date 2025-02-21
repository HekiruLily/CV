import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, TrophyOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './memberlist.css';


const MemberList = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data
  const pendingMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      registerDate: '20/03/2024',
      avatar: 'N'
    },
    // ... other pending members
  ];

  const rejectedMembers = [
    {
      id: 1,
      name: 'Đỗ Văn G',
      email: 'dovang@example.com',
      reason: 'Thông tin không hợp lệ',
      avatar: 'Đ'
    },
    // ... other rejected members
  ];

  const approvedMembers = [
    {
      id: 1,
      name: 'Phạm Văn D',
      clubId: 'CLB001',
      rank: '2/20',
      avatar: 'D'
    },
    {
      id: 2,
      name: 'Hoàng Thị E',
      clubId: 'CLB002',
      rank: '5/20',
      avatar: 'E'
    },
    {
      id: 3,
      name: 'Vũ Văn F',
      clubId: 'CLB003',
      rank: '8/20',
      avatar: 'F'
    }
  ];

  return (
    <div className="member-list-container">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Chưa duyệt
        </button>
        <button 
          className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Đã duyệt
        </button>
        <button 
          className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
          onClick={() => setActiveTab('rejected')}
        >
          Đã hủy
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'pending' && (
          <div className="members-list">
            {pendingMembers.map(member => (
              <div key={member.id} className="member-item">
                <div className="member-content">
                  <div className="member-avatar">
                    {member.avatar}
                  </div>
                  <div className="member-info">
                    <div className="member-header">
                      <h3 className="member-name">{member.name}</h3>
                    </div>
                    <p className="member-email">{member.email}</p>
                    <p className="member-register-date">Đăng ký: {member.registerDate}</p>
                  </div>
                </div>
                <div className="member-actions">
                  <button className="action-button approve">
                    <CheckOutlined />
                  </button>
                  <button className="action-button reject">
                    <CloseOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'approved' && (
          <div className="members-list">
            {approvedMembers.map(member => (
              <div key={member.id} className="member-item">
                <div className="member-content">
                  <div className="member-avatar">
                    {member.avatar}
                  </div>
                  <div className="member-info">
                    <div className="member-header">
                      <h3 className="member-name">{member.name}</h3>
                      <span className="member-club-id">{member.clubId}</span>
                    </div>
                    <div className="member-rank">
                      <TrophyOutlined className="rank-icon" />
                      <span>Xếp hạng: {member.rank}</span>
                    </div>
                  </div>
                </div>
                <div className="member-actions">
                  <button className="action-button edit">
                    <EditOutlined />
                  </button>
                  <button className="action-button delete">
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="members-list">
            {rejectedMembers.map(member => (
              <div key={member.id} className="member-item">
                <div className="member-content">
                  <div className="member-avatar">
                    {member.avatar}
                  </div>
                  <div className="member-info">
                    <div className="member-header">
                      <h3 className="member-name">{member.name}</h3>
                    </div>
                    <p className="member-email">{member.email}</p>
                    <p className="member-reason">Lý do: {member.reason}</p>
                  </div>
                </div>
                <div className="member-actions">
                  <button className="action-button delete">
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberList;