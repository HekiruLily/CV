import React, { useState } from 'react';
import img2019 from './2019-1.jpg';
import img2019_2 from './2019-2.jpg';
import img2019_3 from './2019-3.jpg';
import img2019_4 from './2019-4.jpg';
import img2019_5 from './2019-5.jpg';
import img2019_6 from './2019-6.jpg';
import img2019_8 from './2019-8.jpg';
import img2019_9 from './2019-9.jpg';
import img2019_11 from './2019-11.jpg';


import '../CSS/2019.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2019 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2018 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2018');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2020 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2020');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2019 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2019'} src={img2019} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2018}>
                2018 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2020}>
                2020 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2019</b></div>
          <div className='info'>Nhân kỷ niệm 15 năm thành lập, mainstage năm 2019 được lấy từ thiết kế của sân khấu của năm 2012 với chủ đề “The Book of Wisdom – The Return (Cuốn sách trí tuệ – Sự trở lại). Đây là một sự hồi sinh của chủ đề năm 2012 với thông điệp nâng cao kiến thức về sản xuất sân khấu của lễ hội âm nhạc.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/hvIg3PTJWxs"></iframe>
          <div className='info2'>Điều đặc biệt trong sân khấu năm 2019 chính là quyển sách có tên của DJ huyền thoại Avicii – Tim Bergling, xuất hiện trên cùng bên phải sân khấu như một sự tưởng niệm về anh. Tomorrowland 2019 đã thu hút hơn 400.000 người tham dự và cũng diễn ra vào 3 ngày cuối tuần trong 2 tuần liên tiếp (19–21 và 26–28 tháng 7 năm 2019).</div>
          </div>
          <div className='content2'>
            <div className='info3'>200.000 bản tiểu thuyết giả tưởng phiên bản giới hạn của Sarah Maria Griffin đã được phát hành trong những chiếc hộp trang trí có ngăn ẩn dành cho những người đăng ký tham gia lễ hội.</div>
            <img className={'img2012-2'} src={img2019_11} alt="" style={{ margin: '5px' }} />
          </div>
          <div className='content3'>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/iqt4-cJExWE"></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/Uu523VQWvl0"></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/UaWrX_rWFtE"></iframe>
            <img className={'img2012-2'} src={img2019_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-9'} src={img2019_9} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-4'} src={img2019_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-5'} src={img2019_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-6'} src={img2019_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-8'} src={img2019_8} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-3'} src={img2019_3} alt="" style={{ margin: '5px' }} />

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

export default Year2019;