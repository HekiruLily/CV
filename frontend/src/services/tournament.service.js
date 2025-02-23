import axios from 'axios';

const API_URL = 'http://localhost:5000/tournaments';

class TournamentService {
    static async getAllTournaments() {
        try {
            const response = await axios.get(API_URL, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy danh sách giải đấu' };
        }
    }

    static async getTournamentById(tournamentId) {
        try {
            const response = await axios.get(`${API_URL}/${tournamentId}`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy thông tin giải đấu' };
        }
    }

    static async getTournamentYears(tournamentId) {
        try {
            const response = await axios.get(`${API_URL}/${tournamentId}/years`, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Lỗi khi lấy danh sách năm của giải đấu' };
        }
    }
}

export default TournamentService; 