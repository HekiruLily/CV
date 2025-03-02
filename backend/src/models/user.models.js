const db = require('../configs/database');
const bcrypt = require('bcrypt');

class UserModel {
    static async findByEmail(email) {
        const [rows] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async createUser(userData, userProfile) {
        const conn = await db.promise();
        try {
            await conn.beginTransaction();

            // Insert user data (chỉ còn email và password_hash)
            const [userResult] = await conn.query(
                'INSERT INTO users (email, password_hash) VALUES (?, ?)',
                [userData.email, userData.password_hash]
            );
            
            const userId = userResult.insertId;

            // Insert user profile data (không còn phone)
            await conn.query(
                'INSERT INTO user_profiles (user_id, full_name, email) VALUES (?, ?, ?)',
                [userId, userProfile.full_name, userData.email]
            );

            await conn.commit();
            return userId;
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }
    
    static async validateUserWithProfile(email, password) {
        try {
            const query = `
                SELECT u.*, up.full_name, up.avatar 
                FROM users u
                LEFT JOIN user_profiles up ON u.user_id = up.user_id
                WHERE u.email = ?
            `;
            const [rows] = await db.promise().query(query, [email]);
            const user = rows[0];

            if (!user) {
                return null;
            }

            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                return null;
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
