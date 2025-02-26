const db = require('../config/database');

class ClubModel {
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

static async getCreateClubRequests(status) {
    const [rows] = await db.promise().query(
        `SELECT 
            cr.request_id,
            cr.club_code,
            cr.club_name,
            cr.description,
            cr.province,
            cr.district,
            cr.location,
            cr.status,
            cr.reject_reason,
            cr.avatar as club_avatar,
            cr.requested_at,
            u.user_id,
            u.email,
            up.full_name,
            up.avatar as user_avatar
        FROM club_requests cr
        JOIN users u ON cr.requested_by = u.user_id
        JOIN user_profiles up ON u.user_id = up.user_id
        WHERE cr.status = ?
        ORDER BY cr.requested_at DESC`,
        [status]
    );
    return rows;
}

// Phương thức từ chối yêu cầu tạo CLB
static async rejectClubRequest(requestId, rejectReason) {
    try {
        await db.promise().beginTransaction();

        // Kiểm tra yêu cầu có tồn tại và đang ở trạng thái Pending
        const [requestRows] = await db.promise().query(
            `SELECT * FROM club_requests WHERE request_id = ? AND status = 'Pending'`,
            [requestId]
        );

        if (requestRows.length === 0) {
            throw new Error('Không tìm thấy yêu cầu hoặc yêu cầu đã được xử lý');
        }

        // Cập nhật trạng thái và lý do từ chối
        const [result] = await db.promise().query(
            `UPDATE club_requests 
            SET status = 'Rejected',
                club_code = NULL,
                reject_reason = ?
            WHERE request_id = ?`,
            [rejectReason, requestId]
        );

        if (result.affectedRows === 0) {
            throw new Error('Không thể cập nhật trạng thái yêu cầu');
        }

        await db.promise().commit();
        return true;

    } catch (error) {
        await db.promise().rollback();
        throw error;
    }
}
}

module.exports = ClubModel;
