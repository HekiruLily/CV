import React, { useState } from 'react';
import { Form, Input, DatePicker, Select, message, Modal, Button } from 'antd';
// import moment from 'moment';
import ProfileService from '../../../../services/profile.service';
import './EditProfileModal.css';

const { Option } = Select;

const EditProfileModal = ({ visible, onClose, initialData, onSave }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const formattedData = {
                ...values,
                birth_date: values.birth_date?.format('YYYY-MM-DD')
            };

            const response = await ProfileService.updateProfile(formattedData);
            if (response.success) {
                message.success('Cập nhật thông tin thành công');
                onSave(formattedData);
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
            visible={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    ...initialData,
                    // birth_date: initialData.birth_date ? moment(initialData.birth_date) : null
                }}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name="full_name"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        { pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/, message: 'Số điện thoại không hợp lệ' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="birth_date"
                    label="Ngày sinh"
                >
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Giới tính"
                >
                    <Select>
                        <Option value="male">Nam</Option>
                        <Option value="female">Nữ</Option>
                        <Option value="other">Khác</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Địa chỉ"
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfileModal;