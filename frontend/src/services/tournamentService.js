import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/tournament' || 'http://localhost:5001/tournament';

class TournamentService {
    // Get all tournaments
    static async getAllTournaments() {
        try {
            const response = await axios.get(`${API_URL}/all-tournament`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get tournament by ID
    static async getTournamentById(id) {
        try {
            const response = await axios.get(`${API_URL}/get-tournament-by-id/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Create new tournament
    static async createTournament(tournamentData) {
        try {
            let formData;

            // Nếu dữ liệu chưa phải FormData, chuyển đổi
            if (tournamentData instanceof FormData) {
                formData = tournamentData;
            } else {
                formData = new FormData();
                Object.keys(tournamentData).forEach((key) => {
                    formData.append(key, tournamentData[key]);
                });
            }

            // ✅ Kiểm tra dữ liệu trước khi gửi
            console.log("Dữ liệu gửi lên backend:", Object.fromEntries(formData.entries()));

            // Gửi request lên backend
            const response = await axios.post(`${API_URL}/create-tournament`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",  // ✅ Đúng format cho ảnh
                    Accept: "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo giải đấu:", error.response ? error.response.data : error.message);
            throw error;
        }
    }


    // Update tournament
    static async updateTournament(tournamentId, tournamentData) {
        try {
            let formData;

            // Nếu dữ liệu đã là FormData thì giữ nguyên, nếu chưa thì chuyển đổi
            if (tournamentData instanceof FormData) {
                formData = tournamentData;
            } else {
                formData = new FormData();
                Object.entries(tournamentData).forEach(([key, value]) => formData.append(key, value));
            }

            // ✅ Log dữ liệu trước khi gửi để debug
            console.log("Dữ liệu cập nhật gửi lên backend:", Object.fromEntries(formData.entries()));

            // Gửi request lên backend để cập nhật giải đấu
            const response = await axios.put(`${API_URL}/update-tournament/${tournamentId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",  // ✅ Đúng format để gửi ảnh
                    Accept: "application/json",
                },
            });

            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhật giải đấu:", error.response ? error.response.data : error.message);
            throw error;
        }
    }


    // Delete tournament
    static async deleteTournament(id) {
        try {
            const response = await axios.delete(`${API_URL}/delete-tournament/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default TournamentService; 