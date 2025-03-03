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

// Lấy danh sách đơn xin CLB theo trạng thái
static async getClubRequestsByStatus(status) {
    const [rows] = await db.promise().query(
        `SELECT * FROM club_requests WHERE status = ? ORDER BY requested_at DESC`,
        [status]
    );
    return rows;
}

// Kiểm tra đơn xin CLB có tồn tại không
static async getClubRequestById(requestId) {
    const [rows] = await db.promise().query(
        `SELECT * FROM club_requests WHERE request_id = ?`,
        [requestId]
    );
    return rows.length > 0 ? rows[0] : null;
}

// Lấy thông tin CLB theo ID
static async getClubById(clubId) {
    const [rows] = await db.promise().query(
        `SELECT * FROM clubs WHERE club_id = ?`,
        [clubId]
    );
    return rows.length > 0 ? rows[0] : null;
}

// Chấp thuận đơn xin CLB và tạo CLB mới
static async approveClubRequest(requestId) {
    try {
        await db.promise().beginTransaction(); // 🔹 Bắt đầu transaction

        // Kiểm tra xem đơn xin có tồn tại và ở trạng thái "Pending"
        const [requestRows] = await db.promise().query(
            `SELECT * FROM club_requests WHERE request_id = ?`,
            [requestId]
        );

        if (requestRows.length === 0) {
            throw new Error('Không tìm thấy đơn xin CLB');
        }

        const clubData = requestRows[0];

        if (clubData.status !== 'Pending') {
            throw new Error(`Đơn xin CLB đã được xử lý (${clubData.status})`);
        }

        // Tạo CLB mới
        const [clubResult] = await db.promise().query(
            `INSERT INTO clubs (club_code, name, description, province, district, location, avatar, created_by, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [
                clubData.club_code, 
                clubData.club_name, 
                clubData.description, 
                clubData.province, 
                clubData.district, 
                clubData.location, 
                clubData.avatar, 
                clubData.requested_by  // Đảm bảo `requested_by` có giá trị hợp lệ
            ]
        );

        if (!clubResult.insertId) {
            throw new Error('Không thể tạo CLB, vui lòng thử lại');
        }

        const clubId = clubResult.insertId;

        // Cập nhật trạng thái đơn xin thành "Approved"
        await db.promise().query(
            `UPDATE club_requests SET status = 'Approved' WHERE request_id = ?`,
            [requestId]
        );

        // Kiểm tra trước khi thêm Admin vào CLB
        const [existingMember] = await db.promise().query(
            `SELECT * FROM club_members WHERE club_id = ? AND user_id = ?`,
            [clubId, clubData.requested_by]
        );

        if (existingMember.length > 0) {
            throw new Error('Người dùng đã là thành viên của CLB này');
        }

        // Thêm người tạo CLB vào `club_members` với vai trò "Admin"
        await db.promise().query(
            `INSERT INTO club_members (club_id, user_id, role, status, joined_at, is_active) 
            VALUES (?, ?, 'Admin', 'Approved', NOW(), 1)`,
            [clubId, clubData.requested_by]
        );

        await db.promise().commit(); 
        return clubId;
    } catch (error) {
        await db.promise().rollback(); 
        throw error;
    }
}

// Chỉnh sửa thông tin clb
static async updateClubInfo(clubId, updateData) {
    try {
        const [result] = await db.promise().query(
            `UPDATE clubs 
            SET name = ?, description = ?, province = ?, district = ?, location = ?, avatar = ? 
            WHERE club_id = ?`,
            [
                updateData.club_name,
                updateData.description,
                updateData.province,
                updateData.district,
                updateData.location,
                updateData.avatar,
                clubId
            ]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error('Database error (updateClubInfo):', error);
        return false;
    }
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