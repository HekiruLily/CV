const db = require('../configs/database'); // Kết nối đến cơ sở dữ liệu

const createPayment = async (user_id, total_amount, payment_method) => {
    const [result] = await db.promise().query('INSERT INTO payments (user_id, total_amount, payment_method) VALUES (?, ?, ?)', [user_id, total_amount, payment_method]);
    return { id: result.insertId, user_id, total_amount, payment_method };
};

const getAllPayments = async (user_id) => {
    const [rows] = await db.promise().query('SELECT * FROM payments WHERE user_id = ?', [user_id]);
    return rows;
};

const getPaymentById = async (id) => {
    const [rows] = await db.promise().query('SELECT * FROM payments WHERE id = ?', [id]);
    return rows[0]; // Trả về thanh toán đầu tiên nếu có
};

const updatePayment = async (id, total_amount, payment_method) => {
    const [result] = await db.promise().query('UPDATE payments SET total_amount = ?, payment_method = ? WHERE id = ?', [total_amount, payment_method, id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được cập nhật
};

const deletePayment = async (id) => {
    const [result] = await db.promise().query('DELETE FROM payments WHERE id = ?', [id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được xóa
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};