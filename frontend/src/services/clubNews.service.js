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
}

export default ClubNewsService; 