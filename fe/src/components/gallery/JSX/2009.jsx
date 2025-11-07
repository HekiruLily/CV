import React, { useState } from 'react';
import img2009 from './2009-1.jpg';
import img2009_2 from './2009-2.jpg';
import img2009_3 from './2009-3.jpg';
import img2009_4 from './2009-4.jpg';


import '../CSS/2009.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2009 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2008 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2008');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2010 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2010');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2009 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2009'} src={img2009} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2008}>
                2008 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2010}>
                2010 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2009</b></div>
          <div className='info'>Năm 2009 là năm đầu tiên trong lịch sử khi đã bán hết toàn bộ 90.000 vé, sức hút của lễ hội đã phá vỡ mọi kỉ lục trước đó, danh tiếng của Tomorrowland bắt đầu lan toả khắp thế giới. Đây là năm sân khấu chính thay đổi rõ rệt nhất, đầu tư công phu nhất lúc đó.</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/0S3mldr4tsg"></iframe>
          <div className='info2'>Được tổ chức trong 2 ngày 26-27/7/2009 với chủ đề Masker (mặt nạ), mainstage được trang trí với một khuôn mặt quái dị và nụ cười điên rồ. Những người tham dự cho rằng mainstage này thật đáng sợ vì nó giống một con bạch tuột khổng lồ có ria mép và biết son môi đỏ chót.
</div>
          </div>
          <div className='content2'>
            <iframe width="45%" height="300px" src="https://www.youtube.com/embed/h7fNvfj2Pq4" style={{ margin: '5px' }}></iframe>
            <div className='info3'>Với lần thứ năm, ID&T đã cho tổ chức ở nhiều địa điểm hơn. La Rocca lần đầu tiên biểu diễn trực tiếp tại lễ hội. Màn diễn chính đặc biệt nhất năm đó là của Moby.</div>
            <iframe width="45%" height="300px" src="https://www.youtube.com/embed/0c6FGw64Lc0" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2009-2'} src={img2009_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2009-3'} src={img2009_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2009-4'} src={img2009_4} alt="" style={{ margin: '5px' }} />
            <iframe width="30%" height="250px" src="https://www.youtube.com/embed/4Ju2C_5f8r8" style={{ margin: '5px' }}></iframe>
            <iframe width="30%" height="250px" src="https://www.youtube.com/embed/stWOb6utyC8" style={{ margin: '5px' }}></iframe>
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

export default Year2009;