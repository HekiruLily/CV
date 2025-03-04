import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Pagination } from 'antd';
import { App } from 'antd';
import NewsCard from './components/NewsCard';
import CreateNewsForm from './components/CreateNewsForm';
import ClubNewsService from '../../../services/clubNews.service';
import './NewsFeed.css';

const NewsFeed = () => {
  const { message } = App.useApp();
  const { clubCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });

  const fetchNews = async (page = 1) => {
    try {
      setLoading(true);
      const response = await ClubNewsService.getClubNews(clubCode, page, pagination.pageSize);
      
      // Chuẩn hóa dữ liệu từ backend
      const formattedNews = response.data.news.map(item => ({
        id: item.news_id,
        avatar: item.author_avatar,
        author: item.author_name,
        title: item.title,
        views: item.views || 0,
        timestamp: new Date(item.created_at).toLocaleString('vi-VN'),
        activity: item.activity_type,
        content: item.content,
        location: item.location,
        images: item.image ? [item.image] : [],
        stats: {
          likes: item.reaction_count || 0,
          comments: item.comment_count || 0,
          shares: 0
        }
      }));
      console.log(formattedNews);
      setNews(formattedNews);
      setPagination({
        ...pagination,
        current: response.data.pagination.current_page,
        total: response.data.pagination.total_items
      });
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi tải tin tức');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [clubCode]);

  const handlePageChange = (page) => {
    fetchNews(page);
  };

  return (
    <div className="page-body">
      <div className="container">
        <h1 className="page-title">Tin tức & Hoạt động</h1>
        
        <CreateNewsForm 
          clubCode={clubCode}
          onSuccess={() => fetchNews(1)}
        />

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {news.map(newsItem => (
              <NewsCard key={newsItem.id} {...newsItem} />
            ))}
            
            {news.length > 0 && (
              <div className="pagination-container">
                <Pagination
                  current={pagination.current}
                  total={pagination.total}
                  pageSize={pagination.pageSize}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>
            )}

            {news.length === 0 && (
              <div className="empty-news">
                <p>Chưa có bài viết nào</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;