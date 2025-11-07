import React, { useState } from 'react';
import img2015 from './2015-1.jpg';
import img2015_2 from './2015-2.jpg';
import img2015_3 from './2015-3.jpg';
import img2015_4 from './2015-4.jpg';
import img2015_5 from './2015-5.jpg';
import img2015_6 from './2015-6.jpg';
import img2015_7 from './2015-7.jpg';
import img2015_8 from './2015-8.jpg';
import img2015_9 from './2015-9.jpg';


import '../CSS/2015.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2015 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2014 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2014');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2016 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2016');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2015 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2015'} src={img2015} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2014}>
                2014 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2016}>
                2016 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2015</b></div>
          <div className='info'>Lễ hội được diễn ra trong 3 ngày (24-26/7/2015), thu hút 180.000 khách tham dự. Lấy cảm hứng từ những nhà thờ lớn, sân khấu chính của Tomorrowland 2015 được xây dựng với chủ đề “The Secret Kingdom of Melodia – Vương quốc bí mật của giai điệu” có chiều cao xếp thứ 2 từ trước cho đến nay (chỉ sau 2022)</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/HuAxVfZasUk"></iframe>
          <div className='info2'>Vào Chủ Nhật, Dàn nhạc Quốc gia Bỉ đã mang đến “The Symphony of Unity”, một sự kết hợp trực tiếp giữa các bản nhạc điện tử phổ biến và nhạc cổ điển</div>
          </div>
          <div className='content2'>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/Q4KkfiLRLdQ" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/Gm_PThzzlQE" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/tUzjgSU_3sM" style={{ margin: '5px' }}></iframe>          
            </div>
          <div className='content3'>
            <img className={'img2015-2'} src={img2015_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-3'} src={img2015_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-4'} src={img2015_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-5'} src={img2015_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-6'} src={img2015_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-7'} src={img2015_7} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-8'} src={img2015_8} alt="" style={{ margin: '5px' }} />
            <img className={'img2015-9'} src={img2015_9} alt="" style={{ margin: '5px' }} />
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

export default Year2015;