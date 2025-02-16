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

            await conn.commit();
            return userResult.insertId;
        } catch (error) {
            await conn.rollback();
            throw error;
        }
    }

    static async validateUser(emailOrPhone, password) {
        try {
            let user;
            if (emailOrPhone.includes('@')) {
                user = await this.findByEmail(emailOrPhone);
            } else {
                user = await this.findByPhone(emailOrPhone);
            }
            // console.log(user);
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