import React, { useState } from 'react';
import img2011 from './2011-1.png';
import img2011_2 from './2011-2.jpg';
import img2011_3 from './2011-3.jpg';
import img2011_4 from './2011-4.jpg';
import img2011_5 from './2011-5.jpg';
import img2011_6 from './2011-6.jpg';
import img2011_7 from './2011-7.jpg';
import '../CSS/2011.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2011 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2010 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2010');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2012 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2012');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2011 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2011'} src={img2011} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2010}>
                2010 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2012}>
                2012 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2011</b></div>
          <div className='info'>Năm 2011 đánh dấu sự mở rộng của lễ hội lên ba ngày (22-24/7/2011). Nhu cầu mua vé bắt đầu gia tăng nhiều hơn khi có đến 180.000 vé được bán ra và nhanh chóng bán hết trong chưa đầy một ngày David Guetta, Nervo, Swedish House Mafia, Avicii, Tiësto, Hardwell, Carl Cox, Paul van Dyk, Tensnake, Laidback Luke, Brodinski, Juanma Tudon, Mike Matthews, De Jeugd van Tegenwoordig và hàng chục nghệ sĩ khác đã tham gia biểu diễn. Lễ hội được bình chọn là Lễ hội âm nhạc điện tử tốt nhất thế giới tại Giải thưởng International Dance Music Awards in 2012.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/M7CdTAiaLes"></iframe>
          <div className='info2'>Sân khấu chính của Tomorrowland 2011 lấy chủ đề “The Tree Of Life” (Cây đời) với hình ảnh một cây sồi khổng lồ cùng khu rừng nấm mê hoặc, kẹo mút, thác nước và laser được bắn ra từ mắt của các nhân vật được trang trí.</div>
          </div>
          <div className='content2'>
            <iframe width="45%" height="300px" src="https://www.youtube.com/embed/-U24PnoAcjI" style={{ margin: '5px' }}></iframe>
            <iframe width="45%" height="300px" src="https://www.youtube.com/embed/eChdxmjHoMw" style={{ margin: '5px' }}></iframe>
            <iframe width="45%" height="300px" src="https://www.youtube.com/embed/ccS6ZrdwuB4" style={{ margin: '5px' }}></iframe>
            <iframe width="45%" height="300px" src="https://www.youtube.com/embed/Er_1j0NI8VA" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2011-2'} src={img2011_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2011-3'} src={img2011_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2011-4'} src={img2011_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2011-5'} src={img2011_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2011-6'} src={img2011_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2011-7'} src={img2011_7} alt="" style={{ margin: '5px' }} />
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

export default Year2011;