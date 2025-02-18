import React, { useState } from 'react';
import DistanceButtons from '../components/DistanceButtons';
import RunnersList from '../components/RunnersList';
import '../styles/Home.css';
import { FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa'; // Import icons from react-icons


// Dynamically import all images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../assets/images', false, /\.(jpe?g)$/));

const Home = () => {
  const [selectedDistance, setSelectedDistance] = useState('Xếp thứ của mọi người');
  
  // Sample data for runners
  const runners = [
    { id: 1, name: 'Runner 1', image: images['01.jpg'] },
    { id: 2, name: 'Runner 2', image: images['02.jpg'] },
    { id: 3, name: 'Runner 3', image: images['03.jpg'] },
    { id: 4, name: 'Runner 4', image: images['04.jpg'] },
    { id: 5, name: 'Runner 5', image: images['05.jpg'] },
    { id: 6, name: 'Runner 6', image: images['06.jpg'] },
    { id: 7, name: 'Runner 7', image: images['07.jpg'] },
    { id: 8, name: 'Runner 8', image: images['08.jpg'] },
  ];

  return (
    <div>
      <div className="leaderboard">
        <h1 className="ranking-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="gold" style={{marginRight: '10px'}}>
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 10.63 21 8.55 21 6V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
          </svg>
          Bảng xếp hạng
        </h1>
        <p>Xem thành tích của các vận động viên theo từng loại chạy</p>
        <DistanceButtons 
          selectedDistance={selectedDistance}
          onDistanceSelect={setSelectedDistance}
        />
        <RunnersList runners={runners} />
      </div>
      
      <div className='benefits'>
        <h1 className="benefits-title">Tham gia câu lạc bộ</h1>
        <p>Trở thành thành viên của cộng đồng chạy bộ lớn nhất Việt Nam</p>
        
        <div className="benefits-boxes">
          <div className="benefit-box">
            <FaUsers size={32} style={{ marginBottom: '10px', color: 'rgba(80,143,246,255)' }} /> {/* Icon for community */}
            <h2>Cộng đồng năng động</h2>
            <p>Gặp gỡ và kết nối với những người có cùng đam mê chạy bộ</p>
          </div>
          <div className="benefit-box">
            <FaCalendarAlt size={32} style={{ marginBottom: '10px', color: 'rgba(59,203,112,255)' }} /> {/* Icon for schedule */}
            <h2>Lịch tập chuyên nghiệp</h2>
            <p>Được huấn luyện viên lên lịch tập phù hợp với mục tiêu</p>
          </div>
          <div className="benefit-box">
            <FaStar size={32} style={{ marginBottom: '10px' , color: 'rgba(234,179,8,255)'}} /> {/* Icon for exclusive events */}
            <h2>Sự kiện độc quyền</h2>
            <p>Tham gia các sự kiện đặc biệt dành riêng cho thành viên</p>
          </div>
        </div>
        
        <button className="register-button">
          Đăng kí ngay
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.3 1.3a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4L13.6 7H1a1 1 0 0 1 0-2h12.6L10.3 2.7a1 1 0 0 1 0-1.4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
