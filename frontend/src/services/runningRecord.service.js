import axios from 'axios';

const API_URL = 'http://localhost:5001/profile/records';

const runningRecordService = {
    createRecord: async (recordData) => {
        try {
            const response = await axios.post(API_URL, recordData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi tạo thành tích' };
        }
    },

    updateRecord: async (recordId, recordData) => {
        try {
            const response = await axios.put(`${API_URL}/${recordId}`, recordData, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi cập nhật thành tích' };
        }
    },

    deleteRecord: async (recordId) => {
        try {
            console.log('recordId', recordId);
            const response = await axios.delete(`${API_URL}/${recordId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi xóa thành tích' };
        }
    }
};

export default runningRecordService; 