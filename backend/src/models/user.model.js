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

    static async findByPhone(phone) {
        const [rows] = await db.promise().query(
            'SELECT * FROM users WHERE phone = ?',
            [phone]
        );
        return rows[0];
    }

    static async createUser(userData, userProfile) {
        const conn = await db.promise();
        try {
            await conn.beginTransaction();

            // Insert user data
            const [userResult] = await conn.query(
                'INSERT INTO users (email, phone, password_hash) VALUES (?, ?, ?)',
                [userData.email, userData.phone, userData.password_hash]
            );
            
            const userId = userResult.insertId;

            // Insert user profile data
            await conn.query(
                'INSERT INTO user_profiles (user_id, full_name) VALUES (?, ?)',
                [userId, userProfile.full_name]
            );

            await conn.commit();
            return userId;
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }
    
    static async validateUserWithProfile(emailOrPhone, password) {
        try {
            let query;
            let params;

            if (emailOrPhone.includes('@')) {
                query = `
                    SELECT u.*, up.full_name, up.avatar 
                    FROM users u
                    LEFT JOIN user_profiles up ON u.user_id = up.user_id
                    WHERE u.email = ?
                `;
                params = [emailOrPhone];
            } else {
                query = `
                    SELECT u.*, up.full_name, up.avatar 
                    FROM users u
                    LEFT JOIN user_profiles up ON u.user_id = up.user_id
                    WHERE u.phone = ?
                `;
                params = [emailOrPhone];
            }

            const [rows] = await db.promise().query(query, params);
            const user = rows[0];

            if (!user) {
                return null;
            }

            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                return null;
            }
            console.log(user);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel; 