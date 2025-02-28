import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/clubs';

class ClubNewsService {
    static async getClubNews(clubCode, page = 1, limit = 10) {
        try {
            const response = await axios.get(`${API_URL}/${clubCode}/news`, {
                params: { page, limit },
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy tin tức câu lạc bộ' };
        }
    }

    static async getNewsDetail(clubCode, newsId) {
        try {
            const response = await axios.get(`${API_URL}/${clubCode}/news/${newsId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy chi tiết bài viết' };
        }
    }

    static async createNews(clubCode, newsData) {
        try {
            const formData = new FormData();
            Object.keys(newsData).forEach(key => {
                if (key === 'image' && newsData[key]) {
                    formData.append('image', newsData[key]);
                } else {
                    formData.append(key, newsData[key]);
                }
            });

            const response = await axios.post(`${API_URL}/${clubCode}/news`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi tạo bài viết' };
        }
    }

    static async addReaction(clubCode, newsId, reactionType) {
        try {
            const response = await axios.post(
                `${API_URL}/${clubCode}/news/${newsId}/reactions`,
                { reaction_type: reactionType },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi thêm cảm xúc' };
        }
    }

    static async removeReaction(clubCode, newsId) {
        try {
            const response = await axios.delete(
                `${API_URL}/${clubCode}/news/${newsId}/reactions`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi xóa cảm xúc' };
        }
    }

    // Lấy danh sách cảm xúc của bài viết
    static async getReactions(clubCode, newsId) {
        try {
            const response = await axios.get(
                `${API_URL}/${clubCode}/news/${newsId}/reactions`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy danh sách cảm xúc' };
        }
    }

    // Kiểm tra cảm xúc của người dùng
    static async checkReaction(clubCode, newsId) {
        try {
            const response = await axios.get(
                `${API_URL}/${clubCode}/news/${newsId}/reactions/check`,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi kiểm tra cảm xúc' };
        }
    }

    static async getComments(clubCode, newsId, page = 1, limit = 10) {
        try {
            const response = await axios.get(
                `${API_URL}/${clubCode}/news/${newsId}/comments`,
                {
                    params: { page, limit },
                    withCredentials: true
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy bình luận' };
        }
    }

    static async createComment(clubCode, newsId, comment) {
        try {
            const response = await axios.post(
                `${API_URL}/${clubCode}/news/${newsId}/comments`,
                { comment },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi thêm bình luận' };
        }
    }
}

export default ClubNewsService; 