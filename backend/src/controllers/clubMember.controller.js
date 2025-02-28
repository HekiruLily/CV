const ClubMemberModel = require('../models/clubMember.model');

exports.getMembers = async (req, res) => {
    try {
        const { clubCode } = req.params;
        let { status = 'Approved' } = req.query;

        // Validate status
        const validStatuses = ['Pending', 'Approved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ'
            });
        }

        // Lấy vai trò của user trong câu lạc bộ
        const userRole = await ClubMemberModel.checkMemberRole(req.user.userId, clubCode);

        if (!userRole) {
            return res.status(403).json({
                success: false,
                message: 'Bạn không phải thành viên của câu lạc bộ'
            });
        }

        // Nếu user chỉ là "Member", họ chỉ có thể xem danh sách "Approved"
        if (userRole === 'Member' && status !== 'Approved') {
            return res.status(403).json({
                success: false,
                message: 'Bạn không có quyền xem danh sách này'
            });
        }
        // Truy vấn danh sách thành viên theo trạng thái
        const members = await ClubMemberModel.getMembersByStatus(clubCode, status);
        console.log(members);
        res.json({
            success: true,
            data: members,
            isAdmin: ['Admin', 'Manager'].includes(userRole)
        });

    } catch (error) {
        console.error('Get members error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách thành viên'
        });
    }
};


exports.updateMemberStatus = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { status, clubCode } = req.body;

        // Validate status
        const validStatuses = ['Approved', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ'
            });
        }

        // Kiểm tra quyền cập nhật
        const userRole = await ClubMemberModel.checkMemberRole(req.user.userId, clubCode);
        if (!userRole || !['Admin', 'Manager'].includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Không có quyền cập nhật'
            });
        }

        const updated = await ClubMemberModel.updateMemberStatus(memberId, status);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thành viên'
            });
        }

        res.json({
            success: true,
            message: 'Cập nhật trạng thái thành công'
        });

    } catch (error) {
        console.error('Update member status error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật trạng thái thành viên'
        });
    }
};

exports.updateMemberRole = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { role, clubCode } = req.body;

        // Validate role
        const validRoles = ['Member', 'Manager', 'Finance'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Vị trí không hợp lệ'
            });
        }

        // Kiểm tra quyền cập nhật
        const userRole = await ClubMemberModel.checkMemberRole(req.user.userId, clubCode);
        if (!userRole || !['Admin', 'Manager'].includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Không có quyền cập nhật'
            });
        }

        const updated = await ClubMemberModel.updateMemberRole(memberId, role);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thành viên'
            });
        }

        res.json({
            success: true,
            message: 'Cập nhật vị trí thành công'
        });

    } catch (error) {
        console.error('Update member role error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật vị trí thành viên'
        });
    }
};


exports.updateMemberCode = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { newMemberCode, clubCode } = req.body;

        // Lấy ID CLB từ club_code
        const clubId = await ClubMemberModel.getClubIdByCode(clubCode);
        if (!clubId) {
            return res.status(404).json({ success: false, message: "Câu lạc bộ không tồn tại" });
        }

        // Kiểm tra quyền Admin
        const userRole = await ClubMemberModel.checkMemberRole(req.user.userId, clubCode);
        if (userRole !== 'Admin') {
            return res.status(403).json({ success: false, message: "Bạn không có quyền cập nhật" });
        }

        // Cập nhật member_code
        const result = await ClubMemberModel.updateMemberCode(memberId, newMemberCode, clubId);
        if (!result.success) {
            return res.status(400).json({ success: false, message: result.message });
        }

        res.json({ success: true, message: "Cập nhật member_code thành công" });
    } catch (error) {
        console.error("Update member_code error:", error);
        res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi cập nhật" });
    }
};