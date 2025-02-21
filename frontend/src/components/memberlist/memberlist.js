import React, { useState } from 'react';
import { List, Avatar, Tabs, Button, Tag } from 'antd';
import { UserOutlined, CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, TrophyOutlined } from '@ant-design/icons';
import './memberlist.css';

const MemberList = () => {
  const [activeTab, setActiveTab] = useState('pending');

  // Mock data - sau này sẽ thay bằng API call thực tế
  const pendingMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      registerDate: '20/03/2024',
      avatar: null
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      registerDate: '19/03/2024',
      avatar: null
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      registerDate: '18/03/2024',
      avatar: null
    }
  ];

  const approvedMembers = [
    {
      id: 1,
      name: 'Phạm Văn D',
      clubId: 'CLB001',
      rank: '2/20',
      avatar: null
    },
    {
      id: 2,
      name: 'Hoàng Thị E',
      clubId: 'CLB002',
      rank: '5/20',
      avatar: null
    },
    {
      id: 3,
      name: 'Vũ Văn F',
      clubId: 'CLB003',
      rank: '8/20',
      avatar: null
    }
  ];

  const handleApprove = (memberId) => {
    console.log('Approve member:', memberId);
  };

  const handleReject = (memberId) => {
    console.log('Reject member:', memberId);
  };

  const handleDelete = (memberId) => {
    console.log('Delete member:', memberId);
  };

  const renderMemberActions = (member) => {
    if (member.status === 'pending') {
      return [
        <Button 
          type="primary" 
          icon={<CheckOutlined />} 
          size="small"
          onClick={() => handleApprove(member.id)}
        >
          Duyệt
        </Button>,
        <Button 
          danger 
          icon={<CloseOutlined />} 
          size="small"
          onClick={() => handleReject(member.id)}
        >
          Từ chối
        </Button>
      ];
    }
    return [
      <Button 
        type="text" 
        className="edit-button"
        icon={<EditOutlined />}
      />,
      <Button 
        type="text" 
        className="delete-button"
        icon={<DeleteOutlined />}
      />
    ];
  };

  // Data cho tab Đã hủy
  const rejectedMembers = [
    {
      id: 1,
      name: 'Đỗ Văn G',
      email: 'dovang@example.com',
      avatar: null,
      reason: 'Thông tin không hợp lệ'
    },
    {
      id: 2,
      name: 'Ngô Thị H',
      email: 'ngothih@example.com',
      avatar: null,
      reason: 'Không đủ điều kiện tham gia'
    }
  ];

  return (
    <div className="member-list-container">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab="Chưa duyệt" key="pending">
          <List
            itemLayout="horizontal"
            dataSource={pendingMembers}
            renderItem={member => (
              <List.Item className="member-item">
                <div className="member-content">
                  <Avatar className="member-avatar">
                    {member.name[0]}
                  </Avatar>
                  <div className="member-info-container">
                    <div className="member-name">{member.name}</div>
                    <div className="member-email">{member.email}</div>
                    <div className="member-register-date">Đăng ký: {member.registerDate}</div>
                  </div>
                </div>
                <div className="member-actions">
                  <Button 
                    className="action-button approve"
                    icon={<CheckOutlined />}
                  >
                    Duyệt
                  </Button>
                  <Button 
                    className="action-button reject"
                    icon={<CloseOutlined />}
                  >
                    Từ chối
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đã duyệt" key="approved">
          <List
            itemLayout="horizontal"
            dataSource={approvedMembers}
            renderItem={member => (
              <List.Item actions={renderMemberActions(member)}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={member.avatar}>
                      {member.name[0]}
                    </Avatar>
                  }
                  title={
                    <div className="member-title">
                      <span className="member-name">{member.name}</span>
                      <Tag className="club-id">{member.clubId}</Tag>
                    </div>
                  }
                  description={
                    <div className="member-rank">
                      <TrophyOutlined className="trophy-icon" />
                      <span>Xếp hạng: {member.rank}</span>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Đã hủy" key="rejected">
          <List
            itemLayout="horizontal"
            dataSource={rejectedMembers}
            renderItem={member => (
              <List.Item className="member-item">
                <div className="member-content">
                  <Avatar className="member-avatar">
                    {member.name[0].toUpperCase()}
                  </Avatar>
                  <div className="member-info-container">
                    <div className="member-name">{member.name}</div>
                    <div className="member-email">{member.email}</div>
                    <div className="member-reason">Lý do: {member.reason}</div>
                  </div>
                </div>
                <div className="member-actions">
                  <DeleteOutlined className="delete-icon" />
                </div>
              </List.Item>
            )}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default MemberList;