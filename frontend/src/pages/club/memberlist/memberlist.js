import React, { useState, useEffect } from 'react';
import { message, Modal, Select, Input } from 'antd';
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
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState('');
    const [newMemberCode, setNewMemberCode] = useState('');
    const [modalType, setModalType] = useState('');
    
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

    const handleUpdateMemberCode = async () => {
        if (!newMemberCode) {
            message.error('Vui lòng nhập mã thành viên mới');
            return;
        }
        try {
            showLoading('Đang cập nhật mã thành viên...');
            await clubService.updateMemberCode(editingMember.club_member_id, newMemberCode, clubCode);
            message.success('Cập nhật mã thành viên thành công');
            setIsEditModalVisible(false);
            fetchMembers(activeTab);
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật mã thành viên');
        } finally {
            hideLoading();
        }
    };

    const handleUpdateMemberRole = async () => {
        try {
            showLoading('Đang cập nhật vị trí thành viên...');
            await clubService.updateMemberRole(editingMember.club_member_id, selectedRole, clubCode);
            message.success('Cập nhật vị trí thành viên thành công');
            setIsEditModalVisible(false);
            fetchMembers(activeTab);
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật vị trí thành viên');
        } finally {
            hideLoading();
        }
    };

    const handleEdit = (member, type) => {
        setEditingMember(member);
        setSelectedRole(member.role);
        setNewMemberCode(member.member_code);
        setModalType(type);
        setIsEditModalVisible(true);
    };

    return (
        <div className="member-list-container">
            <MemberStatusList
                members={members[activeTab]}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                emptyMessage={`Không có thành viên ${
                    activeTab === 'Pending' ? 'chờ duyệt' : 
                    activeTab === 'Approved' ? 'đã duyệt' : 'bị từ chối'
                }`}
            />

            <Modal
                title={modalType === 'code' ? "Cập nhật mã thành viên" : "Cập nhật vị trí thành viên"}
                open={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                onOk={modalType === 'code' ? handleUpdateMemberCode : handleUpdateMemberRole}
            >
                <p>Thành viên: {editingMember?.full_name}</p>
                {modalType === 'code' ? (
                    <Input
                        value={newMemberCode}
                        onChange={(e) => setNewMemberCode(e.target.value)}
                        style={{ width: '100%' }}
                        placeholder="Nhập mã thành viên mới"
                    />
                ) : (
                    <Select
                        value={selectedRole}
                        onChange={setSelectedRole}
                        style={{ width: '100%' }}
                    >
                        <Option value="Member">Thành viên</Option>
                        <Option value="Manager">Quản lý</Option>
                        <Option value="Finance">Tài chính</Option>
                    </Select>
                )}
            </Modal>
        </div>
    );
};

export default MemberList;
