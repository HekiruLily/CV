import React, { useState, useEffect } from 'react';
import { Modal, Select, Input, Form } from 'antd';

const { Option } = Select;

const EditMemberModal = ({ 
    visible, 
    member, 
    onCancel, 
    onUpdateRole, 
    onUpdateMemberCode,
    isAdmin
}) => {
    const [editType, setEditType] = useState('role');
    const [selectedRole, setSelectedRole] = useState('');
    const [memberCode, setMemberCode] = useState('');
    const [form] = Form.useForm();

    useEffect(() => {
        if (member) {
            setSelectedRole(member.role || 'Member');
            setMemberCode(member.member_code || '');
            form.setFieldsValue({
                role: member.role || 'Member',
                memberCode: member.member_code || ''
            });
        }
    }, [member, form]);

    const handleSubmit = () => {
        if (editType === 'role') {
            onUpdateRole(selectedRole);
        } else {
            onUpdateMemberCode(memberCode);
        }
    };

    return (
        <Modal
            title="Cập nhật thông tin thành viên"
            open={visible}
            onOk={handleSubmit}
            onCancel={onCancel}
            okText="Cập nhật"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Thành viên">
                    <span>{member?.full_name}</span>
                </Form.Item>

                <Form.Item label="Loại chỉnh sửa" name="editType">
                    <Select 
                        value={editType} 
                        onChange={setEditType}
                        style={{ width: '100%' }}
                    >
                        <Option value="role">Cập nhật vị trí</Option>
                        {isAdmin && <Option value="memberCode">Cập nhật mã thành viên</Option>}
                    </Select>
                </Form.Item>

                {editType === 'role' ? (
                    <Form.Item label="Vị trí" name="role">
                        <Select
                            value={selectedRole}
                            onChange={setSelectedRole}
                            style={{ width: '100%' }}
                        >
                            <Option value="Member">Thành viên</Option>
                            <Option value="Manager">Quản lý</Option>
                            <Option value="Finance">Tài chính</Option>
                        </Select>
                    </Form.Item>
                ) : (
                    <Form.Item 
                        label="Mã thành viên" 
                        name="memberCode"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mã thành viên' }
                        ]}
                    >
                        <Input 
                            value={memberCode}
                            onChange={(e) => setMemberCode(e.target.value)}
                            placeholder="Nhập mã thành viên"
                        />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    );
};

export default EditMemberModal; 