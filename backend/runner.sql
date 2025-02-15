CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã thành viên tự sinh
    email VARCHAR(255) UNIQUE NULL,          -- Email (có thể NULL nếu đăng ký bằng số điện thoại)
    phone VARCHAR(20) UNIQUE NULL,           -- Số điện thoại (có thể NULL nếu đăng ký bằng email)
    password_hash VARCHAR(255) NOT NULL,     -- Mật khẩu đã mã hóa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    user_id INT PRIMARY KEY,                 -- Khóa chính liên kết với users
    full_name VARCHAR(100) NOT NULL,         -- Họ và tên
    birth_date DATE,                         -- Ngày sinh
    gender ENUM('Nam', 'Nữ', 'Khác'),        -- Giới tính
    address TEXT,                            -- Địa chỉ
    achievement TEXT,                        -- Thành tích
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE running_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã thành tích chạy tự động tăng
    user_id INT NOT NULL,                      -- Người dùng thực hiện chạy
    distance DECIMAL(5,2) NOT NULL,         -- Quãng đường chạy (km)
    duration INT NOT NULL,                 -- Thời gian chạy (phút)
    surface_type ENUM('Road', 'Trail', 'Track', 'Treadmill') DEFAULT 'Road',  -- Loại bề mặt chạy
    run_date DATE NOT NULL,                    -- Ngày chạy
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE club_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã đơn xin tự động tăng
    requested_by INT NOT NULL,                  -- Người gửi yêu cầu (user_id)
    club_name VARCHAR(255) UNIQUE NOT NULL,     -- Tên CLB được đề xuất
    description TEXT,                           -- Mô tả về CLB
    location VARCHAR(255),                      -- Địa điểm CLB hoạt động
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',  -- Trạng thái duyệt
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requested_by) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã CLB tự sinh
    club_code VARCHAR(10) UNIQUE NOT NULL,   -- Mã CLB tự tạo (ví dụ: FC123)
    name VARCHAR(255) UNIQUE NOT NULL,       -- Tên CLB
    description TEXT,                        -- Mô tả về CLB
    province VARCHAR(255),                   -- Tỉnh thành
    district VARCHAR(255),                   -- Quận huyện
    location VARCHAR(255),                   -- Địa điểm
    created_by INT NOT NULL,                 -- Người tạo CLB (admin mặc định)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE club_members (
    club_member_id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,                          
    user_id INT NOT NULL,                          
    role ENUM('Member', 'Manager', 'Finance', 'Admin') DEFAULT 'Member',  
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',     
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE club_finances (
    finance_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã chi phí
    club_id INT NOT NULL,                       -- CLB liên quan
    transaction_type ENUM('Income', 'Expense') NOT NULL,  -- Loại giao dịch (thu hoặc chi)
    amount DECIMAL(10,2) NOT NULL,              -- Số tiền giao dịch
    description TEXT,                            -- Mô tả giao dịch
    recorded_by INT NOT NULL,                    -- Người ghi nhận giao dịch
    transaction_date DATE NOT NULL,              -- Ngày giao dịch
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (recorded_by) REFERENCES users(user_id) ON DELETE SET NULL
);