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
    gender ENUM('male', 'female', 'other'),        -- Giới tính
    address TEXT,                            -- Địa chỉ
    achievement TEXT,                        -- Thành tích
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE running_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã thành tích chạy tự động tăng
    user_id INT NOT NULL,                      -- Người dùng thực hiện chạy
    distance DECIMAL(5,2) NOT NULL,         -- Quãng đường chạy (km)
    duration INT NOT NULL,                 -- Thời gian chạy (giây)
    surface_type ENUM('road', 'trail', 'track', 'treadmill') DEFAULT 'Road',  -- Loại bề mặt chạy
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
    location VARCHAR(255),                   -- Địa điểm
    created_by INT NOT NULL,                 -- Người tạo CLB (admin mặc định)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- lần thêm thứ 2
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

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

CREATE INDEX idx_running_records_user_id ON running_records(user_id);
CREATE INDEX idx_running_records_run_date ON running_records(run_date);

CREATE INDEX idx_club_requests_requested_by ON club_requests(requested_by);
CREATE INDEX idx_club_requests_status ON club_requests(status);

CREATE INDEX idx_clubs_created_by ON clubs(created_by);
CREATE INDEX idx_clubs_club_code ON clubs(club_code);

CREATE INDEX idx_club_members_user_id ON club_members(user_id);
CREATE INDEX idx_club_members_club_id ON club_members(club_id);
CREATE INDEX idx_club_members_is_active ON club_members(is_active);
