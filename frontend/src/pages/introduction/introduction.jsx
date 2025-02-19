import React from 'react';
import './introduction.css';
import clubImage from './harmony.jpg';
import { EditOutlined } from '@ant-design/icons';


const Introduction = () => {
    return (
        <div>
            <div className="introduction-container">
                <div className="header-section">
                    <h2 className="club-name">CLB Âm nhạc Harmony</h2>
                    <button className="edit-button">
                        <EditOutlined /> Chỉnh sửa
                    </button>
                </div>
                
                <div className="content-section">
                    <img 
                        src={clubImage}
                        alt="Club Image" 
                        className="club-image"
                    />

                    <div className="text-section">
                        <p className="club-description">
                        Câu lạc bộ âm nhạc Harmony là nơi quy tụ những người yêu âm nhạc, từ người mới bắt đầu đến những người đã có kinh nghiệm. Chúng tôi tổ chức các buổi biểu diễn, workshop và jam session thường xuyên để các thành viên có cơ hội giao lưu và phát triển kỹ năng.
                        </p>
                        
                        <div className="info-box">
                            <div className="info-item">
                                <span className="info-label">Ngày thành lập</span>
                                <span className="info-value">01/01/2023</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Số thành viên</span>
                                <span className="info-value">56 người</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Địa điểm</span>
                                <span className="info-value">Quận 1, TP Hồ Chí Minh</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Liên hệ</span>
                                <span className="info-value">harmony@club.com</span>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
            <div className="club-description-container">
                <h3>Mô tả câu lạc bộ</h3>
                    <p>
                    Câu lạc bộ Âm nhạc Harmony là ngôi nhà chung của những tâm hồn đam mê âm nhạc, nơi mọi người từ những người mới bắt đầu đến những nhạc sĩ dày dặn kinh nghiệm đều có thể chia sẻ, học hỏi và phát triển tài năng của mình. Tại đây, bạn sẽ có cơ hội tham gia vào các buổi biểu diễn, workshop chuyên sâu và những buổi jam session đầy cảm hứng, qua đó khám phá âm nhạc dưới nhiều hình thức khác nhau. Với môi trường sáng tạo, thân thiện và năng động, CLB không chỉ là nơi trau dồi kỹ năng mà còn là cầu nối gắn kết cộng đồng, mang đến những trải nghiệm âm nhạc phong phú và đa dạng cho tất cả thành viên.
                    </p>
            </div>

            <div className="club-rules-container">
                <h3>Các quy tắc của câu lạc bộ</h3>
                <p>Để duy trì một môi trường hòa nhã, chuyên nghiệp và sáng tạo, CLB yêu cầu mọi thành viên tuân thủ các quy tắc cơ bản:</p>
                <p>- Tôn trọng lẫn nhau: Mỗi ý kiến, phong cách và sự đóng góp của từng thành viên đều được trân trọng.</p>
                <p>- Chấp hành nội quy: Hãy tuân thủ lịch trình và các quy định do ban tổ chức đưa ra, đảm bảo sự trật tự trong các hoạt động của CLB.</p>
                <p>- Gìn giữ thiết bị và không gian: Mọi thành viên cần giữ gìn và sử dụng các thiết bị, dụng cụ âm nhạc một cách cẩn thận, đồng thời duy trì vệ sinh chung tại địa điểm tổ chức.</p>
                <p>- Sự tham gia tích cực: Hãy chia sẻ kinh nghiệm, hợp tác và luôn mở lòng đón nhận những ý tưởng mới, góp phần làm phong phú thêm đời sống âm nhạc của cộng đồng.</p>
                <p>- Những quy tắc này không chỉ giúp bảo vệ quyền lợi của mỗi cá nhân mà còn tạo điều kiện cho CLB phát triển bền vững, trở thành nơi nuôi dưỡng đam mê và tài năng âm nhạc của mọi người.</p>
            </div>
        </div>
    );
}

export default Introduction;
