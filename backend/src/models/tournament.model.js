const db = require("../config/database")

class TournamentModel {
    //  Lấy danh sách giải đấu (bỏ qua giải đấu đã hoàn thành)
    static async getAll() {
        try {
            const [rows] = await db.promise().query(
                `SELECT * FROM tournaments 
                WHERE tournament_status != 'Completed'
                ORDER BY tournament_start_date ASC`
            );
            return rows;
        } catch (error) {
            console.error("Error in getAll:", error);
            throw error;
        }
    }

    //  Lấy thông tin giải đấu theo ID
    static async getById(tournamentId) {
        try {
            const [rows] = await db.promise().query(
                "SELECT * FROM tournaments WHERE tournament_id = ?",
                [tournamentId]
            );
            return rows[0] || null;
        } catch (error) {
            console.error("Error in getById:", error);
            throw error;
        }
    }

    //  Lấy thông tin giải đấu theo mã giải đấu (tournament_code)
    static async getByCode(tournamentCode) {
        try {
            const [rows] = await db.promise().query(
                "SELECT * FROM tournaments WHERE tournament_code = ?",
                [tournamentCode]
            );
            return rows[0] || null;
        } catch (error) {
            console.error("Error in getByCode:", error);
            throw error;
        }
    }

    //  Tạo giải đấu (Sử dụng TRANSACTION)
    static async create(tournamentData) {
        const conn = db.promise();
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
                    tournament_rules,
                    tournament_link
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    tournamentData.code,
                    tournamentData.name,
                    tournamentData.description,
                    tournamentData.start_date,
                    tournamentData.end_date,
                    tournamentData.location,
                    tournamentData.status || "Pending",
                    tournamentData.prize_pool,
                    tournamentData.registration_deadline,
                    tournamentData.rules,
                    tournamentData.link
                ]
            );

            await conn.commit();
            return result.insertId;
        } catch (error) {
            await conn.rollback();
            console.error("Error in create:", error);
            throw error;
        }
    }

    // Cập nhật giải đấu
    static async update(tournamentId, tournamentData) {
        try {
            const [result] = await db.promise().query(
                "UPDATE tournaments SET ? WHERE tournament_id = ?",
                [tournamentData, tournamentId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }

    //  Xóa giải đấu
    static async delete(tournamentId) {
        try {
            const [result] = await db.promise().query(
                "DELETE FROM tournaments WHERE tournament_id = ?",
                [tournamentId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in delete:", error);
            throw error;
        }
    }

    // Lấy danh sách năm mà giải đấu diễn ra
    static async getTournamentYears(tournamentId) {
        try {
            const [rows] = await db.promise().query(
                "SELECT tournament_start_date, tournament_end_date FROM tournaments WHERE tournament_id = ?",
                [tournamentId]
            );

            if (!rows.length) return [];

            const startYear = new Date(rows[0].tournament_start_date).getFullYear();
            const endYear = new Date(rows[0].tournament_end_date).getFullYear();

            const years = [];
            for (let year = startYear; year <= endYear; year++) {
                years.push(year);
            }

            return years.sort((a, b) => b - a); // Sắp xếp giảm dần
        } catch (error) {
            console.error("Error in getTournamentYears:", error);
            throw error;
        }
    }
}

module.exports = TournamentModel;
