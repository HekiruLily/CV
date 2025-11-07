import React, { useState } from 'react';
import img2023_1 from './2023-1.jpg';
import img2023_2 from './2023-2.jpg';
import img2023_3 from './2023-3.jpg';
import img2023_4 from './2023-4.jpg';
import img2023_5 from './2023-5.jpg';
import img2023_6 from './2023-6.jpg';
import img2023 from './2023-main.jpg';

import img2023_tt from './2023-tt.png';
import img2023_tt2 from './2023-tt2.png';



import '../CSS/2023.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2023 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2022 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2022');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2024 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2024');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2023 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2023'} src={img2023} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2022}>
                2022 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2024}>
                2024 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2023</b></div>
          <div className='info'>Phiên bản thứ 17 của lễ hội mang chủ đề Adscendo và được diễn ra trong 2 tuần (21-23 và 28-30 tháng 7 năm 2023) thu hút 400.000 lượt khách du lịch. Những cây nấm to lớn, một khuôn mặt của sinh vật khổng lồ ẩn sau trong khu rừng xanh um tùm, một con rồng thân thiện, tòa lâu đài nguy nga là những hình ảnh Tomorrowland 2023 mang lại. Những yếu tố về không gian nhảy múa kể trên có thể khiến con người ta cảm thấy choáng ngợp, nơi người tham dự có thể hòa mình vào âm nhạc đều có thiết kế khác nhau với những nét đẹp rất riêng biệt.</div>
          <div className='content1'>
          <iframe width="40%" height="280px" src="https://www.youtube.com/embed/t-3ErVKHgl4"></iframe>
          <div className='info2'>Sân khấu chính của Tomorrowland 2023 mang ý tưởng chủ đạo “Adscendo” và có tên là “Arcadiana”, được ban tổ chức xem như một tòa lâu đài vươn tới tận trời xanh, chứng minh cho khả năng phục hồi của con người và sự theo đuổi những tiến bộ không ngừng nghỉ.  Sân khấu cao 43m, rộng 160m, mất 50 ngày để xây dựng và 13 ngày để tháo dỡ.</div>
          </div>
          <div className='content2'>
            <iframe width="30%" height="280px" src="https://www.youtube.com/embed/PasLhCLgwfw" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="280px" src="https://www.youtube.com/embed/raOVXUB13vw" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="280px" src="https://www.youtube.com/embed/jO7_r2nf__k" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <div className='info3'>WeAreOne.World, công ty đứng sau lễ hội, đã báo cáo tổng doanh thu của công ty năm 2023 đạt 129 triệu euro, lợi nhuận ròng là 8,4 triệu euro vào năm 2023. Con số này thấp hơn mức 164 triệu euro, lợi nhuận ròng 24 triệu euro kiếm được vào năm 2022 (bao gồm một tuần bổ sung để bù đắp cho những năm đại dịch).</div>
            <div className='info3'>Năm 2023, Tỉnh Antwerp và các thành phố Boom và Rumst thông báo rằng họ đã đạt được thỏa thuận với WeAreOne.World để cho phép Tomorrowland tiếp tục sử dụng De Schorre trong 66 năm tiếp theo.</div>
            <img className={'img2023-1'} src={img2023_1} alt="" style={{ margin: '5px' }} />
            <img className={'img2023-2'} src={img2023_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2023-3'} src={img2023_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2023-4'} src={img2023_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2023-5'} src={img2023_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2023-6'} src={img2023_6} alt="" style={{ margin: '5px' }} />
          </div>
          <div className='content4'>
            <img className={'img2023-tt'} src={img2023_tt} alt="" style={{ margin: '5px' }} />
            <div className='info4'>
                <p>2023 là năm đầu tiên lễ hội kết hợp với Tiktok về việc hợp tác nội dung cho lễ hội bao gồm livestream, playlists trên app và kênh tìm kiếm cho người hâm mộ, với những thông tin, nội dung về nghệ sĩ trình diễn.</p>
                <p>Michael Kümmerle, Trưởng nhóm phát triển kinh doanh, Nội dung âm nhạc toàn cầu & Quan hệ đối tác của TikTok chia sẻ trên thông báo chính thức: <i>“Chúng tôi rất vui với lần hợp tác cùng Tomorrowland, một trong những lễ hội lớn nhất và mang tính biểu tượng nhất trên thế giới. Với những nghệ sĩ huyền thoại và khán giả toàn cầu, Tomorrowland là tổ chức lễ hội hoàn hảo cho cộng đồng những người yêu nhạc điện tử đang phát triển trên nền tảng TikTok.”</i></p>
            </div>
            <img className={'img2023-tt2'} src={img2023_tt2} alt="" style={{ margin: '5px' }} />
          </div>
          <div className='button'>
             <button onClick={handleGoToShop}>
                Bạn muốn mua một vài món đồ lưu niệm? ĐẾN SHOP NGAY! <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Year2023;