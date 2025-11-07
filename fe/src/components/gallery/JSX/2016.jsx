import React, { useState } from 'react';
import img2016 from './2016-1.jpg';
import img2016_2 from './2016-2.jpg';
import img2016_3 from './2016-3.jpg';
import img2016_4 from './2016-4.jpg';
import img2016_5 from './2016-5.jpg';
import img2016_6 from './2016-6.jpg';
import img2016_7 from './2016-7.jpg';
import img2016_8 from './2016-8.jpg';
import img2016_9 from './2016-9.jpg';
import img2016_10 from './2016-10.jpg';

import '../CSS/2016.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2016 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2015 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2015');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2017 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2017');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2016 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2016'} src={img2016} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2015}>
                2015 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2017}>
                2017 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2016</b></div>
          <div className='info'>Diễn ra vào 3 ngày 22-23-24/7 năm 2016, Tomorrowland đã chào mừng phiên bản thứ 12 với số vé bán ra là 180.000 vé. Với chủ đề “The Elixir of Life – Thần dược cuộc sống”, sân khấu chính được trang trí với những tán cây to tạo cho người tham dự cảm giác như đi lạc vào một khu rừng.</div>
          <div className='content1'>
            <iframe width="40%" height="350px" src="https://www.youtube.com/embed/AtdnWYqbMwc" style={{ margin: '5px' }}></iframe>
            <iframe width="40%" height="350px" src="https://www.youtube.com/embed/089IRvkNAGg" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content2'>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/sq0GW1nRsYo" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/exsSSKmRhfc" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/3pyAdlF1A6c" style={{ margin: '5px' }}></iframe>
            <img className={'img2016-2'} src={img2016_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-3'} src={img2016_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-4'} src={img2016_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-5'} src={img2016_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-6'} src={img2016_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-7'} src={img2016_7} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-8'} src={img2016_8} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-9'} src={img2016_9} alt="" style={{ margin: '5px' }} />
            <img className={'img2016-10'} src={img2016_10} alt="" style={{ margin: '5px' }} />
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

export default Year2016;