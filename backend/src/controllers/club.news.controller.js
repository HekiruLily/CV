const ClubNewsModel = require('../models/clubNews.model');
const { getUploadPath } = require('../middlewares/upload');

exports.createNews = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { clubCode } = req.params;
        const { title, content, activity_type = 'News', visibility = 'Public' } = req.body;

        // Validate dữ liệu
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: 'Tiêu đề và nội dung là bắt buộc'
            });
        }

        const newsData = {
            user_id: userId,
            title,
            content,
            activity_type,
            visibility,
            image: req.file ? getUploadPath(req.file.filename, 'news') : null
        };

        const newsId = await ClubNewsModel.create(clubCode, newsData);

        res.status(201).json({
            success: true,
            message: 'Tạo bài viết thành công',
            data: { news_id: newsId }
        });

    } catch (error) {
        console.error('Create news error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Đã xảy ra lỗi khi tạo bài viết'
        });
    }
};

exports.getClubNews = async (req, res) => {
    try {
        const { clubCode } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const offset = (page - 1) * limit;
        
        const news = await ClubNewsModel.getNewsByClubCode(clubCode, offset, limit);
        const total = await ClubNewsModel.getTotalNews(clubCode);
        console.log(news);
        res.json({
            success: true,
            data: {
                news,
                pagination: {
                    current_page: parseInt(page),
                    total_pages: Math.ceil(total / limit),
                    total_items: total
                }
            }
        });

    } catch (error) {
        console.error('Get club news error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy danh sách bài viết'
        });
    }
};

exports.getNewsDetail = async (req, res) => {
    try {
        const { newsId } = req.params;
        
        const news = await ClubNewsModel.getNewsById(newsId);
        
        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy bài viết'
            });
        }

        res.json({
            success: true,
            data: news
        });

    } catch (error) {
        console.error('Get news detail error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi lấy chi tiết bài viết'
        });
    }
}; 