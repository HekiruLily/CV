import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, Modal, Button } from 'antd';
import moment from 'moment';
import ProfileService from '../../../../services/profile.service';  
import './EditProfileModal.css';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../../redux/slices/userSlice';
import { App } from 'antd';

const { Option } = Select;

const EditProfileModal = ({ visible, onClose, initialData, onSave }) => {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Xử lý dữ liệu ban đầu
    const getInitialValues = () => {
        return {
            ...initialData,
            birth_date: initialData?.birth_date ? moment(initialData.birth_date, 'YYYY-MM-DD') : null,
            gender: initialData?.gender || undefined
        };
    };

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const formattedData = {
                ...values,
                birth_date: values.birth_date?.format('YYYY-MM-DD'),
                // Đảm bảo các trường không được gửi là null
                email: values.email || undefined,
                phone: values.phone || undefined,
                address: values.address || undefined,
                gender: values.gender || undefined
            };

            const response = await ProfileService.updateProfile(formattedData);
            if (response.success) {
                message.success('Cập nhật thông tin thành công');
                onSave(formattedData);
                dispatch(updateUserProfile(formattedData));
                onClose();
            }
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật thông tin');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa thông tin"
            open={visible}
            onCancel={onClose}
            footer={null}
            width={500}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={getInitialValues()}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="full_name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                    <Input placeholder="Nhập họ và tên" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                >
                    <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
                    ]}
                >
                    <Input placeholder="Nhập số điện thoại" />
                </Form.Item>

                <Form.Item
                    name="birth_date"
                    label="Ngày sinh"
                >
                    <DatePicker 
                        format="DD/MM/YYYY"
                        placeholder="Chọn ngày sinh"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Giới tính"
                >
                    <Select placeholder="Chọn giới tính">
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                >
                    <Input.TextArea 
                        placeholder="Nhập địa chỉ"
                        autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                </Form.Item>

                <Form.Item className="form-actions">
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Hủy
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfileModal;