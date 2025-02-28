const db = require('../configs/database');

class ClubNewsReactionModel {
    static async addReaction(newsId, userId, reactionType) {
        try {
            const [existingReaction] = await db.promise().query(
                'SELECT * FROM club_news_reactions WHERE news_id = ? AND user_id = ?',
                [newsId, userId]
            );
            
            if (existingReaction.length > 0) {
                // Update existing reaction
                await db.promise().query(
                    'UPDATE club_news_reactions SET reaction = ? WHERE news_id = ? AND user_id = ?',
                    [reactionType, newsId, userId]
                );
                return existingReaction[0].reaction_id;
            } else {
                // Create new reaction
                const [result] = await db.promise().query(
                    'INSERT INTO club_news_reactions (news_id, user_id, reaction) VALUES (?, ?, ?)',
                    [newsId, userId, reactionType]
                );
                return result.insertId;
            }
        } catch (error) {
            throw error;
        }
    }

    static async removeReaction(newsId, userId) {
        try {
            const [result] = await db.promise().query(
                'DELETE FROM club_news_reactions WHERE news_id = ? AND user_id = ?',
                [newsId, userId]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getReactionsByNewsId(newsId) {
        try {
            const [reactions] = await db.promise().query(
                `SELECT r.*, u.email, up.full_name, up.avatar
                FROM club_news_reactions r
                JOIN users u ON r.user_id = u.user_id
                JOIN user_profiles up ON u.user_id = up.user_id
                WHERE r.news_id = ?`,
                [newsId]
            );

            const [total] = await db.promise().query(
                'SELECT COUNT(*) as total FROM club_news_reactions WHERE news_id = ?',
                [newsId]
            );

            return {
                reactions,
                total: total[0].total
            };
        } catch (error) {
            throw error;
        }
    }

    static async getUserReactedNews(userId, page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const [rows] = await db.promise().query(
                `SELECT 
                    cn.*,
                    c.club_code,
                    c.name as club_name,
                    u.email as author_email,
                    up.full_name as author_name,
                    up.avatar as author_avatar,
                    r.reaction,
                    r.created_at as reaction_time
                FROM club_news_reactions r
                JOIN club_news cn ON r.news_id = cn.news_id
                JOIN clubs c ON cn.club_id = c.club_id
                JOIN users u ON cn.user_id = u.user_id
                JOIN user_profiles up ON u.user_id = up.user_id
                WHERE r.user_id = ?
                ORDER BY r.created_at DESC
                LIMIT ? OFFSET ?`,
                [userId, limit, offset]
            );

            const [total] = await db.promise().query(
                'SELECT COUNT(*) as total FROM club_news_reactions WHERE user_id = ?',
                [userId]
            );

            return {
                news: rows,
                total: total[0].total
            };
        } catch (error) {
            throw error;
        }
    }

    static async checkUserReaction(newsId, userId) {
        try {
            const [rows] = await db.promise().query(
                'SELECT reaction FROM club_news_reactions WHERE news_id = ? AND user_id = ?',
                [newsId, userId]
            );
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClubNewsReactionModel;
