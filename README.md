# Trang thanh toán

## Payment ver1.0

Một số lỗi đã biết  
-Trên máy của t khi chạy thì background là đen và chữ thì màu trắng (đã sửa bằng cách sử dụng CSS cho phần body)  
-Chưa có cách để khi chọn phương thức thanh toán bằng QR và chọn "thanh toán" sẽ điều hướng sang trang để quét chúng (Mặc dù file TransferQRCode.jsx vẫn bao gồm trong phần code được t đẩy lên)  
-Header và Footer vẫn đang dùng phiên bản cũ

## Payment ver1.1

-Thêm tính năng điều hướng sang trang thanh toán bằng QR khi chọn phương thức chuyển khoản ngân hàng.

-Chương trình sẽ chạy trên React (không có Vite).

-Do chạy trên React nên lỗi background không xảy ra

## Payment ver1.2

- Thêm trang ReviewOrder từ @hoahoang4205 (xem lại đơn hàng)
- Phần ReviewOrder được @HekiruLily sửa lại nhiều từ code và liên kết để thuận tiện trong việc code
- Tạo cầu nối giữa trang ReviewOrder và trang thanh toán: Lấy thông tin tổng số sản phẩm và tổng thanh toán
