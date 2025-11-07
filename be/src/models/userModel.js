const db = require('../configs/database'); // Kết nối đến cơ sở dữ liệu

// Tạo một người dùng mới
const createUser  = async (email, password) => {
    const [result] = await db.promise().query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    return { id: result.insertId, email, password };
};

// Lấy tất cả người dùng
const getAllUsers = async () => {
    const [rows] = await db.promise().query('SELECT * FROM users'); // Truy vấn để lấy tất cả người dùng
    return rows; // Trả về danh sách người dùng
};

// Lấy người dùng theo ID
const getUserById = async (id) => {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0]; // Trả về người dùng đầu tiên
};

// Cập nhật người dùng theo ID
const updateUser  = async (id, email, password) => {
    const [result] = await db.promise().query('UPDATE users SET email = ?, password = ? WHERE id = ?', [email, password, id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được cập nhật
};

// Xóa người dùng theo ID
const deleteUser  = async (id) => {
    const [result] = await db.promise().query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0; 
};

const deleteAllUsers = async () => {
    const [result] = await db.promise().query('DELETE FROM users'); // Truy vấn để xóa tất cả người dùng
    return result.affectedRows > 0; 
};

// Lấy người dùng theo email
const getUserByEmail = async (email) => {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0]; // Trả về người dùng đầu tiên nếu có
};

// Xuất các hàm để sử dụng trong controller
module.exports = {
    createUser ,
    getAllUsers,
    getUserById,
    updateUser ,
    deleteUser ,
    deleteAllUsers,
    getUserByEmail,
};