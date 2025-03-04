import React, { useState, useEffect } from 'react';
import { Input, Button, List, Tooltip } from 'antd';
import { App } from 'antd';
import { SendOutlined, LikeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ClubNewsService from '../../../../services/clubNews.service';
import { useSelector } from 'react-redux';
import Avatar from '../../../../components/Avatar/Avatar';
import './Comments.css';

const Comments = ({ clubCode, newsId }) => {
    const userData = useSelector(state => state.user.userData);
    const { message } = App.useApp();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [expandedComments, setExpandedComments] = useState({});
    const commentThreshold = 300; // Character threshold for showing "See more"
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    });

    const fetchComments = async (page = 1) => {
        try {
            setLoading(true);
            const response = await ClubNewsService.getComments(
                clubCode, 
                newsId, 
                parseInt(page), 
                parseInt(pagination.pageSize)
            );
            setComments(response.data.comments);
            setPagination({
                ...pagination,
                current: parseInt(response.data.pagination.current_page),
                total: parseInt(response.data.pagination.total_items)
            });
        } catch (error) {
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [clubCode, newsId]);

    const handleSubmit = async () => {
        if (!commentText.trim()) {
            return;
        }

        try {
            setSubmitting(true);
            await ClubNewsService.createComment(clubCode, newsId, commentText.trim());
            setCommentText('');
            fetchComments(1);
            message.success('Đã thêm bình luận');
        } catch (error) {
            message.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const toggleCommentExpand = (commentId) => {
        setExpandedComments(prev => ({
            ...prev,
            [commentId]: !prev[commentId]
        }));
    };

    const formatCommentText = (text, commentId) => {
        if (!text) return '';
        
        const shouldTruncate = text.length > commentThreshold;
        const isExpanded = expandedComments[commentId];
        
        if (shouldTruncate && !isExpanded) {
            return text.substring(0, commentThreshold) + '...';
        }
        
        return text;
    };

    return (
        <div className="comments-section">
            <div className="comment-input-container">
                <div className="comment-input-wrapper">
                    <Avatar className="comment-avatar"
                     alt={userData.full_name} 
                     text={userData.full_name} 
                     size="medium" 
                     src={userData.avatar} 
                     />
                    <div className="comment-input-area">
                        <Input.TextArea
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Viết bình luận..."
                            autoSize={{ minRows: 1, maxRows: 4 }}
                            maxLength={1000}
                            className="comment-textarea"
                        />
                        <Button
                            type="primary"
                            icon={<SendOutlined />}
                            loading={submitting}
                            onClick={handleSubmit}
                            disabled={!commentText.trim()}
                            className="send-button"
                        >
                            Gửi
                        </Button>
                    </div>
                </div>
            </div>

            <List
                className="comments-list"
                loading={loading}
                itemLayout="horizontal"
                dataSource={comments}
                pagination={{
                    onChange: fetchComments,
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: pagination.total,
                    hideOnSinglePage: true
                }}
                renderItem={comment => (
                    <List.Item className="comment-item">
                        <div className="comment-content">
                            <Avatar 
                                alt={comment.full_name} 
                                text={comment.full_name} 
                                size="medium" 
                                src={comment.avatar} 
                                className="comment-avatar"
                            />
                            <div className="comment-body">
                                <div className="comment-header">
                                    <span className="comment-author">{comment.full_name}</span>
                                    <span className="comment-time">
                                        {new Date(comment.created_at).toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                <div className="comment-text-container">
                                    <div className="comment-text">
                                        {formatCommentText(comment.comment, comment.comment_id)}
                                    </div>
                                    {comment.comment && comment.comment.length > commentThreshold && (
                                        <div 
                                            className="see-more-button" 
                                            onClick={() => toggleCommentExpand(comment.comment_id)}
                                        >
                                            {expandedComments[comment.comment_id] ? 'Thu gọn' : 'Xem thêm'}
                                        </div>
                                    )}
                                </div>
                                <div className="comment-actions">
                                    <Tooltip title="Thích">
                                        <Button type="text" icon={<LikeOutlined />} size="small">
                                            Thích
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Trả lời">
                                        <Button type="text" size="small">
                                            Trả lời
                                        </Button>
                                    </Tooltip>
                                    {comment.user_id === userData.id && (
                                        <>
                                            <Tooltip title="Chỉnh sửa">
                                                <Button type="text" icon={<EditOutlined />} size="small">
                                                    Sửa
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Xóa">
                                                <Button type="text" icon={<DeleteOutlined />} size="small" danger>
                                                    Xóa
                                                </Button>
                                            </Tooltip>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Comments; 