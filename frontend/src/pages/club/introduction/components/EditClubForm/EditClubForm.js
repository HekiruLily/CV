import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import addressService from '../../../../../config/address.config';
import clubService from '../../../../../services/club.service';
import { useGlobal } from '../../../../../contexts/GlobalContext';

const EditClubForm = ({ visible, onClose, clubInfo, onUpdate }) => {
    const { showLoading, hideLoading } = useGlobal();
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        form.setFieldsValue(clubInfo);
        fetchProvinces();
    }, [clubInfo]);

    const fetchProvinces = async () => {
        try {
            setLoadingProvinces(true);
            const data = await addressService.getProvinces();
            setProvinces(data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách tỉnh/thành phố');
        } finally {
            setLoadingProvinces(false);
        }
    };

    const handleProvinceChange = async (provinceId) => {
        try {
            form.setFieldsValue({ district: undefined });
            setLoadingDistricts(true);
            const data = await addressService.getDistricts(provinceId);
            setDistricts(data);
        } catch (error) {
            message.error('Lỗi khi tải danh sách quận/huyện');
        } finally {
            setLoadingDistricts(false);
        }
    };

    const convertImageToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleFinish = async (values) => {
        showLoading("Đang cập nhật...");
    
        try {
            let avatarBase64 = "";
            if (values.clubImage && values.clubImage.length > 0) {
                avatarBase64 = await convertImageToBase64(values.clubImage[0].originFileObj);
            }
    
            // Tìm tên tỉnh/thành và quận/huyện từ ID
            const provinceName = provinces.find(p => String(p.value) === String(values.province))?.label || "";
            const districtName = districts.find(d => String(d.value) === String(values.district))?.label || "";
    
            const updateData = {
                club_name: values.name,
                description: values.description,
                province: provinceName,  
                district: districtName,  
                location: values.location,
                avatar: avatarBase64 
            };
    
            const response = await clubService.updateClub(clubInfo.club_id, updateData);
    
            if (response.success) {
                message.success("Cập nhật thành công!");
                onUpdate(); // Load lại thông tin mới từ API
                onClose(); // Đóng modal sau khi cập nhật xong
            } else {
                message.error(response.message || "Cập nhật thất bại");
            }
        } catch (error) {
            message.error(error.message || "Lỗi khi cập nhật");
        } finally {
            hideLoading();
        }
    };
    
    
    

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    return (
        <Modal
            title="Chỉnh sửa thông tin câu lạc bộ"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item name="name" label="Tên câu lạc bộ" rules={[{ required: true }]}> 
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Mô tả câu lạc bộ">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item name="province" label="Tỉnh/Thành phố">
                    <Select 
                        options={provinces} 
                        onChange={handleProvinceChange} 
                        loading={loadingProvinces} 
                    />
                </Form.Item>
                <Form.Item name="district" label="Quận/Huyện">
                    <Select 
                        options={districts} 
                        loading={loadingDistricts} 
                        disabled={!form.getFieldValue('province')} 
                    />
                </Form.Item>
                <Form.Item name="location" label="Địa điểm">
                    <Input placeholder="Nhập địa điểm cụ thể" />
                </Form.Item>
                <Form.Item
                    name="clubImage"
                    label="Ảnh câu lạc bộ"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload.Dragger
                        name="files"
                        listType="picture"
                        maxCount={1}
                        fileList={fileList}
                        beforeUpload={() => false}
                        onChange={({ fileList }) => setFileList(fileList)}
                    >
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">Kéo thả hoặc click để chọn ảnh</p>
                        <p className="ant-upload-hint">Chỉ chọn 1 ảnh</p>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Cập nhật</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditClubForm;
