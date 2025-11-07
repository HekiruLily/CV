import React, { useState } from 'react';
import img2013 from './2013-1.jpg';
import img2013_2 from './2013-2.jpg';
import img2013_3 from './2013-3.jpg';
import img2013_4 from './2013-4.jpg';
import img2013_5 from './2013-5.jpg';
import img2013_6 from './2013-6.jpg';
import img2013_7 from './2013-7.jpg';

import '../CSS/2013.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2013 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2012 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2012');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2014 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2014');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2013 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2013'} src={img2013} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2012}>
                2012 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2014}>
                2014 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2013</b></div>
          <div className='info'>Tomorrowland 2013 đã diễn ra từ ngày 26 đến 28 tháng 7 và đạt 180.000 người tham dự tại De Schorre ở Boom, Bỉ. Vé được bán hết một cách điên cuồng trong 35 phút. Lễ hội cũng đưa ra các gói Global Journey và Brussels Airlines có 140 chuyến bay bổ sung từ 67 thành phố khác nhau trên khắp thế giới để đưa khách tham gia từ 214 quốc gia khác nhau đến Boom, Bỉ.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/cUhPA5qIxDQ"></iframe>
          <div className='info2'>Thu hút 180.000 người đến tham dự, chủ đề “The Arising of Life” – Thăng hoa cuộc sống đã biến mainstage của Tomorrowland 2013 trở thành một ngọn núi lửa đang phun trào như đưa khán giả đến với thời kì tiền sử.</div>
          </div>
          <div className='content2'>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/ZG1AT6tylA4" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/Wp-pSfAApa8" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/INCxY-Nne4M" style={{ margin: '5px' }}></iframe>
            <img className={'img2013-2'} src={img2013_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2013-3'} src={img2013_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2013-4'} src={img2013_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2013-5'} src={img2013_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2013-6'} src={img2013_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2013-7'} src={img2013_7} alt="" style={{ margin: '5px' }} />
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

export default Year2013;