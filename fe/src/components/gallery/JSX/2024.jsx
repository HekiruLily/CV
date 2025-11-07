import React, { useState } from 'react';
import img2024_1 from './2024-1.jpg';
import img2024_2 from './2024-2.jpg';
import img2024_3 from './2024-3.jpg';
import img2024_4 from './2024-4.jpg';
import img2024_5 from './2024-5.jpg';
import img2024_6 from './2024-6.jpg';
import img2024 from './2024-main.jpg';




import '../CSS/2024.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2024 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2023 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2023');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2005 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2005');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2024 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2024'} src={img2024} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2023}>
                2023 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2005}>
                2005 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2024</b></div>
          <div className='info'>Vào năm 2024, hơn 400.000 lượt khách du lịch từ hơn 200 quốc gia đã cùng nhau kỷ niệm phiên bản kỷ niệm 20 năm của Tomorrowland, diễn ra từ 19-21 và 26-28 tháng 7 năm 2024. Với phiên bản đặc biệt này, Tomorrowland đã sử dụng một chủ đề với rất nhiều tầng ý nghĩa, đó là “LIFE” – phần tiền truyện của của chủ đề “Elixir of Life” năm 2016.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/txF-_9u8ukE"></iframe>
          <div className='info2'> Sân khấu chính của năm nay ví như một “khu vườn trên mây” với rất nhiều chi tiết liên quan đến thiên nhiên như rễ cây, hoa, lá… và để tạo nên một sân khấu “khổng lồ” như vậy, Ban tổ chức của Tomorrowland đã mất đến gần 2 năm để hoàn thiện bản phác thảo.</div>
          </div>
          <div className='content2'>
            <iframe width="30%" height="280px" src="https://www.youtube.com/embed/g7O-7rF0Hqk" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="280px" src="https://www.youtube.com/embed/dSK13X9oGi8" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="280px" src="https://www.youtube.com/embed/8Tk9IERWa2s" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <div className='info3'>Một quá trình cực kỳ phức tạp, trong đó mọi chi tiết đều quan trọng và chỉ có thể đạt được thông qua sự phối hợp chặt chẽ giữa nhiều nhóm, đội ngũ khác nhau trong Tomorrowland, niềm đam mê và sức sáng tao không ngừng nghỉ đã góp phần tạo nên một sân khấu chính đầy mê hoặc, xứng tầm với lễ hội âm nhạc điện tử hàng đầu thế giới hiện nay.</div>
            <img className={'img2024-1'} src={img2024_1} alt="" style={{ margin: '5px' }} />
            <img className={'img2024-2'} src={img2024_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2024-3'} src={img2024_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2024-4'} src={img2024_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2024-5'} src={img2024_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2024-6'} src={img2024_6} alt="" style={{ margin: '5px' }} />
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

export default Year2024;