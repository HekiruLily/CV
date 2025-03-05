const TournamentModel = require("../models/tournament.model");
const { getUploadPath } = require("../middlewares/upload"); // Import getUploadPath

class TournamentController {
    //  Lấy danh sách tất cả giải đấu (trừ giải đấu đã hoàn thành)
    static async getAllTournaments(req, res) {
        try {
            const tournaments = await TournamentModel.getAll();
            console.log(tournaments);
            return res.status(200).json({
                success: true,
                message: "Danh sách giải đấu",
                data: tournaments
            });
        } catch (error) {
            console.error("Error in getAllTournaments:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ nội bộ"
            });
        }
    }

    //  Lấy thông tin giải đấu theo ID
    static async getTournamentById(req, res) {
        try {
            const { id } = req.params;
            const tournament = await TournamentModel.getById(id);
            if (!tournament) {
                return res.status(404).json({
                    success: false,
                    message: "Giải đấu không tồn tại"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Thông tin giải đấu",
                data: tournament
            });
        } catch (error) {
            console.error("Error in getTournamentById:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ nội bộ"
            });
        }
    }

    //  Tạo giải đấu mới
    static async createTournament(req, res) {
        try {
            const tournamentData = req.body;
            console.log(req.file)
            //Danh sách các trường bắt buộc
            const requiredFields = ["tournament_code", "tournament_name", "tournament_start_date", "tournament_end_date"];
            const missingFields = requiredFields.filter(field => !tournamentData[field]);

            if (missingFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Thiếu thông tin bắt buộc: ${missingFields.join(", ")}`,
                });
            }

            // Nếu có file, lưu đường dẫn vào database
            tournamentData.tournament_image = req.file ? getUploadPath(req.file.filename, "tournament_image") : null;

            const newTournamentId = await TournamentModel.create(tournamentData);
            return res.status(201).json({
                success: true,
                message: "Tạo giải đấu thành công",
                data: { tournament_id: newTournamentId },
            });
        } catch (error) {
            console.error("Error in createTournament:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ nội bộ",
            });
        }
    }


    //  Cập nhật thông tin giải đấu
    static async updateTournament(req, res) {
        try {
            const { id } = req.params;
            const tournamentData = req.body;

            const updated = await TournamentModel.update(id, tournamentData);
            if (!updated) {
                return res.status(404).json({
                    success: false,
                    message: "Giải đấu không tồn tại hoặc không thể cập nhật"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Cập nhật giải đấu thành công"
            });
        } catch (error) {
            console.error("Error in updateTournament:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ nội bộ"
            });
        }
    }

    //  Xóa giải đấu
    static async deleteTournament(req, res) {
        try {
            const { id } = req.params;

            const deleted = await TournamentModel.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: "Giải đấu không tồn tại hoặc đã bị xóa"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Xóa giải đấu thành công"
            });
        } catch (error) {
            console.error("Error in deleteTournament:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ nội bộ"
            });
        }
    }

    //  Lấy danh sách năm diễn ra giải đấu
    static async getTournamentYears(req, res) {
        try {
            const { id } = req.params;
            const years = await TournamentModel.getTournamentYears(id);
            if (!years.length) {
                return res.status(404).json({
                    success: false,
                    message: "Không tìm thấy năm của giải đấu"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Danh sách năm của giải đấu",
                data: years
            });
        } catch (error) {
            console.error("Error in getTournamentYears:", error);
            return res.status(500).json({
                success: false,
                message: "Lỗi máy chủ nội bộ"
            });
        }
    }
}

module.exports = TournamentController;
