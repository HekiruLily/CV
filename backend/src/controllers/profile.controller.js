const ProfileModel = require('../models/profile.model');
const { validatePhone } = require('../utils/validation');
const { format } = require('date-fns');

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const profile = await ProfileModel.getUserProfile(userId);
        
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy thông tin người dùng'
            });
        }

        // Format dữ liệu trước khi trả về
        const formattedProfile = {
            basic_info: {
                email: profile.email,
                phone: profile.phone,
                full_name: profile.full_name,
                birth_date: format(profile.birth_date, 'dd/MM/yyyy'),
                gender: profile.gender,
                address: profile.address,
                avatar: profile.avatar
            },
            achievements_stats: {
                total_runs: profile.total_runs || 0,
                total_distance: Number(profile.total_distance || 0).toFixed(2),
                achievement_text: profile.achievement,
                total_clubs: profile.total_clubs || 0
            },
            clubs: profile.clubs.map(club => ({
                club_id: club.club_id,
                club_code: club.club_code,
                name: club.club_name,
                avatar: club.club_avatar,
                role: club.role,
                joined_at: format(club.joined_at, 'dd/MM/yyyy')
            })),
            achievements: profile.runningRecords.map(record => ({
                record_id: record.record_id,
                race_name: record.race_name,
                race_year: record.race_year,
                distance: Number(record.distance).toFixed(2),
                duration: record.duration,
                surface_type: record.surface_type,
                proof_image: record.proof_image,
                pace: record.pace,
                run_date: format(record.run_date, 'dd/MM/yyyy'),
                created_at: format(record.created_at, 'dd/MM/yyyy')
            }))
        };
        res.json({
            success: true,
            data: formattedProfile
        });
        console.log(formattedProfile);

    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy thông tin người dùng'
        });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profileData = req.body;

        // Validate dữ liệu
        if (profileData.phone && !validatePhone(profileData.phone)) {
            return res.status(400).json({
                success: false,
                message: 'Số điện thoại không hợp lệ'
            });
        }

        await ProfileModel.updateProfile(userId, profileData);

        res.json({
            success: true,
            message: 'Cập nhật thông tin thành công'
        });

    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin'
        });
    }
};

exports.updateAvatar = async (req, res) => {
    try {
        const userId = req.user.userId;
        const avatarUrl = req.body.avatar_url;

        if (!avatarUrl) {
            return res.status(400).json({
                success: false,
                message: 'URL ảnh đại diện không được để trống'
            });
        }

        await ProfileModel.updateAvatar(userId, avatarUrl);

        res.json({
            success: true,
            message: 'Cập nhật ảnh đại diện thành công'
        });

    } catch (error) {
        console.error('Update avatar error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật ảnh đại diện'
        });
    }
}; 