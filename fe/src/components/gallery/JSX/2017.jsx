import React, { useState } from 'react';
import img2017 from './2017-1.jpg';
import img2017_2 from './2017-2.jpg';
import img2017_3 from './2017-3.jpg';
import img2017_4 from './2017-4.jpg';
import img2017_5 from './2017-5.jpg';

import '../CSS/2017.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2017 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2016 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2016');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2018 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2018');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2017 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2017'} src={img2017} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2016}>
                2016 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2018}>
                2018 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2017</b></div>
          <div className='info'>Tomorrowland 2017 chứng kiến ​​sự mở rộng thành một sự kiện kéo dài hai tuần lần đầu tiên kể từ năm 2014 (21–23 và 28–30 tháng 7). Số lượng vé bán ra 1 cách kỷ lục với khoảng 400.000 vé. Lễ hội còn có sự tham dự của Vua Philippe và Hoàng hậu Mathilde. Tính đến cuối tháng 8, Tomorrowland 2017 đã trở thành sự kiện âm nhạc mạng xã hội lớn nhất thế giới vào thời điểm đó, đạt hơn 1,2 tỷ lượt xem từ hơn 200 triệu người.</div>
          <div className='content1'>
          <iframe width="40%" height="320px" src="https://www.youtube.com/embed/O1L1F0NZBXQ"></iframe>
          <div className='info2'>Chủ đề “Amicorum Spectaculum – Những người bạn diễn” đã biến mainstage của Tomorrowland thành một rạp xiếc khổng lồ với những diễn viên xiếc chuyên nghiệp trên toàn thế giới thực hiện các màn đi trên dây ở độ cao chót vót đầy ấn tượng. Một chương trình hiếm khi được xem, một cuộc hội tụ những tài năng khiến bạn phải kinh ngạc.</div>
          </div>
          <div className='content2'>
            <div className='info3'>
            <p>“It’s an amazing feeling to know that while you’re getting goosebumps at the MainStage in Belgium, literally millions of people around the world are watching my performance, even organizing home parties and having an amazing time as well.” – Armin van Buuren</p>
            <p><i>Tạm dịch: “Thật là một cảm giác tuyệt vời khi biết rằng trong khi bạn đang nổi da gà tại mainstage ở Bỉ, thì thực sự có hàng triệu người trên khắp thế giới đang xem màn trình diễn của tôi, thậm chí còn tổ chức các bữa tiệc tại nhà và có khoảng thời gian tuyệt vời nữa.”</i></p>
            </div>
            <iframe width="45%" height="320px" src="https://www.youtube.com/embed/9vQ6X_xFSYw" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content2'>
            <div className='info3'>
            <p>“Not only has the growth of the event itself been amazing but also the content that they produce, like the live registration and after-movie. It just gets better and better each year. I think it’s great that people at home can watch the live stream and experience the festival as if they were there themselves.” – David Guetta</p>
            <p><i>Tạm dịch: “Không chỉ sự phát triển đáng kinh ngạc của bản thân sự kiện mà còn cả nội dung họ sản xuất, như đăng ký trực tiếp và aftermovie. Nó chỉ ngày càng tốt hơn mỗi năm. Tôi nghĩ thật tuyệt khi mọi người ở nhà có thể xem luồng trực tiếp và trải nghiệm lễ hội như thể chính họ đang ở đó ”</i></p>
            </div>
            <iframe width="45%" height="320px" src="https://www.youtube.com/embed/sSX9YlNuUpc" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2017-2'} src={img2017_2} alt="" style={{ margin: '5px' }} />
            <iframe width="30%" height="250px" src="https://www.youtube.com/embed/g_s17HMFaug"></iframe>
            <img className={'img2017-3'} src={img2017_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2017-4'} src={img2017_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2017-5'} src={img2017_5} alt="" style={{ margin: '5px' }} />
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

export default Year2017;