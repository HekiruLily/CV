const ClubNewsReactionModel = require('../models/clubNewsReaction.model');

exports.addReaction = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { reaction_type } = req.body;
        const userId = req.user.userId;

        if (!reaction_type) {
            return res.status(400).json({
                success: false,
                message: 'Loại cảm xúc không được để trống'
            });
        }

        const reactionId = await ClubNewsReactionModel.addReaction(newsId, userId, reaction_type);
        
        res.status(201).json({
            success: true,
            message: 'Đã thêm cảm xúc',
            data: { reaction_id: reactionId }
        });
    } catch (error) {
        console.error('Add reaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi thêm cảm xúc'
        });
    }
};

exports.removeReaction = async (req, res) => {
    try {
        const { newsId } = req.params;
        const userId = req.user.userId;

        const removed = await ClubNewsReactionModel.removeReaction(newsId, userId);
        
        if (!removed) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy cảm xúc để xóa'
            });
        }

        res.json({
            success: true,
            message: 'Đã xóa cảm xúc'
        });
    } catch (error) {
        console.error('Remove reaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa cảm xúc'
        });
    }
};

exports.getReactions = async (req, res) => {
    try {
        const { newsId } = req.params;
        const reactions = await ClubNewsReactionModel.getReactionsByNewsId(newsId);
        
        res.json({
            success: true,
            data: reactions
        });
    } catch (error) {
        console.error('Get reactions error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách cảm xúc'
        });
    }
};

exports.getUserReactedNews = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { page = 1, limit = 10 } = req.query;

        const result = await ClubNewsReactionModel.getUserReactedNews(userId, page, limit);
        
        res.json({
            success: true,
            data: {
                news: result.news,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(result.total / limit),
                    total_items: result.total
                }
            }
        });
    } catch (error) {
        console.error('Get user reacted news error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách bài viết đã bày tỏ cảm xúc'
        });
    }
};

exports.checkReaction = async (req, res) => {
    try {
        const { newsId } = req.params;
        const userId = req.user.userId;

        const reaction = await ClubNewsReactionModel.checkUserReaction(newsId, userId);
        
        res.json({
            success: true,
            data: {
                hasReacted: !!reaction,
                reactionType: reaction?.reaction_type
            }
        });
    } catch (error) {
        console.error('Check reaction error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi kiểm tra cảm xúc'
        });
    }
};
