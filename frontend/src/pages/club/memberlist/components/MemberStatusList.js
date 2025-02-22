import React from 'react';
import { Empty } from 'antd';
import MemberCard from './MemberCard';
import './MemberStatusList.css';

const MemberStatusList = ({ 
    members, 
    isAdmin, 
    onEdit, 
    onDelete, 
    onApprove, 
    onReject, 
    showApproveReject, 
    emptyMessage 
}) => {
    if (!members?.length) {
        return <Empty description={emptyMessage || 'Không có thành viên'} />;
    }

    return (
        <div className="members-list">
            {members.map(member => (
                <MemberCard
                    key={member.club_member_id}
                    member={member}
                    isAdmin={isAdmin}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onApprove={onApprove}
                    onReject={onReject}
                    showApproveReject={showApproveReject}
                />
            ))}
        </div>
    );
};

export default MemberStatusList; 