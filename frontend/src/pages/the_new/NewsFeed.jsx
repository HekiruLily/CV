import React from 'react';
import NewsCard from './components/NewsCard';
import './NewsFeed.css';
const newsData = [
  {
    id: 1,
    avatar: "https://storage.googleapis.com/a1aa/image/yGpLR6p499JJeF0gJscSYmDHwJaOaAG1mKbDyF06j2E.jpg",
    title: "Buổi tập cuối tuần thành công!",
    views: 45,
    timestamp: "2 giờ trước",
    content: "Cảm ơn tất cả thành viên đã tham gia buổi tập cuối tuần. Chúng ta đã hoàn thành 10km với thành tích tốt.",
    location: "Công viên Thống Nhất",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYDleLrHvh3z0YUU8NPLk6doOJfZGn7qXWPA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRBEMw_rp3AG1raVwjpWWK5aGYuNeT9TbiNA&s"
    ]
  },
  {
    id: 2,
    avatar: "https://storage.googleapis.com/a1aa/image/yGpLR6p499JJeF0gJscSYmDHwJaOaAG1mKbDyF06j2E.jpg",
    title: "Lịch tập tuần tới",
    views: 38,
    timestamp: "1 ngày trước",
    content: "Thông báo lịch tập tuần tới sẽ thay đổi sang thứ 7 lúc 6h sáng thay vì chủ nhật như thường lệ."
  },
  
];

const NewsFeed = () => {
  return (
    <div className="page-body">
      <div className="container">
        <h1 className="page-title">Tin mới</h1>
        {newsData.map(news => (
          <NewsCard key={news.id} {...news} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;