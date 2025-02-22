const db = require('../configs/database');

class RunningRecordModel {
    static async create(userId, recordData) {
        try {
            const [result] = await db.promise().query(
                `INSERT INTO running_records 
                (user_id, race_name, race_year, distance, duration, surface_type, run_date) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    userId,
                    recordData.race_name,
                    recordData.race_year,
                    recordData.distance,
                    recordData.duration,
                    recordData.surface_type,
                    recordData.run_date
                ]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(recordId, userId, recordData) {
        try {
            const [result] = await db.promise().query(
                `UPDATE running_records 
                SET distance = ?, duration = ?, 
                    surface_type = ?, run_date = ?
                WHERE record_id = ? AND user_id = ?`,
                [
                    recordData.distance,
                    recordData.duration,
                    recordData.surface_type,
                    recordData.run_date,
                    recordId,
                    userId
                ]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(recordId, userId) {
        try {
            const [result] = await db.promise().query(
                'DELETE FROM running_records WHERE record_id = ? AND user_id = ?',
                [recordId, userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getById(recordId, userId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT * FROM running_records WHERE record_id = ? AND user_id = ?',
                [recordId, userId]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = RunningRecordModel; 