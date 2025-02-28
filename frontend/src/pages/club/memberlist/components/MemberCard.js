import React from 'react';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, MoreOutlined, UserOutlined, IdcardOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import Avatar from '../../../../components/Avatar/Avatar';
import './MemberCard.css';

const MemberCard = ({ 
    member, 
    isAdmin, 
    onDelete, 
    onApprove, 
    onReject, 
    showApproveReject,
    onShowRoleModal,
    onShowMemberCodeModal 
}) => {
    const joinedDate = new Date(member.joined_at).toLocaleDateString('vi-VN');

    const getActionItems = () => {
        if (showApproveReject) {
            return [
                {
                    key: 'approve',
                    icon: <CheckOutlined />,
                    label: 'Duyệt',
                    onClick: () => onApprove(member)
                },
                {
                    key: 'reject',
                    icon: <CloseOutlined />,
                    label: 'Từ chối',
                    onClick: () => onReject(member)
                }
            ];
        } else if (isAdmin) {
            const items = [
                {
                    key: 'editRole',
                    icon: <UserOutlined />,
                    label: 'Cập nhật vị trí',
                    onClick: () => onShowRoleModal(member)
                },
                {
                    key: 'delete',
                    icon: <DeleteOutlined />,
                    label: 'Xóa',
                    onClick: () => onDelete(member)
                }
            ];
            
            // Only Admin can update member code
            if (member.role !== 'Admin') {
                items.splice(1, 0, {
                    key: 'editMemberCode',
                    icon: <IdcardOutlined />,
                    label: 'Cập nhật mã thành viên',
                    onClick: () => onShowMemberCodeModal(member)
                });
            }
            
            return items;
        }
        return [];
    };

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
                {(showApproveReject || isAdmin) && (
                    <Dropdown 
                        menu={{ items: getActionItems() }} 
                        trigger={['click']} 
                        placement="bottomRight"
                    >
                        <button className="action-button more">
                            <MoreOutlined />
                        </button>
                    </Dropdown>
                )}
            </div>
        </div>
    );
};

export default MemberCard; 