import axios from 'axios';

const API_URL = 'http://localhost:5000/clubs';

const clubService = {
  getUserClubs: async () => {
    try {
      const response = await axios.get(`${API_URL}/user-clubs`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi kết nối đến server' };
    }
  },

  // Thêm các phương thức khác liên quan đến club ở đây
  createClub: async (clubData) => {
    try {
      const response = await axios.post(`${API_URL}/request`, clubData, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi kết nối đến server' };
    }
  },

  joinClub: async (clubCode) => {
    try {
      const response = await axios.post(`${API_URL}/join`, { clubCode }, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi kết nối đến server' };
    }
  },

  createClubRequest: async (clubData) => {
    try {
      const response = await axios.post(`${API_URL}/request`, {
        club_name: clubData.clubName,
        club_code: clubData.clubCode,
        description: clubData.description,
        province: clubData.province,
        district: clubData.district,
        location: clubData.ward, // Sử dụng ward làm location
        avatar: clubData.clubImage?.[0]?.thumbUrl || null
      }, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi kết nối đến server' };
    }
  },

  getClubIntroduction: async (clubCode) => {
    try {
      const response = await axios.get(`${API_URL}/${clubCode}/introduction`, {
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Lỗi kết nối đến server' };
    }
  },

  getClubMembers: async (clubCode, status = 'Approved') => {
    try {
      const response = await fetch(`${API_URL}/${clubCode}/members?status=${status}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response);

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateMemberStatus: async (memberId, status, clubCode) => {
    try {
      const response = await fetch(`${API_URL}/members/${memberId}/status`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status, clubCode })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateMemberRole: async (memberId, role, clubCode) => {
    try {
      const response = await fetch(`${API_URL}/members/${memberId}/role`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, clubCode })
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      return data;
    } catch (error) {
      throw error;
    }
  }
};

export default clubService; 