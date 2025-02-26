import axios from 'axios';
const API_URL = 'http://localhost:5000';

const clubService = {
    // Lấy danh sách yêu cầu tạo CLB theo trạng thái
    getCreateClubRequests: async (status) => {
        try {
            console.log('API URL:', process.env.REACT_APP_API_URL);
            const response = await axios.get(API_URL + '/clubs/create-club-requests', {
                params: { status }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi lấy danh sách yêu cầu tạo CLB'
            };
        }
    },

    // Phê duyệt yêu cầu tạo CLB mới
    approveClubRequest: async (requestId) => {
        try {
            const response = await axios.post(API_URL + '/clubs/request/approve', {
                request_id: requestId
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi phê duyệt yêu cầu'
            };
        }
    },

    // Từ chối yêu cầu
    rejectClubRequest: async (requestId, rejectReason) => {
        try {
            const response = await axios.post(API_URL + '/clubs/request/reject', {
                request_id: requestId,
                reject_reason: rejectReason
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi từ chối yêu cầu'
            };
        }
    }
};

export default clubService; 