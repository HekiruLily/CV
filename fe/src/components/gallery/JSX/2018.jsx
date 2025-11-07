import React, { useState } from 'react';
import img2018 from './2018-1.jpg';
import img2018_2 from './2018-2.jpg';
import img2018_3 from './2018-3.jpg';
import img2018_4 from './2018-4.jpg';
import img2018_5 from './2018-5.jpg';
import img2018_6 from './2018-6.jpg';
import img2018_7 from './2018-7.jpg';
import img2018_8 from './2018-8.jpg';
import img2018_10 from './2018-10.jpg';


import '../CSS/2018.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2018 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2017 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2017');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2019 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2019');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2018 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2018'} src={img2018} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2017}>
                2017 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2019}>
                2019 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2018</b></div>
          <div className='info'>Lễ hội diễn ra vào ngày 20–22 tháng 7 và 27–29 tháng 7, vé được bán hết trong vòng một giờ với tổng cộng 400.000 vé được bán ra. Mainstage được thiết kế theo chủ đề “The Story Of Planaxis – Câu chuyện về Planaxis” mang đến một thế giới thần tiên, biến sân khấu chính thành một đại dương với những bãi san hô, những vỏ ốc và trung tâm sân khấu là một chú cá ngựa khổng lồ</div>
          <div className='content1'>
          <iframe width="40%" height="300px" src="https://www.youtube.com/embed/HkyVTxH2fIM"></iframe>
          <div className='info2'>Phiên bản này cũng đánh dấu sự trở lại của Hardwell kể từ năm 2015. Lễ hội cũng chứng kiến ​​nhiều sự tưởng nhớ của Avicii để tưởng nhớ sự ra đi của DJ người Thụy Điển, diễn ra ba tháng trước lễ hội. Ca khúc "Levels" và "Wake Me Up" của Avicii lần lượt đứng thứ hai và thứ tám trong các bài hát được phát nhiều nhất tại Tomorrowland 2018. Digital Spy mô tả sự kiện này là "lễ hội hoàn thiện nhất trên trái đất", với nhược điểm duy nhất là giá vé vào cửa.</div>
          </div>
          <div className='content2'>
             <iframe width="30%" height="250px" src="https://www.youtube.com/embed/xVWs0ti0J90" style={{ margin: '5px' }}></iframe>
             <iframe width="30%" height="250px" src="https://www.youtube.com/embed/Y8N9vxYxWcc" style={{ margin: '5px' }}></iframe>
             <iframe width="30%" height="250px" src="https://www.youtube.com/embed/YMlSytmzQK0" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2018-2'} src={img2018_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2018-3'} src={img2018_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2018-4'} src={img2018_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2018-5'} src={img2018_5} alt="" style={{ margin: '5px' }} />
            <iframe width="30%" height="250px" src="https://www.youtube.com/embed/Lpjcm1F8tY8" style={{ margin: '5px' }}></iframe>
            <img className={'img2018-6'} src={img2018_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2018-7'} src={img2018_7} alt="" style={{ margin: '5px' }} />
            <img className={'img2018-8'} src={img2018_8} alt="" style={{ margin: '5px' }} />
            <img className={'img2018-10'} src={img2018_10} alt="" style={{ margin: '5px' }} />
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

export default Year2018;