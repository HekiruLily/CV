const db = require('../configs/database');

class ClubNewsCommentModel {
    static async createComment(newsId, userId, comment) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO club_news_comments (news_id, user_id, comment) VALUES (?, ?, ?)',
                [newsId, userId, comment]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateComment(commentId, userId, comment) {
        try {
            const [result] = await db.promise().query(
                'UPDATE club_news_comments SET comment = ? WHERE comment_id = ? AND user_id = ?',
                [comment, commentId, userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteComment(commentId, userId) {
        try {
            const [result] = await db.promise().query(
                'DELETE FROM club_news_comments WHERE comment_id = ? AND user_id = ?',
                [commentId, userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getComments(newsId, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const [comments] = await db.promise().query(
                `SELECT c.*, up.full_name, up.avatar 
                FROM club_news_comments c 
                JOIN user_profiles up ON up.user_id = c.user_id
                WHERE c.news_id = ? 
                ORDER BY c.created_at DESC 
                LIMIT ? OFFSET ?`,
                [newsId, limit, offset]
            );
            
            const [total] = await db.promise().query(
                'SELECT COUNT(*) as total FROM club_news_comments WHERE news_id = ?',
                [newsId]
            );

            return {
                comments,
                total: total[0].total
            };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClubNewsCommentModel; 