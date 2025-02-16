const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validateEmail, validatePhone } = require('../utils/validation');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        let email = null;
        let phone = null;

        const {
            mail_or_phone,
            password
        } = req.body;
        if (validateEmail(mail_or_phone)) {
            email = mail_or_phone;
        } else if (validatePhone(mail_or_phone)) {
            phone = mail_or_phone;
        } else {
            return res.status(400).json({
                success: false,
                message: 'Email hoặc số điện thoại không hợp lệ'
            });
        }

        // Kiểm tra xem có ít nhất email hoặc phone
        if (!email && !phone) {
            return res.status(400).json({
                success: false,
                message: 'Email hoặc số điện thoại là bắt buộc'
            });
        }

        // Kiểm tra email đã tồn tại
        if (email) {
            const existingEmail = await UserModel.findByEmail(email);
            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: 'Email đã được sử dụng'
                });
            }
        }

        // Kiểm tra phone đã tồn tại
        if (phone) {
            const existingPhone = await UserModel.findByPhone(phone);
            if (existingPhone) {
                return res.status(400).json({
                    success: false,
                    message: 'Số điện thoại đã được sử dụng'
                });
            }
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Tạo user data
        const userData = {
            email: email || null,
            phone: phone || null,
            password_hash
        };

        // Lưu vào database
        const userId = await UserModel.createUser(userData);

        res.status(201).json({
            success: true,
            message: 'Đăng ký thành công',
            data: { userId }
        });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng ký'
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { mail_or_phone, password } = req.body;

        if (!mail_or_phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp email/số điện thoại và mật khẩu'
            });
        }

        const user = await UserModel.validateUser(mail_or_phone, password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email/Số điện thoại hoặc mật khẩu không chính xác'
            });
        }

        // Tạo JWT token
        const token = jwt.sign(
            { 
                userId: user.user_id,
                email: user.email,
                phone: user.phone 
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Thiết lập HTTP-only cookie
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Chỉ dùng HTTPS trong production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 giờ
        });

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công',
            data: {
                userId: user.user_id,
                email: user.email,
                phone: user.phone
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