// userController.js

const User = require('../models/userModel'); // Import mô hình người dùng

// Create a new user
exports.createUser  = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser  = await User.createUser (email, password);
        res.status(201).json({ message: 'User  created successfully', user: newUser  });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
};


exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

exports.updateUser  = async (req, res) => {
    try {
        const userId = req.params.id;
        const { email, password } = req.body;
        const updated = await User.updateUser (userId, email, password);
        if (!updated) {
            return res.status(404).json({ message: 'User  not found or not updated' });
        }
        res.status(200).json({ message: 'User  updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser  = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await User.deleteUser (userId);
        if (!deleted) {
            return res.status(404).json({ message: 'User  not found or not deleted' });
        }
        res.status(200).json({ message: 'User  deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};


exports.loginUser  = async (req, res) => {
    try {
        const { email, password, id } = req.body;

        res.status(200).json({ message: 'Đăng nhập thành công', email, password, id });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi đăng nhập', error: error.message });
    }
};

// Xóa tất cả người dùng
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteAllUsers(); // Gọi hàm xóa tất cả người dùng từ model
        res.status(200).json({ message: 'Tất cả người dùng đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: error.message });
    }
};