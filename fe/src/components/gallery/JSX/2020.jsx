import React, { useState } from 'react';
import img2020 from './2020-1.jpg';
import img2020_2 from './2020-2.jpg';
import img2020_3 from './2020-3.jpg';
import img2020_4 from './2020-4.jpg';
import img2020_5 from './2020-5.jpg';
import img2020_6 from './2020-6.jpg';
import img2020_7 from './2020-7.jpg';
import img2020_8 from './2020-8.jpg';

import '../CSS/2020.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2020 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2019 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2019');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2021 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2021');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2020 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2020'} src={img2020} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2019}>
                2019 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2021}>
                2021 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2020</b></div>
          <div className='info'>Một năm sau lễ kỷ niệm, Tomorrowland đã chọn "The Reflection of Love" làm chủ đề, vốn đã được lén lút tiết lộ trên sân khấu chính vào năm 2019, vì có một cuốn sách có tựa đề đó ở gần giữa bên phải sân khấu với "2020" bằng chữ số La Mã....
</div>
          <div className='content1'>
          <iframe width="40%" height="320px" src="https://www.youtube.com/embed/JP3lH6l6Hsw"></iframe>
          <div className='info2'>Nhưng vào ngày 15 tháng 4, Tomorrowland thông báo rằng lễ hội năm 2020 sẽ không diễn ra do đại dịch COVID-19. Vào ngày 4 tháng 6, Tomorrowland thông báo một lễ hội ảo sẽ diễn ra thay cho phiên bản năm 2020. Sự kiện ảo có tên "Tomorrowland Around the World", diễn ra vào ngày 25 và 26 tháng 7 năm 2020.</div>
          </div>
          <div className='content2'>
            <div className='info3'>Nhà tổ chức đã sử dụng Unreal Engine 4 để tạo môi trường ảo được sử dụng trong sự kiện.</div>
            <iframe width="45%" height="320px" src="https://www.youtube.com/embed/XOeub7d44E4" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content2'>
            <div className='info3'>Tomorrowland cũng tổ chức lễ hội đón năm mới ảo vào ngày 31 tháng 12, diễn ra từ 8 giờ tối đến 3 giờ sáng theo từng múi giờ.</div>
            <iframe width="45%" height="320px" src="https://www.youtube.com/embed/lKQGIeaWG9c" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2020-2'} src={img2020_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2020-3'} src={img2020_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2020-4'} src={img2020_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2020-5'} src={img2020_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2020-6'} src={img2020_6} alt="" style={{ margin: '5px' }} />
            <img className={'img2020-7'} src={img2020_7} alt="" style={{ margin: '5px' }} />
            <img className={'img2020-8'} src={img2020_8} alt="" style={{ margin: '5px' }} />
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

export default Year2020;