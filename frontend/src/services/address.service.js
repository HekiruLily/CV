import axios from 'axios';

const BASE_URL = 'https://esgoo.net/api-tinhthanh';

const addressService = {
  getProvinces: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/1/0.htm`);
      return response.data.data.map(province => ({
        value: province.id,
        label: province.name
      }));
    } catch (error) {
      console.error('Error fetching provinces:', error);
      throw new Error('Không thể lấy danh sách tỉnh thành');
    }
  },

  getDistricts: async (provinceId) => {
    try {
      const response = await axios.get(`${BASE_URL}/2/${provinceId}.htm`);
      return response.data.data.map(district => ({
        value: district.id,
        label: district.name
      }));
    } catch (error) {
      console.error('Error fetching districts:', error);
      throw new Error('Không thể lấy danh sách quận huyện');
    }
  }
};

export default addressService; 