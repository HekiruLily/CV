## 1. Web quản lí nhà hàng ABC
**[🔗 Xem chi tiết tại branch: web_quan_li_nha_hang](https://github.com/HekiruLily/CV/tree/web_quan_li_nha_hang)**

Website đặt đồ ăn trực tuyến cho nhà hàng với các chức năng đơn giản:
- Hiển thị menu
- Slider món đặc biệt
- Form đặt hàng
- Đánh giá khách hàng
- Thông tin liên hệ

**Công nghệ sử dụng:**
- HTML5, CSS3, JavaScript
- Thư viện Swiper.js cho slider
- Font Awesome cho icons

---

## 2. ToDoList v1.0
**[🔗 Xem chi tiết tại branch: todo1.0](https://github.com/HekiruLily/CV/tree/todo1.0)**

Ứng dụng quản lý công việc đơn giản sử dụng React với các tính năng:
- Thêm task
- Sửa task
- Xóa task
- Đánh dấu hoàn thành task

**Công nghệ sử dụng:**
- React hooks (useState)
- CSS modules để styling
- Component pattern với Header, Footer và ToDoList components

---

## 3. ToDoList v2.1
**[🔗 Xem chi tiết tại branch: todo2.1](https://github.com/HekiruLily/CV/tree/todo2.1)**

Phiên bản nâng cao với tích hợp Backend và Database:
- Backend: Node.js/Express
- Database: MySQL
- Real-time updates với Socket.io
- Phân loại công việc theo danh mục (Công việc, Cá nhân, Học tập)
- Chức năng lọc task theo category

**Công nghệ Frontend:**
- React
- Axios để gọi API
- Socket.io cho real-time updates

---

## 4. BorrowEase
**[🔗 Xem chi tiết tại branch: borrowEase](https://github.com/HekiruLily/CV/tree/borrowEase)**

Dự án web application quản lý mượn/trả thiết bị cho sinh viên và câu lạc bộ, giúp đặt lịch mượn, theo dõi lịch sử và quản lý tồn kho hiệu quả.

**Key Features:**
- Landing page
- Dashboard admin/user
- Quản lý danh mục
- Thông báo realtime
- Upload files
- Export PDF/Excel
- Multi-language (vi/en)

**UI Library:**
- Ant Design v4 (Table, Form, Modal, DatePicker...)

**State Management:**
- UmiJS Model (useModel hooks)
- React Context API (UserContext)
- Local state với hooks

**Authentication:**
- Google OAuth
- Custom AuthGuard với access control

**Realtime:**
- Socket.io client

**File Handling:**
- Upload đa dạng (image, PDF, Excel)
- PDF Viewer tích hợp
- Preview file

**Charts:**
- Custom Chart components

**Form & Validation:**
- Ant Design Form + custom validation rules

**HTTP Client:**
- Axios với interceptors

**Styling:**
- Less/CSS Modules

---

## 5. RFO - Web bán đồ ăn
**[🔗 Xem chi tiết tại branch: RFO_web_ban_do_an](https://github.com/HekiruLily/CV/tree/RFO_web_ban_do_an)**

Xây dựng ứng dụng web bán hàng thực phẩm/đồ ăn với đầy đủ tính năng giỏ hàng, thanh toán và quản lý đơn hàng.

**Tính năng chính:**
- Đăng nhập/đăng ký (email/số điện thoại)
- Quản lý sản phẩm theo danh mục
- Giỏ hàng động
- Xem lại đơn hàng
- Thanh toán qua QR code

**Công nghệ sử dụng:**
- React.js cho giao diện người dùng
- React Context API để quản lý state toàn cục (giỏ hàng)
- React Router cho điều hướng trang
- Tailwind CSS và custom CSS cho responsive design

---

## 6. Runner Club - Hệ thống quản lý câu lạc bộ chạy bộ
**[🔗 Xem chi tiết tại branch: runnerclub](https://github.com/HekiruLily/CV/tree/runnerclub)**

Phát triển ứng dụng web quản lý câu lạc bộ chạy bộ với các tính năng:
- Đăng ký/đăng nhập thành viên
- Quản lý hồ sơ cá nhân
- Theo dõi lịch sử chạy
- Đăng ký giải đấu
- Tương tác với tin tức câu lạc bộ (bình luận, reaction)

**Frontend Stack:**
- React.js với hooks (useAuth, useContext)
- Redux Toolkit cho state management
- React Router cho điều hướng
- Axios để tương tác API RESTful
- CSS Modules và responsive design

**Tính năng bổ sung:**
- Upload avatar
- Form validation
- Components tái sử dụng (Navbar, Sidebar, Modal)
- Giao diện landing page, trang quản lý profile, events, và dashboard

---

## 7. Runner Web Management - Hệ thống quản lý giải chạy và câu lạc bộ
**[🔗 Xem chi tiết tại branch: runnerweb_management](https://github.com/HekiruLily/CV/tree/runnerweb_management)**

Phát triển ứng dụng web quản lý giải đấu chạy bộ và câu lạc bộ với các tính năng:
- Quản trị viên tạo/cập nhật giải đấu
- Quản lý thông tin câu lạc bộ
- Đăng ký sự kiện
- Xác thực người dùng

**Frontend Stack:**
- React.js với custom hooks (useAuth)
- Redux Toolkit (userSlice) cho authentication state management
- React Router cho single-page application
- Axios service layer (authService, clubService, tournamentService) để kết nối API
- CSS3 cho UI/UX responsive

**Tính năng quản lý:**
- Form handling cho tạo/cập nhật giải đấu (CreateTournament, UpdateTournament)
- Quản lý sự kiện và câu lạc bộ
- Authentication flow với kiến trúc component-based

---

## 8. Tomorrowland Gallery & E-commerce
**[🔗 Xem chi tiết tại branch: tmlGallery_E-commerce](https://github.com/HekiruLily/CV/tree/tmlGallery_E-commerce)**

Website giới thiệu lịch sử festival Tomorrowland (2005-2024) kết hợp shop bán hàng.

**Frontend:**
- React Router cho navigation
- React Transition Group cho hiệu ứng chuyển trang mượt mà
- FontAwesome icons
- Tích hợp YouTube embeds
- Hệ thống e-commerce với giỏ hàng, thanh toán

**Backend:**
- Node.js/Express
- MySQL quản lý sản phẩm, user, cart và payment

**Status:** Dự kiến update thêm và sửa lỗi