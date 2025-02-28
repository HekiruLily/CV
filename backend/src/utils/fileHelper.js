const fs = require('fs');
const path = require('path');

/**
 * Xóa file cũ từ hệ thống
 * @param {string} filePath - Đường dẫn file trong database (ví dụ: /uploads/avatar-123.jpg)
 * @param {string} baseDir - Thư mục gốc để tìm file (mặc định là thư mục uploads)
 * @returns {boolean} - Trả về true nếu xóa thành công hoặc không cần xóa, false nếu có lỗi
 */
const deleteOldFile = (filePath, baseDir = 'uploads') => {
    try {
        // Bỏ qua nếu không có đường dẫn hoặc không phải từ thư mục uploads
        if (!filePath || !filePath.startsWith('/uploads/')) {
            console.log(`⚠️ Bỏ qua xóa file không hợp lệ: ${filePath}`);
            return true;
        }

        // Lấy tên file từ đường dẫn
        const filename = filePath.split('/').pop();
        
        // Tạo đường dẫn đầy đủ đến file
        const fullPath = path.join(__dirname, '../../', baseDir, filename);
        
        console.log(`Đang kiểm tra file tại: ${fullPath}`);
        
        // Kiểm tra file có tồn tại không
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`✅ Đã xóa file: ${fullPath}`);
            return true;
        } else {
            console.log(`⚠️ Không tìm thấy file: ${fullPath}`);
            return true; // Vẫn trả về true vì không có file để xóa
        }
    } catch (error) {
        console.error(`❌ Lỗi khi xóa file: ${error.message}`);
        return false;
    }
};

/**
 * Xóa nhiều file cùng lúc
 * @param {Array<string>} filePaths - Mảng các đường dẫn file cần xóa
 * @param {string} baseDir - Thư mục gốc để tìm file
 * @returns {Array<boolean>} - Mảng kết quả tương ứng với từng file
 */
const deleteMultipleFiles = (filePaths, baseDir = 'uploads') => {
    if (!Array.isArray(filePaths)) return [];
    return filePaths.map(filePath => deleteOldFile(filePath, baseDir));
};

module.exports = {
    deleteOldFile,
    deleteMultipleFiles
}; 