import axios from 'axios';

const API_URL = 'http://localhost:5000/profile';

class ProfileService {
    static async getProfile() {
        try {
            const response = await axios.get(`${API_URL}/me`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi kết nối đến server' };
        }
    }


    static async updateProfile(profileData) {
        try {
            const response = await axios.patch(`${API_URL}/me`, profileData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi cập nhật thông tin' };
        }
    }

    static async updateAvatar(formData) {
        try {
            const response = await axios.patch(
                `${API_URL}/me/avatar`,
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi cập nhật avatar' };
        }
    }
};


export default ProfileService;
