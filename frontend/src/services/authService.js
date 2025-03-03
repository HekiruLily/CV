import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/auth';

const authService = {

  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        mail: credentials.email,
        password: credentials.password
      }, {
        withCredentials: true
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Login service error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Lỗi kết nối đến server');
    }
  },

  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default authService; 