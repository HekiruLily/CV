const TournamentModel = require('../models/tournament.model');

exports.getAllTournaments = async (req, res) => {
    try {
        const tournaments = await TournamentModel.getAll();
        
        res.json({
            success: true,
            data: tournaments
        });
    } catch (error) {
        console.error('Get tournaments error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách giải đấu'
        });
    }
};

exports.getTournamentById = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const tournament = await TournamentModel.getById(tournamentId);

        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy giải đấu'
            });
        }

        res.json({
            success: true,
            data: tournament
        });
    } catch (error) {
        console.error('Get tournament error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy thông tin giải đấu'
        });
    }
};

exports.createTournament = async (req, res) => {
    try {
        const tournamentData = req.body;

        // Validate dữ liệu
        if (!tournamentData.code || !tournamentData.name) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin bắt buộc'
            });
        }

        // Kiểm tra mã giải đấu đã tồn tại
        const existingTournament = await TournamentModel.getByCode(tournamentData.code);
        if (existingTournament) {
            return res.status(400).json({
                success: false,
                message: 'Mã giải đấu đã tồn tại'
            });
        }

        const tournamentId = await TournamentModel.create(tournamentData);

        res.status(201).json({
            success: true,
            message: 'Tạo giải đấu thành công',
            data: { tournament_id: tournamentId }
        });
    } catch (error) {
        console.error('Create tournament error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi tạo giải đấu'
        });
    }
};

exports.updateTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const tournamentData = req.body;

        const tournament = await TournamentModel.getById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy giải đấu'
            });
        }

        await TournamentModel.update(tournamentId, tournamentData);

        res.json({
            success: true,
            message: 'Cập nhật giải đấu thành công'
        });
    } catch (error) {
        console.error('Update tournament error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật giải đấu'
        });
    }
};

exports.deleteTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;

        const tournament = await TournamentModel.getById(tournamentId);
        if (!tournament) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy giải đấu'
            });
        }

        await TournamentModel.delete(tournamentId);

        res.json({
            success: true,
            message: 'Xóa giải đấu thành công'
        });
    } catch (error) {
        console.error('Delete tournament error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa giải đấu'
        });
    }
};

exports.getTournamentYears = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        const years = await TournamentModel.getTournamentYears(tournamentId);

        res.json({
            success: true,
            data: years
        });
    } catch (error) {
        console.error('Get tournament years error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách năm của giải đấu'
        });
    }
}; 