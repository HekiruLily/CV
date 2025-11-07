import React, { useState } from 'react';
import img2010 from './2010-1.jpg';
import img2010_2 from './2010-2.jpg';
import img2010_3 from './2010-3.jpg';
import img2010_4 from './2010-4.jpg'
import img2010_5 from './2010-5.jpg';


import '../CSS/2010.css';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Year2010 = () => {
  const navigate = useNavigate();
  const [isSliding, setIsSliding] = useState(false);

  const handleGoTo2009 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2009');
    }, 300); // Thời gian trượt
  };

  const handleGoTo2011 = () => {
    setIsSliding(true);
    setTimeout(() => {
      navigate('/2011');
    }, 300); // Thời gian trượt
  };

  const handleGoToShop = () => {
    navigate('/login');
};

  return (
    <div className={`background2010 ${isSliding ? 'slide-out' : ''}`}>
      <img className={'img2010'} src={img2010} alt="" />
      <div className="overlay">
        <div className='content'>
        <div className='button'>
             <button onClick={handleGoTo2009}>
                2009 <FontAwesomeIcon icon={faArrowLeft} className="arrow" />
              </button> 
              <button onClick={handleGoTo2011}>
                2011 <FontAwesomeIcon icon={faArrowRight} className="arrow" />
              </button> 
          </div>
          <div className='title'><b>2010</b></div>
          <div className='info'>Năm 2010 Tomorrowland đã bán hết vé vài ngày trước sự kiện, với sự tham gia của 120.000 du khách trong hai ngày 25-26 tháng 7 năm 2010 và hơn 25.000 người cắm trại qua đêm tại đây. Chủ đề của lễ hội là "Zon (Sun) và đã được đề cử cho hạng mục Best Music Event bởi International Dance Music Awards năm 2011</div>
          <div className='content1'>
          <iframe width="40%" height="350px" src="https://www.youtube.com/embed/awVflmKlolE"></iframe>
          <div className='info2'>Cùng năm đó, Dada Life, Dimitri Vegas & Like Mike và Tara McDonald đã viết bài hát chính thức "Tomorrow/Give Into The Night" và biểu diễn ngay sau màn diễn của Swedish House Mafia. Ca khúc được thực hiện bởi Like Mike, Dada Life và Dimitri Vegas, giai điệu và lời bài hát đã được Tara McDonald viết và thu âm. Bài hát đạt vị trí thứ 5 trên bảng xếp hạng thương mại của Bỉ và là bài hát bán chạy nhất của Tomorrowland cho đến nay.</div>
          </div>
          <div className='content2'>
            <iframe width="28%" height="300px" src="https://www.youtube.com/embed/hG7KUec46L4" style={{ margin: '5px' }}></iframe>
            <iframe width="28%" height="300px" src="https://www.youtube.com/embed/Gc-A7cfMFa0" style={{ margin: '5px' }}></iframe>
            <iframe width="28%" height="300px" src="https://www.youtube.com/embed/v95cGLzgouE" style={{ margin: '5px' }}></iframe>
          </div>
          <div className='content3'>
            <img className={'img2010-4'} src={img2010_4} alt="" style={{ margin: '5px' }} />
            <iframe width="30%" height="250px" src="https://www.youtube.com/embed/4yvUSknVYiM" style={{ margin: '5px' }}></iframe>
            <img className={'img2010-5'} src={img2010_5} alt="" style={{ margin: '5px' }} />
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

export default Year2010;