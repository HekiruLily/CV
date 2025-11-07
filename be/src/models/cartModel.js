const db = require('../configs/database'); // Kết nối đến cơ sở dữ liệu

// Tạo một mục giỏ hàng mới
const createCartItem = async (user_id, product_id, quantity) => {
    const [result] = await db.promise().query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', [user_id, product_id, quantity]);
    return { id: result.insertId, user_id, product_id, quantity };
};

// Lấy tất cả mục giỏ hàng cho một người dùng
const getAllCartItems = async (user_id) => {
    const [rows] = await db.promise().query('SELECT * FROM cart WHERE user_id = ?', [user_id]);
    return rows;
};

// Cập nhật mục giỏ hàng theo ID
const updateCartItem = async (id, quantity) => {
    const [result] = await db.promise().query('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được cập nhật
};

// Xóa mục giỏ hàng theo ID
const deleteCartItem = async (id) => {
    const [result] = await db.promise().query('DELETE FROM cart WHERE id = ?', [id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được xóa
};

// Xuất các hàm để sử dụng trong controller
module.exports = {
    createCartItem,
    getAllCartItems,
    updateCartItem,
    deleteCartItem,
};