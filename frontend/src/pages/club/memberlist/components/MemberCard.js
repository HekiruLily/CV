import React from 'react';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './MemberCard.css';

const MemberCard = ({ member, isAdmin, onEdit, onDelete, onApprove, onReject, showApproveReject }) => {
    const joinedDate = new Date(member.joined_at).toLocaleDateString('vi-VN');

    return (
        <div className="member-item">
            <div className="member-avatar">
                {member.avatar || member.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
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
                        <button className="action-button edit" onClick={() => onEdit(member)}>
                            <EditOutlined />
                        </button>
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