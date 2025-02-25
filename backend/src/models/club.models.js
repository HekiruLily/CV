const db = require('../configs/database');

class ClubModel {
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

// Xóa CLB
static async deleteClubById(clubId) {
    try {
        await db.promise().beginTransaction();

        // Xóa tất cả thành viên khỏi CLB
        await db.promise().query(`DELETE FROM club_members WHERE club_id = ?`, [clubId]);

        // Xóa CLB
        const [result] = await db.promise().query(`DELETE FROM clubs WHERE club_id = ?`, [clubId]);

        await db.promise().commit();
        return result.affectedRows > 0;
    } catch (error) {
        await db.promise().rollback();
        throw error;
    }
}


}
