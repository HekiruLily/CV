const db = require('../configs/database');

class ClubMemberModel {
    static async getMembersByStatus(clubCode, status) {
        try {
            const [rows] = await db.promise().query(
                `SELECT 
                    cm.club_member_id,
                    cm.member_code,
                    cm.user_id,
                    cm.role,
                    cm.status,
                    cm.joined_at,
                    u.email,
                    u.phone,
                    up.full_name,
                    up.avatar
                FROM club_members cm
                JOIN clubs c ON cm.club_id = c.club_id
                JOIN users u ON cm.user_id = u.user_id
                JOIN user_profiles up ON u.user_id = up.user_id
                WHERE c.club_code = ? AND cm.status = ? AND cm.is_active = true`,
                [clubCode, status]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async updateMemberStatus(clubMemberId, status) {
        try {
            const [result] = await db.promise().query(
                'UPDATE club_members SET status = ? WHERE club_member_id = ?',
                [status, clubMemberId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async checkMemberRole(userId, clubCode) {
        try {
            const [rows] = await db.promise().query(
                `SELECT cm.role 
                FROM club_members cm
                JOIN clubs c ON cm.club_id = c.club_id
                WHERE cm.user_id = ? AND c.club_code = ? AND cm.is_active = true`,
                [userId, clubCode]
            );
            return rows[0]?.role || null;
        } catch (error) {
            throw error;
        }
    }

    static async getClubIdByCode(clubCode) {
        try {
            const [rows] = await db.promise().query(
                'SELECT club_id FROM clubs WHERE club_code = ?',
                [clubCode]
            );
            return rows[0]?.club_id;
        } catch (error) {
            throw error;
        }
    }

    static async updateMemberRole(memberId, role) {
        try {
            const [result] = await db.promise().query(
                'UPDATE club_members SET role = ? WHERE club_member_id = ?',
                [role, memberId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async updateMemberCode(memberId, newMemberCode, clubId) {
        try {
            // Kiểm tra xem member_code có trùng không
            const [existing] = await db.promise().query(
                'SELECT COUNT(*) AS count FROM club_members WHERE member_code = ? AND club_id = ?',
                [newMemberCode, clubId]
            );

            if (existing[0].count > 0) {
                return { success: false, message: "Member code đã tồn tại" };
            }

            const [result] = await db.promise().query(
                'UPDATE club_members SET member_code = ? WHERE club_member_id = ?',
                [newMemberCode, memberId]
            );

            return { success: result.affectedRows > 0 };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClubMemberModel; 