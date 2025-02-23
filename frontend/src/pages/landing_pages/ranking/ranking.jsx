import React, { useState } from 'react';
import DistanceButtons from './components/DistanceButtons';
import RunnersList from './components/RunnersList';
import './ranking.css';


// Dynamically import all images
const importAll = (r) => {
  let images = {};
  r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
  return images;
};

const images = importAll(require.context('../../../assets/images', false, /\.(jpe?g)$/));

const Ranking = () => {
  const [selectedDistance, setSelectedDistance] = useState('Xếp thứ của mọi người');
  
  // Sample data for runners
const runners = [
    { id: 1, name: 'Runner 1', image: images['01.jpg'], accumulated: 100, monthly: 20 },
    { id: 2, name: 'Runner 2', image: images['02.jpg'], accumulated: 150, monthly: 30 },
    { id: 3, name: 'Runner 3', image: images['03.jpg'], accumulated: 200, monthly: 40 },
    { id: 4, name: 'Runner 4', image: images['04.jpg'], accumulated: 250, monthly: 50 },
    { id: 5, name: 'Runner 5', image: images['05.jpg'], accumulated: 300, monthly: 60 },
    { id: 6, name: 'Runner 6', image: images['06.jpg'], accumulated: 350, monthly: 70 },
    { id: 7, name: 'Runner 7', image: images['07.jpg'], accumulated: 400, monthly: 80 },
    { id: 8, name: 'Runner 8', image: images['08.jpg'], accumulated: 450, monthly: 90 },
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
    {/* Additional information can be displayed in RunnerCard */}

      </div>
    </div>
  );
};

export default Ranking;
