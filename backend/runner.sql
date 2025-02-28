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
    avatar VARCHAR(255),                    -- Ảnh đại diện
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE running_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã thành tích chạy tự động tăng
    user_id INT NOT NULL,                      -- Người dùng thực hiện chạy
    race_name VARCHAR(255) NOT NULL,         -- Tên cuộc đua
    race_year INT NOT NULL,                 -- Năm cuộc đua
    distance DECIMAL(5,2) NOT NULL,         -- Quãng đường chạy (km)
    duration INT NOT NULL,                 -- Thời gian chạy (giây)
    surface_type ENUM('road', 'trail', 'track', 'treadmill') DEFAULT 'Road',  -- Loại bề mặt chạy
    run_date DATE NOT NULL,                    -- Ngày chạy
    proof_image VARCHAR(255),                 -- Ảnh chứng minh
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE club_requests (
    request_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã đơn xin tự động tăng
    club_code VARCHAR(255) UNIQUE NOT NULL,   -- Mã CLB tự tạo (ví dụ: thanhanmuop)
    requested_by INT NOT NULL,                  -- Người gửi yêu cầu (user_id)
    club_name VARCHAR(255) UNIQUE NOT NULL,     -- Tên CLB được đề xuất
    description TEXT,                           -- Mô tả về CLB
    province VARCHAR(20),                      -- Tỉnh thành
    district VARCHAR(20),                      -- Quận huyện
    location VARCHAR(255),                      -- Địa điểm CLB hoạt động
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',  -- Trạng thái duyệt
    reject_reason TEXT,
    avatar VARCHAR(255),                    -- Ảnh đại diện
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requested_by) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE clubs (
    club_id INT AUTO_INCREMENT PRIMARY KEY,  -- Mã CLB tự sinh
    club_code VARCHAR(255) UNIQUE NOT NULL,   -- Mã CLB tự tạo (ví dụ: thanhanmuop)
    name VARCHAR(255) UNIQUE NOT NULL,       -- Tên CLB
    description TEXT,                        -- Mô tả về CLB
    province VARCHAR(20),                      -- Tỉnh thành
    district VARCHAR(20),                      -- Quận huyện
    location VARCHAR(255),                   -- Địa điểm
    avatar VARCHAR(255),                    -- Ảnh đại diện
    created_by INT NOT NULL,                 -- Người tạo CLB (admin mặc định)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(user_id) ON DELETE CASCADE
);

-- lần thêm thứ 2
CREATE TABLE club_members (
    club_member_id INT AUTO_INCREMENT PRIMARY KEY,
    member_code VARCHAR(255) NULL, -- Mã thành viên tự sinh
    club_id INT NOT NULL,                          
    user_id INT NOT NULL,                          
    role ENUM('Member', 'Manager', 'Finance', 'Admin') DEFAULT 'Member',  
    status ENUM('Pending', 'Approved', 'Rejected') DEFAULT 'Pending',     
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE tournaments (
    tournament_id INT AUTO_INCREMENT PRIMARY KEY,
    tournament_code VARCHAR(255) UNIQUE NOT NULL,
    tournament_name VARCHAR(255) NOT NULL,
    tournament_description TEXT,
    tournament_start_date DATE,
    tournament_end_date DATE,
    tournament_location VARCHAR(255),
    tournament_type JSON,
    tournament_status ENUM('Pending', 'Ongoing', 'Completed') DEFAULT 'Pending',
    tournament_prize_pool DECIMAL(10,2),
    tournament_registration_deadline DATE,
    tournament_rules TEXT
);

CREATE TABLE club_news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    club_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    video VARCHAR(255),
    activity_type ENUM('Run', 'Event', 'News', 'Notice') DEFAULT 'Run',
    visibility ENUM('Public', 'Private') DEFAULT 'Public',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubs(club_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE club_news_reactions (
    reaction_id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    user_id INT NOT NULL,
    reaction ENUM('Like', 'Love', 'Haha', 'Sad', 'Angry', 'Wow', 'Care') DEFAULT 'Like',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (news_id) REFERENCES club_news(news_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE club_news_comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (news_id) REFERENCES club_news(news_id) ON DELETE CASCADE,
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
CREATE INDEX idx_club_members_member_code ON club_members(member_code);
CREATE INDEX idx_club_members_club_id ON club_members(club_id);
CREATE INDEX idx_club_members_is_active ON club_members(is_active);


CREATE INDEX idx_club_news_reactions_news_id ON club_news_reactions(news_id);
CREATE INDEX idx_club_news_reactions_user_id ON club_news_reactions(user_id);

CREATE INDEX idx_club_news_comments_news_id ON club_news_comments(news_id);
CREATE INDEX idx_club_news_comments_user_id ON club_news_comments(user_id);