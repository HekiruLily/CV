import React, { useState } from 'react';
import img2022 from './2022-1.jpg';
import img2022_2 from './2022-2.jpg';
import img2022_3 from './2022-3.jpg';
import img2022_5 from './2022-5.jpg';
import img2022_6 from './2022-6.jpg';
import img2022_7 from './2022-7.jpg';
import img2022_8 from './2022-8.jpg';
import img2022_9 from './2022-9.jpg';
import img2022_10 from './2022-10.jpg';


import '../CSS/2022.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2022 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2021 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2021');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2023 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2023');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2022 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2022'} src={img2022_10} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2021}>
                2021 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2023}>
                2023 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2022</b></div>
          <div className='info'>Vào năm 2022, Tomorrowland đã quay trở lại hoành tráng sau đại dịch với khung cảnh đẹp đẽ và độc đáo của De Schorre, chào đón hơn 600.000 lượt du khách trong 3 tuần (15-17, 22-24, 29-31 tháng 7 năm 2022). Phiên bản thứ 16 xoay quanh một câu chuyện mới ‘The Reflection of Love’, tượng trưng cho năng lượng tích cực mà lễ hội đại diện.</div>
          <div className='content1'>
          <iframe width="40%" height="270px" src="https://www.youtube.com/embed/4a-WM6ab8Tk"></iframe>
          <div className='info2'>Sân khấu chính 100% được sản xuất tại địa phương, với chiều cao lớn nhất từ trước đến nay - 53m và rộng 270m cùng với hệ thống âm thanh ánh sáng hiện đại. Khoảng 800 nghệ sĩ đã tham gia trình diễn trong suốt 3 tuần của lễ hội</div>
          </div>
          <div className='content2'>
            <iframe width="45%" height="280px" src="https://www.youtube.com/embed/h57BL_APNJU" style={{ margin: '5px' }}></iframe>
            <iframe width="45%" height="280px" src="https://www.youtube.com/embed/s2u1hw8HDPU" style={{ margin: '5px' }}></iframe>
            <iframe width="45%" height="280px" src="https://www.youtube.com/embed/d5c9VbQQrKg" style={{ margin: '5px' }}></iframe>
            <iframe width="45%" height="280px" src="https://www.youtube.com/embed/GdMtN5Ifm-I" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2022-2'} src={img2022_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-3'} src={img2022_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-5'} src={img2022_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-6'} src={img2022_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-7'} src={img2022_7} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-8'} src={img2022_8} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-9'} src={img2022_9} alt="" style={{ margin: '5px' }} />
            <img className={'img2022-2'} src={img2022} alt="" style={{ margin: '5px' }} />
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

export default Year2022;