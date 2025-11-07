import React, { useState } from 'react';
import img2014 from './2014-1.jpg';
import img2014_2 from './2014-2.jpg';
import img2014_3 from './2014-3.jpg';
import img2014_4 from './2014-4.jpg';
import img2014_5 from './2014-5.jpg';
import img2014_6 from './2014-6.jpg';
import img2014_7 from './2014-7.jpg';
import img2014_8 from './2014-8.jpg';
import img2014_9 from './2014-9.jpg';

import '../CSS/2014.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2014 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2013 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2013');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2015 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2015');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2014 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2014'} src={img2014} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2013}>
                2013 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2015}>
                2015 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2014</b></div>
          <div className='info'>Để kỷ niệm 10 năm lễ hội và để đáp ứng nhu cầu vé cao, Tomorrowland 2014 được tổ chức trong hai tuần; 18-20 tháng 7 và 25-27 tháng 7 năm 2014. Con số người tham gia kỉ lục lên đến 360.000 người đến từ 241 quốc gia. Mất chưa đến 1 giờ để bán hết vé và danh sách chờ mua vé lên đến 2 triệu người.</div>
          <div className='content1'>
          <iframe width="40%" height="320px" src="https://www.youtube.com/embed/NtDG-Cnj-pw"></iframe>
          <div className='info2'>Với thông điệp “Hân hoan chào đón cuộc sống, kết nối những trái tim từ khắp nơi trên thế giới. Chung một thế giới, chung một tình yêu”, Tomorrowland 2014 đã chọn cho mình chủ đề “The Key to Happiness – Chìa khoá hạnh phúc” với thiết kế là một khuôn mặt hiền lành làm tâm điểm của sân khấu.</div>
          </div>
          <div className='content2'>
            <iframe width="30%" height="300px" src="https://www.youtube.com/embed/Pz5b_qoQ51g" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="300px" src="https://www.youtube.com/embed/xg7sptEx0Ms" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="300px" src="https://www.youtube.com/embed/y6ClrLmdT2A" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <div className='info3'>Vào tháng 4 năm 2014, MTV đã tuyên bố sẽ sản xuất hai chương trình đặc biệt MTV World Stage gồm hai buổi trình diễn từ lễ hội (được phát sóng vào tháng 8 năm 2014) và sẽ sản xuất một bộ phim tài liệu xoay quanh ngày kỷ niệm 10 năm thành lập Tomorrowland. Ngày 16 tháng 4, nhà soạn nhạc Hans Zimmer và Tomorrowland đã thông báo rằng họ đã hợp tác để sáng tác một bài thánh ca cổ điển sẽ ra mắt trong lần ấn bản kỷ niệm 10 năm của lễ hội</div>
            <iframe width="30%" height="320px" src="https://www.youtube.com/embed/LcbuVCRdd6E" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content4'>
            <img className={'img2014-2'} src={img2014_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-3'} src={img2014_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-4'} src={img2014_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-5'} src={img2014_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-6'} src={img2014_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-7'} src={img2014_7} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-8'} src={img2014_8} alt="" style={{ margin: '5px' }} />
            <img className={'img2014-9'} src={img2014_9} alt="" style={{ margin: '5px' }} />
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

export default Year2014;