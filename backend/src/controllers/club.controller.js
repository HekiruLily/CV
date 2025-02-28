const ClubModel = require('../models/club.model');
const { getUploadPath } = require('../middlewares/upload');
const db = require('../configs/database');

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
        const userId = req.user.userId;
        const requestData = {
            requested_by: userId,
            club_code: req.body.club_code,
            club_name: req.body.club_name,
            description: req.body.description,
            province: req.body.province,
            district: req.body.district,
            location: req.body.location,
            avatar: req.file ? getUploadPath(req.file.filename, 'club') : null
        };

        if (!requestData.club_name || !requestData.location || !requestData.province) {
            return res.status(400).json({ success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' });
        }

        const requestId = await ClubModel.createClubRequest(requestData);
        res.status(201).json({
            success: true,
            message: 'Gửi yêu cầu tạo CLB thành công',
            data: {
                request_id: requestId,
                avatarUrl: requestData.avatar
            }
        });

    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu:', error);
        res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi gửi yêu cầu tạo CLB' });
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

exports.joinClub = async (req, res) => {
    try {
        const { clubCode } = req.body;
        const userId = req.user.userId;
        
        if (!clubCode) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp mã câu lạc bộ'
            });
        }
        
        // Thực hiện tham gia câu lạc bộ
        const result = await ClubModel.joinClub(userId, clubCode);
        
        // Lấy thông tin cơ bản của câu lạc bộ để trả về
        const clubInfo = await ClubModel.getClubBasicInfo(clubCode);
        
        return res.status(200).json({
            success: true,
            message: 'Yêu cầu tham gia đã được gửi',
            data: {
                clubId: result.clubId,
                status: result.status,
                clubInfo
            }
        });
    } catch (error) {
        console.error('Join club error:', error);
        return res.status(400).json({
            success: false,
            message: error.message || 'Đã xảy ra lỗi khi tham gia câu lạc bộ'
        });
    }
};

exports.getClubByCode = async (req, res) => {
  try {
    const { code } = req.params;
    
    const clubInfo = await ClubModel.getClubBasicInfo(code);
    
    if (!clubInfo) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy câu lạc bộ'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: clubInfo
    });
  } catch (error) {
    console.error('Get club error:', error);
    return res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi lấy thông tin câu lạc bộ'
    });
  }
};

exports.updateClubInfo = async (req, res) => {
  try {
    const { clubId } = req.params;
    const userId = req.user.userId;
    
    // Extract update data from request body
    const updateData = {};
    const allowedFields = ['club_code', 'name', 'description', 'province', 'district', 'location', 'facebook_url', 'instagram_url', 'youtube_channel_url'];
    
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }
    
    // Update club information using the model
    const updatedClub = await ClubModel.updateClubInfoWithPermissionCheck(clubId, userId, updateData);
    
    return res.status(200).json({
      success: true,
      message: 'Cập nhật thông tin câu lạc bộ thành công',
      data: updatedClub
    });
  } catch (error) {
    console.error('Update club error:', error);
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message || 'Đã xảy ra lỗi khi cập nhật thông tin câu lạc bộ'
    });
  }
}; 