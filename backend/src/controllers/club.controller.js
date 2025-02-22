const ClubModel = require('../models/club.model');

exports.getUserClubs = async (req, res) => {
    try {
        const userId = req.user.userId; // Lấy từ token đã decode trong auth middleware
        const clubs = await ClubModel.getUserClubs(userId);

        res.status(200).json({
            success: true,
            message: 'Lấy danh sách CLB thành công',
            data: clubs
        });
    } catch (error) {
        console.error('Get user clubs error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách CLB'
        });
    }
};

exports.createClubRequest = async (req, res) => {
    try {
        const userId = req.user.userId; // Lấy từ token đã decode trong auth middleware
        
        const requestData = {
            requested_by: userId,
            club_code: req.body.club_code,
            club_name: req.body.club_name,
            description: req.body.description,
            province: req.body.province,
            district: req.body.district,
            location: req.body.location,
            avatar: req.body.avatar
        };

        // Validate dữ liệu
        if (!requestData.club_name || !requestData.location || !requestData.province ) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
            });
        }

        const requestId = await ClubModel.createClubRequest(requestData);

        res.status(201).json({
            success: true,
            message: 'Gửi yêu cầu tạo CLB thành công',
            data: { request_id: requestId }
        });

    } catch (error) {
        console.error('Create club request error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi gửi yêu cầu tạo CLB'
        });
    }
};


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

// Lấy danh sách đơn xin CLB theo trạng thái
exports.getClubRequestsByStatus = async (req, res) => {
    try {
        const { status } = req.query;
        if (!status || !['Pending', 'Approved'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Trạng thái không hợp lệ (chỉ hỗ trợ 'Pending' hoặc 'Approved')"
            });
        }

        const requests = await ClubModel.getClubRequestsByStatus(status);
        res.status(200).json({
            success: true,
            message: `Lấy danh sách đơn xin CLB (${status}) thành công`,
            data: requests
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn xin CLB:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách đơn xin CLB'
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
//Chỉnh sửa thông tin CLB
exports.updateClubInfo = async (req, res) => {
        try {
            const { club_id } = req.params; // Lấy ID CLB từ URL
            const userId = req.user.userId; // Lấy user_id từ token
    
            const updateData = {
                club_name: req.body.club_name,
                description: req.body.description,
                province: req.body.province,
                district: req.body.district,
                location: req.body.location,
                avatar: req.body.avatar
            };
    
            // Kiểm tra dữ liệu hợp lệ
            if (!club_id || !updateData.club_name || !updateData.location || !updateData.province) {
                return res.status(400).json({
                    success: false,
                    message: 'Vui lòng điền đầy đủ thông tin bắt buộc'
                });
            }
    
            // Kiểm tra quyền sửa CLB (chỉ admin mới được sửa)
            const club = await ClubModel.getClubById(club_id);
            if (!club) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy CLB'
                });
            }
    
            if (club.created_by !== userId) {
                return res.status(403).json({
                    success: false,
                    message: 'Bạn không có quyền chỉnh sửa CLB này'
                });
            }
    
            // Cập nhật thông tin CLB
            const success = await ClubModel.updateClubInfo(club_id, updateData);
            if (!success) {
                return res.status(500).json({
                    success: false,
                    message: 'Cập nhật CLB thất bại'
                });
            }
    
            res.status(200).json({
                success: true,
                message: 'Cập nhật thông tin CLB thành công'
            });
        } catch (error) {
            console.error('Update club info error:', error);
            res.status(500).json({
                success: false,
                message: 'Đã xảy ra lỗi khi cập nhật thông tin CLB'
            });
        }
    };
    