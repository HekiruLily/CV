const db = require('../configs/database');

class TournamentModel {
    static async getAll() {
        try {
            const [rows] = await db.promise().query(
                `SELECT * FROM tournaments 
                WHERE tournament_status != 'Completed'
                ORDER BY tournament_start_date ASC`
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(tournamentId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM tournaments WHERE tournament_id = ?',
                [tournamentId]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getByCode(tournamentCode) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM tournaments WHERE tournament_code = ?',
                [tournamentCode]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(tournamentData) {
        const conn = await db.promise();
        try {
            await conn.beginTransaction();

            const [result] = await conn.query(
                `INSERT INTO tournaments (
                    tournament_code,
                    tournament_name,
                    tournament_description,
                    tournament_start_date,
                    tournament_end_date,
                    tournament_location,
                    tournament_status,
                    tournament_prize_pool,
                    tournament_registration_deadline,
                    tournament_rules
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    tournamentData.code,
                    tournamentData.name,
                    tournamentData.description,
                    tournamentData.start_date,
                    tournamentData.end_date,
                    tournamentData.location,
                    tournamentData.status || 'Pending',
                    tournamentData.prize_pool,
                    tournamentData.registration_deadline,
                    tournamentData.rules
                ]
            );

            await conn.commit();
            return result.insertId;
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }

    static async update(tournamentId, tournamentData) {
        try {
            const [result] = await db.promise().query(
                `UPDATE tournaments 
                SET tournament_name = ?,
                    tournament_description = ?,
                    tournament_start_date = ?,
                    tournament_end_date = ?,
                    tournament_location = ?,
                    tournament_status = ?,
                    tournament_prize_pool = ?,
                    tournament_registration_deadline = ?,
                    tournament_rules = ?
                WHERE tournament_id = ?`,
                [
                    tournamentData.name,
                    tournamentData.description,
                    tournamentData.start_date,
                    tournamentData.end_date,
                    tournamentData.location,
                    tournamentData.status,
                    tournamentData.prize_pool,
                    tournamentData.registration_deadline,
                    tournamentData.rules,
                    tournamentId
                ]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(tournamentId) {
        try {
            const [result] = await db.promise().query(
                'DELETE FROM tournaments WHERE tournament_id = ?',
                [tournamentId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getTournamentYears(tournamentId) {
        try {
            const [tournament] = await db.promise().query(
                'SELECT tournament_start_date, tournament_end_date FROM tournaments WHERE tournament_id = ?',
                [tournamentId]
            );
            
            if (!tournament[0]) return [];

            const startYear = new Date(tournament[0].tournament_start_date).getFullYear();
            const endYear = new Date(tournament[0].tournament_end_date).getFullYear();
            
            const years = [];
            for (let year = startYear; year <= endYear; year++) {
                years.push(year);
            }
            
            return years.sort((a, b) => b - a); // Sắp xếp giảm dần
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TournamentModel; 