const db = require('../configs/database');
const { deleteOldFile } = require('../utils/fileHelper');

class ProfileModel {
    static async getUserProfile(userId) {
        try {
            const [rows] = await db.promise().query(
                `SELECT 
                    up.email,
                    up.phone,
                    up.full_name,
                    up.birth_date,
                    up.gender,
                    up.address,
                    up.achievement,
                    up.avatar,
                    (
                        SELECT COUNT(*) 
                        FROM running_records 
                        WHERE user_id = up.user_id
                    ) as total_runs,
                    (
                        SELECT SUM(distance) 
                        FROM running_records 
                        WHERE user_id = up.user_id
                    ) as total_distance,
                    (
                        SELECT COUNT(DISTINCT club_id) 
                        FROM club_members 
                        WHERE user_id = up.user_id 
                        AND status = 'Approved'
                    ) as total_clubs
                FROM user_profiles up
                WHERE up.user_id = ?`,
                [userId]
            );

            // Lấy danh sách câu lạc bộ
            const [clubs] = await db.promise().query(
                `SELECT 
                    c.club_id,
                    c.club_code,
                    c.name as club_name,
                    c.avatar as club_avatar,
                    cm.role,
                    cm.joined_at
                FROM club_members cm
                JOIN clubs c ON cm.club_id = c.club_id
                WHERE cm.user_id = ? 
                AND cm.status = 'Approved'
                ORDER BY cm.joined_at DESC`,
                [userId]
            );

            // Lấy lịch sử chạy và tính pace
            const [runningRecords] = await db.promise().query(
                `SELECT 
                    record_id,
                    race_name,
                    race_year,
                    distance,
                    duration,
                    surface_type,
                    proof_image,
                    run_date,
                    created_at,
                    ROUND(duration / (distance * 60), 2) as pace
                FROM running_records
                WHERE user_id = ?
                ORDER BY run_date DESC
                LIMIT 10`,
                [userId]
            );

            return {
                ...rows[0],
                clubs,
                runningRecords
            };
        } catch (error) {
            throw error;
        }
    }

    static async updateProfile(userId, profileData) {
        const conn = await db.promise();
        try {
            await conn.beginTransaction();

            // Cập nhật user_profiles
            await conn.query(
                `UPDATE user_profiles 
                SET full_name = ?, email = ?, phone = ?, birth_date = ?, gender = ?, 
                    address = ?, achievement = ?
                WHERE user_id = ?`,
                [
                    profileData.full_name,
                    profileData.email,
                    profileData.phone,
                    profileData.birth_date,
                    profileData.gender,
                    profileData.address,
                    profileData.achievement,
                    userId
                ]
            );

            await conn.commit();
            return true;
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }

    static async updateAvatar(userId, avatarUrl) {
        try {
            // Lấy đường dẫn ảnh cũ
            const [rows] = await db.promise().query(
                'SELECT avatar FROM user_profiles WHERE user_id = ?',
                [userId]
            );

            const oldAvatar = rows[0]?.avatar;
            
            // Cập nhật ảnh mới trong DB
            const [result] = await db.promise().query(
                'UPDATE user_profiles SET avatar = ? WHERE user_id = ?',
                [avatarUrl, userId]
            );
            
            // Xóa ảnh cũ sau khi đã cập nhật thành công
            if (result.affectedRows > 0 && oldAvatar) {
                deleteOldFile(oldAvatar);
            }
            
            return result.affectedRows > 0;
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật avatar: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ProfileModel; 