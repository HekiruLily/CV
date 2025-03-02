const db = require('../configs/database');

class UserModel {
    static async validateUserWithProfile(email, password) {
        try {
            const query = `
                SELECT u.*
                FROM admin_users u
                WHERE u.email = ?
            `;
            const [rows] = await db.promise().query(query, [email]);
            const user = rows[0];
            if (!user) {
                return null;
            }
            if (user.password_hash !== password) {
                return null;
            }
            
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
