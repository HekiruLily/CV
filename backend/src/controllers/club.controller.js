const ClubModel = require('../models/club.model');

exports.getUserClubs = async (req, res) => {
    try {
        const userId = req.user.userId; // Lấy từ token đã decode trong auth middleware
        const clubs = await ClubModel.getUserClubs(userId);

        console.log(clubs);
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