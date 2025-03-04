const multer = require('multer');
const path = require('path');
const fs = require('fs');

//  Cấu hình storage tùy chỉnh theo loại upload
const createStorage = (type = 'common') => {
    const storageConfig = {
        avatar: {
            destination: 'uploads/avatars',
            maxSize: 2 * 1024 * 1024 // 2MB
        },
        club: {
            destination: 'uploads/club_avatars',
            maxSize: 3 * 1024 * 1024 // 3MB
        },
        achievement: {
            destination: 'uploads/achievements',
            maxSize: 5 * 1024 * 1024 // 5MB
        },
        news: {
            destination: 'uploads/news',
            maxSize: 5 * 1024 * 1024 // 5MB
        },

        common: {
            destination: 'uploads/common',
            maxSize: 5 * 1024 * 1024 // 5MB
        }
    };

    const config = storageConfig[type] || storageConfig.common;

    return multer.diskStorage({
        destination: (req, file, cb) => {
            if (!fs.existsSync(config.destination)) {
                fs.mkdirSync(config.destination, { recursive: true });
            }
            cb(null, config.destination);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
};

//  Lọc file chỉ chấp nhận hình ảnh
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('❌ Chỉ chấp nhận file hình ảnh (jpeg, jpg, png)'));
    }
};

//  Tạo middleware upload theo loại
const createUpload = (type) => {
    const config = {
        avatar: {
            destination: 'uploads/avatars',
            maxSize: 2 * 1024 * 1024
        },
        club: {
            destination: 'uploads/club_avatars',
            maxSize: 3 * 1024 * 1024
        },
        achievement: {
            destination: 'uploads/achievements',
            maxSize: 5 * 1024 * 1024
        },
        news: {
            destination: 'uploads/news',
            maxSize: 5 * 1024 * 1024
        },
        common: {
            destination: 'uploads/common',
            maxSize: 5 * 1024 * 1024
        }
    }[type || 'common'];

    return multer({
        storage: createStorage(type),
        limits: { fileSize: config.maxSize },
        fileFilter: fileFilter
    });
};

//  Tạo các instance cụ thể cho từng loại upload
const uploadAvatar = createUpload('avatar').single('avatar');
const uploadClubAvatar = createUpload('club').single('avatar');
const uploadAchievement = createUpload('achievement').single('image');
const uploadNews = createUpload('news').single('image');

//  Helper function để lấy đường dẫn file
const getUploadPath = (filename, type = 'common') => {
    const basePath = {
        avatar: '/uploads/avatars',
        club: '/uploads/club_avatars',
        achievement: '/uploads/achievements',
        news: '/uploads/news',
        common: '/uploads/common'
    }[type] || '/uploads/common';

    return `${basePath}/${filename}`;
};

//  Hàm xóa file sau khi update
const deleteFile = (filePath) => {
    const fullPath = path.join(__dirname, '../../', filePath);
    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (!err) {
            fs.unlink(fullPath, (error) => {
                if (error) console.error(` Lỗi khi xóa file ${filePath}:`, error);
                else console.log(` Đã xóa file: ${filePath}`);
            });
        } else {
            console.warn(` File không tồn tại: ${filePath}`);
        }
    });
};

// Export tất cả các middleware và helper functions
module.exports = {
    uploadAvatar,
    uploadClubAvatar,
    uploadAchievement,
    uploadNews,
    createUpload,
    getUploadPath,
    deleteFile
};