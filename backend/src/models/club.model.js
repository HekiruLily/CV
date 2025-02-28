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
            WHERE cm.user_id = ? AND cm.status = 'Approved' OR cm.status = 'Pending'
            ORDER BY cm.joined_at ASC`,
            [userId]
        );
        return rows;
    }

    static async createClubRequest(requestData) {
        const [result] = await db.promise().query(
            `INSERT INTO club_requests (requested_by, club_code, club_name, description, province, district, location, avatar) 
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

    static async getClubByCode(clubCode) {
        const [rows] = await db.promise().query(
            `SELECT 
                c.*,
                u.email as creator_email,
                up.full_name as creator_name,
                (SELECT COUNT(*) FROM club_members WHERE club_id = c.club_id AND status = 'Approved') as member_count
            FROM clubs c
            LEFT JOIN users u ON c.created_by = u.user_id
            LEFT JOIN user_profiles up ON u.user_id = up.user_id
            WHERE c.club_code = ?`,
            [clubCode]
        );
        return rows[0];
    }

    static async getClubMembers(clubId) {
        const [rows] = await db.promise().query(
            `SELECT 
                cm.role,
                cm.status,
                cm.joined_at,
                u.user_id,
                up.full_name,
                up.avatar
            FROM club_members cm
            INNER JOIN users u ON cm.user_id = u.user_id
            INNER JOIN user_profiles up ON u.user_id = up.user_id
            WHERE cm.club_id = ? AND cm.status = 'Approved'
            ORDER BY cm.role = 'Admin' DESC, cm.joined_at ASC`,
            [clubId]
        );
        return rows;
    }

    static async joinClub(userId, clubCode) {
        try {
            // Bước 1: Kiểm tra xem club có tồn tại không
            const [clubs] = await db.promise().query(
                'SELECT club_id FROM clubs WHERE club_code = ?',
                [clubCode]
            );
            
            if (clubs.length === 0) {
                throw new Error('Mã câu lạc bộ không tồn tại');
            }
            
            const clubId = clubs[0].club_id;
            
            // Bước 2: Kiểm tra xem người dùng đã là thành viên chưa
            const [members] = await db.promise().query(
                'SELECT * FROM club_members WHERE club_id = ? AND user_id = ?',
                [clubId, userId]
            );
            
            if (members.length > 0) {
                // Người dùng đã là thành viên hoặc đã gửi yêu cầu
                const status = members[0].status;
                if (status === 'Approved') {
                    throw new Error('Bạn đã là thành viên của câu lạc bộ này');
                } else if (status === 'Pending') {
                    throw new Error('Yêu cầu tham gia của bạn đang chờ phê duyệt');
                } else if (status === 'Rejected') {
                    // Cập nhật lại trạng thái thành Pending nếu trước đó bị từ chối
                    await db.promise().query(
                        'UPDATE club_members SET status = "Pending", requested_at = NOW() WHERE club_id = ? AND user_id = ?',
                        [clubId, userId]
                    );
                    return { clubId, status: 'Pending' };
                }
            }
            
            // Bước 3: Thêm người dùng vào club với trạng thái Pending
            await db.promise().query(
                `INSERT INTO club_members (club_id, user_id, role, status, joined_at) 
                 VALUES (?, ?, 'Member', 'Pending', NOW())`,
                [clubId, userId]
            );
            
            return { clubId, status: 'Pending' };
        } catch (error) {
            throw error;
        }
    }

    static async getClubBasicInfo(clubCode) {
        const [rows] = await db.promise().query(
            `SELECT 
                club_id, 
                club_code,
                name, 
                avatar, 
                description,
                province,
                (SELECT COUNT(*) FROM club_members WHERE club_id = clubs.club_id AND status = 'Approved') as member_count
            FROM clubs 
            WHERE club_code = ?`,
            [clubCode]
        );
        return rows[0];
    }

    static async updateClubInfo(clubId, updateData) {
        try {
            // Check if club exists
            const [clubs] = await db.promise().query(
                'SELECT * FROM clubs WHERE club_id = ?',
                [clubId]
            );
            
            if (clubs.length === 0) {
                throw new Error('Câu lạc bộ không tồn tại');
            }
            
            // Check if club_code is being updated and if it's unique
            if (updateData.club_code) {
                const [existingClubs] = await db.promise().query(
                    'SELECT * FROM clubs WHERE club_code = ? AND club_id != ?',
                    [updateData.club_code, clubId]
                );
                
                if (existingClubs.length > 0) {
                    throw new Error('Mã câu lạc bộ đã tồn tại');
                }
            }
            
            // Build the update query dynamically based on provided fields
            const allowedFields = ['club_code', 'name', 'description', 'province', 'district', 'location', 'facebook_url', 'instagram_url', 'youtube_channel_url'];
            const updates = [];
            const values = [];
            
            for (const field of allowedFields) {
                if (updateData[field] !== undefined) {
                    updates.push(`${field} = ?`);
                    values.push(updateData[field]);
                }
            }
            
            if (updates.length === 0) {
                throw new Error('Không có thông tin nào được cập nhật');
            }
            
            // Add club_id to values array for WHERE clause
            values.push(clubId);
            
            // Execute the update query
            await db.promise().query(
                `UPDATE clubs SET ${updates.join(', ')} WHERE club_id = ?`,
                values
            );
            
            // Return updated club info
            const [updatedClub] = await db.promise().query(
                'SELECT * FROM clubs WHERE club_id = ?',
                [clubId]
            );
            
            return updatedClub[0];
        } catch (error) {
            throw error;
        }
    }

    static async updateClubInfoWithPermissionCheck(clubId, userId, updateData) {
        try {
            // Verify if the user has permission to update the club
            // First, check if the club exists and if the user is an admin of the club
            const [clubMembers] = await db.promise().query(
                `SELECT * FROM club_members 
                WHERE club_id = ? AND user_id = ? AND role = 'Admin' AND status = 'Approved'`,
                [clubId, userId]
            );
            
            if (clubMembers.length === 0) {
                const error = new Error('Bạn không có quyền cập nhật thông tin câu lạc bộ này');
                error.statusCode = 403;
                throw error;
            }
            
            // If permission check passes, proceed with the update
            return await this.updateClubInfo(clubId, updateData);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClubModel; 