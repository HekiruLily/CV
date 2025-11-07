const db = require('../configs/database'); // Kết nối đến cơ sở dữ liệu

// Tạo một sản phẩm mới
const createProduct = async (name, price, image, category) => {
    const [result] = await db.promise().query('INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)', [name, price, image, category]);
    return { id: result.insertId, name, price, image, category };
};

// Lấy tất cả sản phẩm
const getAllProducts = async () => {
    const [rows] = await db.promise().query('SELECT * FROM products');
    return rows;
};

// Lấy sản phẩm theo ID
const getProductById = async (id) => {
    const [rows] = await db.promise().query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0]; // Trả về sản phẩm đầu tiên
};

// Cập nhật sản phẩm theo ID
const updateProduct = async (id, name, price, image, category) => {
    const [result] = await db.promise().query('UPDATE products SET name = ?, price = ?, image = ?, category = ? WHERE id = ?', [name, price, image, category, id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được cập nhật
};

// Xóa sản phẩm theo ID
const deleteProduct = async (id) => {
    const [result] = await db.promise().query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0; // Trả về true nếu có bản ghi được xóa
};

// Xuất các hàm để sử dụng trong controller
module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};