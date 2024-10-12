import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container01">
                <div className="footer-sections">
                    <div className="footer-about">
                        <h3>Giới thiệu</h3>
                        <p>Căng tin phục vụ các bữa ăn tươi ngon, đảm bảo vệ sinh cho nhân viên, sinh viên của Viện. Chúng tôi luôn nỗ lực mang đến dịch vụ tốt nhất với menu đa dạng.</p>
                    </div>
                    <div className="footer-contact">
                        <h3>Liên hệ</h3>
                        <p>Địa chỉ: Số 122 Đường Hoàng Quốc Việt, Quận Cầu Giấy, Thành Phố Hà Nội</p>
                        <p>Email: <a href="mailto:iuptitclub@gmail.com">iuptitclub@gmail.com</a></p>
                        <p>Điện thoại: 0000000000</p>
                    </div>
                    <div className="footer-social">
                        <h3>Kết nối với chúng tôi</h3>
                        {/* hoahoang */}
                        <a href="#" className="social-link">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="#" className="social-link">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                        <a href="#" className="social-link">
                            <i className="fab fa-youtube"></i> Youtube
                        </a>
                    </div>

                </div>
            </div>
            <div className="footer-bottom">
                <p>© Viện Khoa Học Kĩ Thuật Bưu Điện</p>
            </div>
        </footer>
    );
};

export default Footer;