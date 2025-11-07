import React, { useState } from 'react';
import img2012 from './2012-1.jpg';
import img2012_2 from './2012-2.jpg';
import img2012_3 from './2012-3.jpg';
import img2012_4 from './2012-4.jpg';
import img2012_5 from './2012-5.jpg';
import img2012_6 from './2012-6.jpg';

import '../CSS/2012.css';

import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2012 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2011 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2011');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2013 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2013');
    }, 300); // Thời gian trượt
  };


  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2012 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2012'} src={img2012} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2011}>
                2011 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2013}>
                2013 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2012</b></div>
          <div className='info'>Tomorrowland 2012 đã diễn ra từ ngày 27 đến ngày 29 tháng 7 năm 2012 tại De Schorre, khu giải trí của tỉnh Boom, Bỉ, cách Antwerp 16 km về phía Nam và cách Brussels 32 km về phía Bắc. Tham gia biểu diễn gồm 400 DJ trên 15 sân khấu mỗi ngày. Hơn 2.000.000 người đã truy cập vào trang web lễ hội với hy vọng giành được một tấm vé. Hơn 180.000 người từ hơn 75 quốc gia trên thế giới đã tham dự.</div>
          <div className='content1'>
          <iframe width="40%" height="270px" src="https://www.youtube.com/embed/a37KMrSVh-k"></iframe>
          <div className='info2'>Với chủ đề “The Book Of Wisdom” (Cuốn sách trí tuệ), sân khấu chính được thiết kế hoàn toàn dựa trên kịch bản về cách xây dựng từng giai đoạn của lễ hội qua các năm</div>
          </div>
          <div className='content2'>
            <div className='info3'>Do đây là sự kiện âm nhạc được tổ chức thường niên tại Bỉ, ID&T đã quyết định cho người Bỉ được phép mua trước 80.000 vé (trên 180.000 vé) và số vé này đã bán hết trong vòng chỉ 1 ngày (ngày 24/3). Việc bán vé trên toàn thế giới bắt đầu vào ngày 7 tháng 4. Trong vòng 43 phút, 100.000 vé khác đã được bán hết. Ngoài các vé thông thường, Tomorrowland hợp tác với Brussels Airlines để cung cấp các gói du lịch độc quyền từ hơn 15 thành phố trên thế giới. Những điểm nổi bật khác của lễ hội là Cloud Rider, bánh xe Ferris di động cao nhất ở châu Âu, và có 25 hãng hàng không đã được tổ chức để đưa khán giả đến với lễ hội từ khắp nơi trên thế giới.</div>
            <iframe width="45%" height="320px" src="https://www.youtube.com/embed/UWb5Qc-fBvk" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <div className='info3'>Cùng năm, lễ hội ra mắt kênh YouTube riêng – phát sóng các bộ DJ, các cuộc phỏng vấn và các cảnh hậu trường. Với 11.2 triệu người đăng ký tính đến cuối năm 2024, Tomorrowland nhanh chóng và dễ dàng trở thành lễ hội âm nhạc được xem nhiều nhất trên hành tinh. Bộ aftermovie chính thức của nó cũng đã đạt đến con số 185 triệu lượt xem</div>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/c5bgJSdH544"></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/LXZxc5LUfo8"></iframe>
            <iframe width="30%" height="270px" src="https://www.youtube.com/embed/pp5U5dt3vP0"></iframe>
            <img className={'img2012-2'} src={img2012_2} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-3'} src={img2012_3} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-4'} src={img2012_4} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-5'} src={img2012_5} alt="" style={{ margin: '5px' }} />
            <img className={'img2012-6'} src={img2012_6} alt="" style={{ margin: '5px' }} />
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

export default Year2012;