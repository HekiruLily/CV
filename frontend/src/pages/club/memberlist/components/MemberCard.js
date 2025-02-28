import React from 'react';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Button } from 'antd';
import Avatar from '../../../../components/Avatar/Avatar';
import './MemberCard.css';

const MemberCard = ({ member, isAdmin, onEdit, onDelete, onApprove, onReject, showApproveReject }) => {
    const joinedDate = new Date(member.joined_at).toLocaleDateString('vi-VN');

    const menu = (
        <Menu
            onClick={({ key }) => {
                if (key === 'updateCode') {
                    onEdit(member, 'code');
                } else if (key === 'updateRole') {
                    onEdit(member, 'role');
                }
            }}
        >
            <Menu.Item key="updateCode">Cập nhật mã thành viên</Menu.Item>
            <Menu.Item key="updateRole">Cập nhật vị trí thành viên</Menu.Item>
        </Menu>
    );

    return (
        <div className="member-item">
            <Avatar 
                src={member.avatar}
                alt={member.full_name}
                text={member.full_name}
                size="medium"
            />
            <div className="member-info">
                <div className="member-header">
                    <h3 className="member-name">{member.full_name}</h3>
                    <span className="member-role">{member.role}</span>
                    {member.member_code && (
                        <span className="member-code">{member.member_code}</span>
                    )}
                </div>
                <div className="member-details">
                    <span className="member-email">{member.email}</span>
                    {member.phone && (
                        <span className="member-phone">{member.phone}</span>
                    )}
                    <span className="member-joined">Tham gia: {joinedDate}</span>
                </div>
            </div>
            <div className="member-actions">
                {showApproveReject ? (
                    <>
                        <button className="action-button approve" onClick={() => onApprove(member)}>
                            <CheckOutlined />
                        </button>
                        <button className="action-button reject" onClick={() => onReject(member)}>
                            <CloseOutlined />
                        </button>
                    </>
                ) : isAdmin && (
                    <>
                        <Dropdown overlay={menu} trigger={['hover']}>
                            <Button className="action-button edit">
                                <EditOutlined /> 
                            </Button>
                        </Dropdown>
                        <button className="action-button delete" onClick={() => onDelete(member)}>
                            <DeleteOutlined />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default MemberCard;
