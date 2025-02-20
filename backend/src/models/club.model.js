const db = require('../configs/database');

class ClubModel {
    static async getUserClubs(userId) {
        const [rows] = await db.promise().query(
            `SELECT 
                c.club_id,
                c.club_code,
                c.name,
                c.description,
                c.location,
                c.avatar,
                c.created_at,
                cm.role,
                cm.status,
                cm.joined_at,
                cm.is_active,
                (SELECT COUNT(*) FROM club_members WHERE club_id = c.club_id AND status = 'Approved') as member_count
            FROM clubs c
            INNER JOIN club_members cm ON c.club_id = cm.club_id
            WHERE cm.user_id = ? AND cm.status = 'Approved'
            ORDER BY cm.joined_at DESC`,
            [userId]
        );
        return rows;
    }

    static async createClubRequest(requestData) {
        const [result] = await db.promise().query(
            `INSERT INTO club_requests 
            (requested_by, club_code, club_name, description, province, district, location, avatar) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                requestData.requested_by,
                requestData.club_code,
                requestData.club_name,
                requestData.description,
                requestData.province,
                requestData.district, 
                requestData.location,
                requestData.avatar
            ]
        );
        return result.insertId;
    }
}

module.exports = ClubModel; 