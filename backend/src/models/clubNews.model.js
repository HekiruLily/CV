const db = require('../configs/database');

class ClubNewsModel {
    static async create(clubCode, newsData) {
        try {
            // Lấy club_id từ club_code
            const [clubs] = await db.promise().query(
                'SELECT club_id FROM clubs WHERE club_code = ?',
                [clubCode]
            );

            if (!clubs.length) {
                throw new Error('Không tìm thấy câu lạc bộ');
            }

            const [result] = await db.promise().query(
                `INSERT INTO club_news 
                (user_id, club_id, title, content, image, activity_type, visibility) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    newsData.user_id,
                    clubs[0].club_id,
                    newsData.title,
                    newsData.content,
                    newsData.image,
                    newsData.activity_type,
                    newsData.visibility
                ]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async getNewsByClubCode(clubCode, offset = 0, limit = 10) {
        try {
            const [rows] = await db.promise().query(
                `SELECT 
                    cn.*,
                    u.email,
                    up.full_name as author_name,
                    up.avatar as author_avatar,
                    (
                        SELECT COUNT(*) 
                        FROM club_news_reactions 
                        WHERE news_id = cn.news_id
                    ) as reaction_count,
                    (
                        SELECT COUNT(*) 
                        FROM club_news_comments 
                        WHERE news_id = cn.news_id
                    ) as comment_count
                FROM club_news cn
                JOIN clubs c ON cn.club_id = c.club_id
                JOIN users u ON cn.user_id = u.user_id
                JOIN user_profiles up ON u.user_id = up.user_id
                WHERE c.club_code = ?
                ORDER BY cn.created_at DESC
                LIMIT ?, ?`,
                [clubCode, offset, parseInt(limit)]
            );

            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getTotalNews(clubCode) {
        try {
            const [rows] = await db.promise().query(
                `SELECT COUNT(*) as total
                FROM club_news cn
                JOIN clubs c ON cn.club_id = c.club_id
                WHERE c.club_code = ?`,
                [clubCode]
            );

            return rows[0].total;
        } catch (error) {
            throw error;
        }
    }

    static async getNewsById(newsId) {
        try {
            const [rows] = await db.promise().query(
                `SELECT 
                    cn.*,
                    u.email,
                    up.full_name as author_name,
                    up.avatar as author_avatar,
                    c.name as club_name,
                    c.club_code
                FROM club_news cn
                JOIN clubs c ON cn.club_id = c.club_id
                JOIN users u ON cn.user_id = u.user_id
                JOIN user_profiles up ON u.user_id = up.user_id
                WHERE cn.news_id = ?`,
                [newsId]
            );

            return rows[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClubNewsModel; 