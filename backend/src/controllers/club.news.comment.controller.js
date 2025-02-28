const ClubNewsCommentModel = require('../models/clubNewsComment.model');

exports.createComment = async (req, res) => {
    try {
        const { newsId } = req.params;
        const { comment } = req.body;
        const userId = req.user.userId;

        if (!comment || comment.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nội dung bình luận không được để trống'
            });
        }

        const commentId = await ClubNewsCommentModel.createComment(newsId, userId, comment);
        
        res.status(201).json({
            success: true,
            message: 'Đã thêm bình luận',
            data: { comment_id: commentId }
        });
    } catch (error) {
        console.error('Create comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi thêm bình luận'
        });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { comment } = req.body;
        const userId = req.user.userId;

        if (!comment || comment.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nội dung bình luận không được để trống'
            });
        }

        const updated = await ClubNewsCommentModel.updateComment(commentId, userId, comment);
        
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bình luận hoặc bạn không có quyền chỉnh sửa'
            });
        }

        res.json({
            success: true,
            message: 'Đã cập nhật bình luận'
        });
    } catch (error) {
        console.error('Update comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật bình luận'
        });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.userId;

        const deleted = await ClubNewsCommentModel.deleteComment(commentId, userId);
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bình luận hoặc bạn không có quyền xóa'
            });
        }

        res.json({
            success: true,
            message: 'Đã xóa bình luận'
        });
    } catch (error) {
        console.error('Delete comment error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi xóa bình luận'
        });
    }
};

exports.getComments = async (req, res) => {
    try {
        const { newsId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const result = await ClubNewsCommentModel.getComments(newsId, page, limit);
        
        res.json({
            success: true,
            data: {
                comments: result.comments,
                pagination: {
                    current_page: page,
                    total_pages: Math.ceil(result.total / limit),
                    total_items: result.total
                }
            }
        });
    } catch (error) {
        console.error('Get comments error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách bình luận'
        });
    }
}; 