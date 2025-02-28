import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const clubService = {
    // Lấy danh sách yêu cầu tạo CLB theo trạng thái
    getCreateClubRequests: async (status) => {
        try {
            console.log('API URL:', API_URL);
            const response = await axios.get(`${API_URL}/clubs/create-club-requests`, {
                params: { status }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi API getCreateClubRequests:", error.response?.data || error.message);
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi lấy danh sách yêu cầu tạo CLB'
            };
        }
    },

    // Phê duyệt yêu cầu tạo CLB mới
    approveClubRequest: async (requestId) => {
        try {
            console.log('Gửi yêu cầu duyệt tới API với ID:', requestId);
            const response = await axios.post(`${API_URL}/clubs/request/approve`, {
                request_id: requestId
            });

            console.log('Phản hồi từ server:', response.data);
            return response.data;
        } catch (error) {
            console.error('Lỗi từ API approveClubRequest:', error.response?.data || error.message);
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi phê duyệt yêu cầu'
            };
        }
    },

    // Từ chối yêu cầu
    rejectClubRequest: async (requestId, rejectReason) => {
        try {
            console.log(`Từ chối yêu cầu với ID: ${requestId}, Lý do: ${rejectReason}`);
            const response = await axios.post(`${API_URL}/clubs/request/reject`, {
                request_id: requestId,
                reject_reason: rejectReason
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi từ API rejectClubRequest:', error.response?.data || error.message);
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi từ chối yêu cầu'
            };
        }
    },

    // Tìm kiếm yêu cầu
    searchClubRequests: async (club_code, status) => {
        try {
            console.log("Gọi API tìm kiếm với club_code:", club_code, "và status:", status);
            const response = await axios.get(`${API_URL}/clubs/search-club-requests`, {
                params: { club_code, status }
            });
            console.log("Kết quả tìm kiếm:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi API tìm kiếm searchClubRequests:", error.response?.data || error.message);
            throw error.response?.data || {
                success: false,
                message: 'Có lỗi xảy ra khi tìm kiếm yêu cầu tạo CLB'
            };
        }
    },



};

export default clubService;
