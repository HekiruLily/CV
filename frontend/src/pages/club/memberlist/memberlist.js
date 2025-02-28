import React, { useState, useEffect } from 'react';
import { message, Modal, Input, Select } from 'antd';
import { useParams } from 'react-router-dom';
import MemberStatusList from './components/MemberStatusList';
import clubService from '../../../services/club.service';
import { useGlobal } from '../../../contexts/GlobalContext';
import './memberlist.css';

const { Option } = Select;

const MemberList = () => {
    const { clubCode } = useParams();
    const { showLoading, hideLoading } = useGlobal();
    const [activeTab, setActiveTab] = useState('Approved');
    const [members, setMembers] = useState({
        Approved: [],
        Pending: [],
        Rejected: []
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    
    // Modal states
    const [isCodeModalVisible, setIsCodeModalVisible] = useState(false);
    const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
    
    // Form states
    const [memberCode, setMemberCode] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    
    useEffect(() => {
        fetchMembers(activeTab);
    }, [activeTab, clubCode]);

    const fetchMembers = async (status) => {
        try {
            showLoading('Đang tải danh sách thành viên...');
            const response = await clubService.getClubMembers(clubCode, status);
            if (response.success) {
                setMembers(prev => ({
                    ...prev,
                    [status]: response.data
                }));
                setIsAdmin(response.isAdmin);
            }
        } catch (error) {
            message.error(error.message || 'Không thể tải danh sách thành viên');
        } finally {
            hideLoading();
        }
    };

    const handleStatusUpdate = async (member, newStatus) => {
        try {
            showLoading('Đang cập nhật trạng thái...');
            await clubService.updateMemberStatus(member.club_member_id, newStatus, clubCode);
            message.success('Cập nhật trạng thái thành công');
            fetchMembers(activeTab);
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật trạng thái');
        } finally {
            hideLoading();
        }
    };

    const handleApprove = (member) => handleStatusUpdate(member, 'Approved');
    const handleReject = (member) => handleStatusUpdate(member, 'Rejected');
    
    // Modal handlers
    const handleShowRoleModal = (member) => {
        setEditingMember(member);
        setSelectedRole(member.role || 'Member');
        setIsRoleModalVisible(true);
    };
    
    const handleShowMemberCodeModal = (member) => {
        setEditingMember(member);
        setMemberCode(member.member_code || '');
        setIsCodeModalVisible(true);
    };
    
    // Update handlers
    const handleRoleUpdate = async () => {
        try {
            showLoading('Đang cập nhật vị trí...');
            await clubService.updateMemberRole(editingMember.club_member_id, selectedRole, clubCode);
            message.success('Cập nhật vị trí thành công');
            setIsRoleModalVisible(false);
            fetchMembers(activeTab);
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật vị trí');
        } finally {
            hideLoading();
        }
    };
    
    const handleMemberCodeUpdate = async () => {
        try {
            showLoading('Đang cập nhật mã thành viên...');
            await clubService.updateMemberCode(editingMember.club_member_id, memberCode, clubCode);
            message.success('Cập nhật mã thành viên thành công');
            setIsCodeModalVisible(false);
            fetchMembers(activeTab);
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật mã thành viên');
        } finally {
            hideLoading();
        }
    };
    
    const handleDelete = (member) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa thành viên này?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            okButtonProps: { danger: true },
            onOk: () => handleStatusUpdate(member, 'Rejected')
        });
    };

    return (
        <div className="member-list-container">
            <div className="tabs">
                <button 
                    className={`tab ${activeTab === 'Approved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('Approved')}
                >
                    Thành viên
                </button>
                {isAdmin && (
                    <>
                        <button 
                            className={`tab ${activeTab === 'Pending' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Pending')}
                        >
                            Chưa duyệt
                        </button>
                        <button 
                            className={`tab ${activeTab === 'Rejected' ? 'active' : ''}`}
                            onClick={() => setActiveTab('Rejected')}
                        >
                            Đã hủy
                        </button>
                    </>
                )}
            </div>

            <MemberStatusList
                members={members[activeTab]}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onApprove={handleApprove}
                onReject={handleReject}
                onShowRoleModal={handleShowRoleModal}
                onShowMemberCodeModal={handleShowMemberCodeModal}
                showApproveReject={activeTab === 'Pending'}
                emptyMessage={`Không có thành viên ${
                    activeTab === 'Pending' ? 'chờ duyệt' : 
                    activeTab === 'Approved' ? 'đã duyệt' : 'bị từ chối'
                }`}
            />

            {/* Member Code Modal */}
            <Modal
                title="Cập nhật mã thành viên"
                open={isCodeModalVisible}
                onOk={handleMemberCodeUpdate}
                onCancel={() => setIsCodeModalVisible(false)}
                okText="Cập nhật"
                cancelText="Hủy"
            >
                <p>Thành viên: {editingMember?.full_name}</p>
                <Input
                    placeholder="Nhập mã thành viên"
                    value={memberCode}
                    onChange={(e) => setMemberCode(e.target.value)}
                    style={{ marginTop: 16 }}
                />
            </Modal>

            {/* Role Modal */}
            <Modal
                title="Cập nhật vị trí thành viên"
                open={isRoleModalVisible}
                onOk={handleRoleUpdate}
                onCancel={() => setIsRoleModalVisible(false)}
                okText="Cập nhật"
                cancelText="Hủy"
            >
                <p>Thành viên: {editingMember?.full_name}</p>
                <Select
                    value={selectedRole}
                    onChange={setSelectedRole}
                    style={{ width: '100%', marginTop: 16 }}
                >
                    <Option value="Member">Thành viên</Option>
                    <Option value="Manager">Quản lý</Option>
                    <Option value="Finance">Tài chính</Option>
                </Select>
            </Modal>
        </div>
    );
};

export default MemberList;