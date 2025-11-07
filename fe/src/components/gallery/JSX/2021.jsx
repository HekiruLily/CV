import React, { useState } from 'react';
import img2021 from './2021-1.jpg';
import img2021_2 from './2021-2.jpg';
import img2021_3 from './2021-3.jpg';
import img2021_4 from './2021-4.jpg';
import img2021_5 from './2021-5.jpg';
import img2021_6 from './2021-6.jpg';
import img2021_7 from './2021-7.jpg';

import '../CSS/2021.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2021 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2020 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2020');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2022 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2022');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2021 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2021'} src={img2021} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2020}>
                2010 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2022}>
                2022 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2021</b></div>
          <div className='info'>Vào ngày 17 tháng 3 năm 2021, Tomorrowland thông báo sẽ trì hoãn sự trở lại của lễ hội cho đến cuối tháng 8 và đầu tháng 9. Động thái này là một nỗ lực nhằm làm cho lễ hội trở nên an toàn hơn trong bối cảnh tỷ lệ lây nhiễm COVID-19 đang giảm và sự hiệu quả của các chương trình tiêm chủng. Động thái này có thể khiến lễ hội diễn ra muộn hơn 5 tuần so với ngày thường lệ vào cuối tháng 7....</div>
          <div className='content1'>
          <iframe width="40%" height="270px" src="https://www.youtube.com/embed/fa8Y5poA1MY"></iframe>
          <div className='info2'>Vào tháng 4, Tomorrowland thông báo rằng phiên bản thứ hai của Tomorrowland Around the World sẽ diễn ra vào những ngày cuối của tháng 7. Mặc dù Bỉ có kế hoạch cho phép các sự kiện ngoài trời quy mô lớn với tối đa 75.000 người bắt đầu từ ngày 13 tháng 8 năm 2021, nhưng vào ngày 17 tháng 6, thị trưởng của Boom và Rumst đã cùng tuyên bố rằng họ sẽ từ chối cấp phép tổ chức Tomorrowland, với lý do lo ngại về du lịch quốc tế và Biến thể Delta. Vào ngày 23 tháng 6, lễ hội bị hủy bỏ lần thứ hai.</div>
          </div>
          <div className='content2'>
            <iframe width="45%" height="320px" src="https://www.youtube.com/embed/51mpXgqDk-c" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2021-2'} src={img2021_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2021-3'} src={img2021_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2021-4'} src={img2021_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2021-5'} src={img2021_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2021-6'} src={img2021_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2021-7'} src={img2021_7} alt="" style={{ margin: '5px' }} />
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

export default Year2021;