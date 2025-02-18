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