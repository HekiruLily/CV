const ClubModel = require('../models/club.models');
const { format } = require('date-fns');
exports.getClubInfo = async (req, res) => {
    try {
        const { clubCode } = req.params;

        // Lấy thông tin cơ bản của club
        const clubInfo = await ClubModel.getClubByCode(clubCode);

        if (!clubInfo) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy câu lạc bộ'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lấy thông tin CLB thành công',
            data: clubInfo
        });
    } catch (error) {
        console.error('Get club info error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy thông tin CLB'
        });
    }
};

// Chấp thuận đơn xin CLB
exports.approveClubRequest = async (req, res) => {
    try {
        const { request_id } = req.body;
        if (!request_id) {
            return res.status(400).json({
                success: false,
                message: "Thiếu request_id"
            });
        }

        // Kiểm tra xem request có tồn tại không
        const existingRequest = await ClubModel.getClubRequestById(request_id);
        if (!existingRequest) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy yêu cầu tạo CLB"
            });
        }

        if (existingRequest.status !== 'Pending') {
            return res.status(400).json({
                success: false,
                message: `Đơn xin CLB đã được xử lý (${existingRequest.status})`
            });
        }

        // Chấp thuận đơn xin & tạo CLB
        const clubId = await ClubModel.approveClubRequest(request_id);
        if (!clubId) {
            return res.status(500).json({
                success: false,
                message: "Lỗi khi tạo CLB"
            });
        }

        // Lấy thông tin CLB vừa tạo
        const newClub = await ClubModel.getClubById(clubId);

        res.status(200).json({
            success: true,
            message: 'Chấp thuận đơn xin CLB thành công',
            data: newClub
        });
    } catch (error) {
        console.error('Lỗi khi chấp thuận đơn xin CLB:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi chấp thuận đơn xin CLB'
        });
    }
};

// Xóa CLBCLB
exports.deleteClub = async (req, res) => {
    try {
        const { clubId } = req.params;

        if (!clubId) {
            return res.status(400).json({
                success: false,
                message: "Thiếu clubId"
            });
        }

        // Kiểm tra xem CLB có tồn tại không
        const club = await ClubModel.getClubById(clubId);
        if (!club) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy CLB"
            });
        }

        // Thực hiện xóa CLB
        const deleted = await ClubModel.deleteClubById(clubId);

        if (deleted) {
            return res.status(200).json({
                success: true,
                message: "Xóa CLB thành công"
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Không thể xóa CLB"
            });
        }

    } catch (error) {
        console.error("Lỗi khi xóa CLB:", error);
        res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi xóa CLB"
        });
    }
};

exports.getCreateClubRequests = async (req, res) => {
    try {
        const { status } = req.query;
        // Validate status parameter
        if (!status || !['Pending', 'Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Trạng thái không hợp lệ. Chỉ chấp nhận: 'Pending', 'Approved', hoặc 'Rejected'"
            });
        }

        const requests = await ClubModel.getCreateClubRequests(status);
        const formattedRequests = requests.map(request => ({
            ...request,
            requested_at: format(request.requested_at, 'dd/mm/yyyy')
        }));
        res.status(200).json({
            success: true,
            message: `Lấy danh sách đơn xin tạo CLB (${status}) thành công`,
            data: formattedRequests
        });

    } catch (error) {
        console.error('Get create club requests error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách đơn xin tạo CLB'
        });
    }
};

// Từ chối yêu cầu tạo CLB
exports.rejectClubRequest = async (req, res) => {
    try {
        const { request_id, reject_reason = 'Bị từ chối' } = req.body;

        if (!request_id || !reject_reason) {
            return res.status(400).json({
                success: false,
                message: "Thiếu thông tin cần thiết (ID yêu cầu hoặc lý do từ chối)"
            });
        }

        // Kiểm tra yêu cầu có tồn tại không
        const existingRequest = await ClubModel.getClubRequestById(request_id);
        if (!existingRequest) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy yêu cầu tạo CLB"
            });
        }

        if (existingRequest.status !== 'Pending') {
            return res.status(400).json({
                success: false,
                message: `Đơn xin CLB đã được xử lý (${existingRequest.status})`
            });
        }

        // Thực hiện từ chối yêu cầu
        await ClubModel.rejectClubRequest(request_id, reject_reason);

        res.status(200).json({
            success: true,
            message: 'Từ chối yêu cầu tạo CLB thành công'
        });

    } catch (error) {
        console.error('Lỗi khi từ chối yêu cầu tạo CLB:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi từ chối yêu cầu tạo CLB'
        });
    }
};

//Tìm kiếm đơn xin CLB
exports.searchClubRequests = async (req, res) => {
    try {
        let { club_name, club_code } = req.query;

        // Chuẩn hóa dữ liệu đầu vào (xoá khoảng trắng & ký tự xuống dòng)
        club_name = club_name ? club_name.trim() : null;
        club_code = club_code ? club_code.trim() : null;

        // Kiểm tra nếu cả hai đều rỗng thì báo lỗi
        if (!club_name && !club_code) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng nhập club_name hoặc club_code để tìm kiếm"
            });
        }

        // Gọi model để tìm kiếm
        const results = await ClubModel.searchClubRequests({ club_name, club_code });

        res.status(200).json({
            success: true,
            message: results.length > 0 ? "Tìm kiếm đơn xin tạo CLB thành công" : "Không tìm thấy kết quả nào",
            data: results
        });

    } catch (error) {
        console.error('Lỗi khi tìm kiếm club_requests:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi tìm kiếm club_requests',
            error: error.message
        });
    }
};


