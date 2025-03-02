const UserModel = require('../models/user.models');
const bcrypt = require('bcrypt');
const { validateEmail } = require('../utils/validation');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        if (!mail || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp email và mật khẩu'
            });
        }

        // Sử dụng email để tìm user (không còn phone)
        const user = await UserModel.validateUserWithProfile(mail, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email hoặc mật khẩu không chính xác'
            });
        }

        const token = jwt.sign(
            { 
                userId: user.user_id,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                userId: user.user_id,
                email: user.email,
                full_name: user.full_name,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng nhập'
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie('auth_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: 'Đăng xuất thành công'
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng xuất'
        });
    }
};

exports.checkAuth = async (req, res) => {
    try {
        // Middleware auth đã kiểm tra token 
        res.json({
            success: true,
            message: 'Token hợp lệ'
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token không hợp lệ'
        });
    }
};
