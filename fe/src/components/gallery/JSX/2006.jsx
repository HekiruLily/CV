import React, { useState } from 'react';
import img2006 from './2006-1.jpg';
import img2006_2 from './2006-2.jpg';
import img2006_3 from './2006-3.jpg';
import img2006_4 from './2006-4.jpg';
import img2006_5 from './2006-5.jpg';
import img2006_6 from './2006-6.jpg';

import '../CSS/2006.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2006 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2005 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2005');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2007 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2007');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2006 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2006'} src={img2006} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2005}>
                2005 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2007}>
                2007 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2006</b></div>
          <div className='info'>Đến năm thứ 2, tên tuổi của Tomorrowland dường như đã lan toả vượt ra khỏi ranh giới nước Bỉ với con số người tham dự lên đến 15.000 người, rộng lớn hơn về quy mô cùng 8 sân khấu khác nhau. Mainstage (sân khấu chính) 2006 được thiết kế với logo gốc hai bên và một con mắt to chính giữa cùng hệ thống phun lửa cực kì hiện đại lúc bấy giờ.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/egniyvuSEVc"></iframe>
          <div className='info2'>Lễ hội được tổ chức vào ngày 30 tháng 7 năm 2006, với sự tham gia của Armin van Buuren Axwell, Marco Bailey, Fred Baker, David Guetta, Ruthless và DJ Zany. DJ, nhà sản xuất Paul Oakenfold cũng đã được công bố trên poster, nhưng đã hủy lịch vào phút cuối, khi anh đi tour với Madonna vào thời điểm đó. Emjay, nhà sản xuất của "Stimulate", đã biểu diễn trên sân khấu chính với The Atari Babies.</div>
          </div>
          <div className='content2'>
            <img className={'img2006-2'} src={img2006_2} alt="" style={{ margin: '5px' }} />
            <iframe width="31%" height="250px" src="https://www.youtube.com/embed/YqoqxpqY4Wk" style={{ margin: '5px' }}></iframe>
            <img className={'img2006-3'} src={img2006_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2006-4'} src={img2006_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2006-5'} src={img2006_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2006-6'} src={img2006_6} alt="" style={{ margin: '5px' }} />
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

export default Year2006;