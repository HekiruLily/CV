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
            const response = await axios.post(`${API_URL}/create-tournament`, tournamentData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update tournament
    static async updateTournament(id, tournamentData) {
        try {
            const response = await axios.put(`${API_URL}/update-tournament/${id}`, tournamentData);
            return response.data;
        } catch (error) {
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