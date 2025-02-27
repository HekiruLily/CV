import React, { useState, useEffect } from 'react';
import { Input, Tabs, Avatar, Row, Col, Card, message, Modal } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './club_page.css';
import clubService from '../../services/clubService';


const { TabPane } = Tabs;
const { Search } = Input;

const ClubList = () => {
  //Hàm lưu kết quả tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');

  // State để lưu trữ dữ liệu từ API
  const [pendingClubs, setPendingClubs] = useState([]);
  const [approvedClubs, setApprovedClubs] = useState([]);
  const [rejectedClubs, setRejectedClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Thêm state để quản lý modal từ chối
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Hàm lấy danh sách theo trạng thái
  const fetchClubRequests = async (status) => {
    try {
      setLoading(true);
      const response = await clubService.getCreateClubRequests(status);
      switch (status) {
        case 'Pending':
          setPendingClubs(response.data);
          break;
        case 'Approved':
          setApprovedClubs(response.data);
          break;
        case 'Rejected':
          setRejectedClubs(response.data);
          break;
        default:
          break;
      }
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount và khi chuyển tab
  useEffect(() => {
    fetchClubRequests('Pending');
    fetchClubRequests('Approved');
    fetchClubRequests('Rejected');
  }, []);

  // Xử lý duyệt/từ chối yêu cầu
  const handleApprove = async (requestId) => {
    try {
      console.log('Duyệt yêu cầu với ID:', requestId); // Debug

      const response = await clubService.approveClubRequest(requestId);

      console.log('Phản hồi từ API:', response); // Debug API response

      message.success('Duyệt yêu cầu thành công');

      // Cập nhật lại danh sách CLB
      fetchClubRequests('Pending');
      fetchClubRequests('Approved');
    } catch (error) {
      console.error('Lỗi khi duyệt:', error); // Debug lỗi
      message.error(error.message || 'Có lỗi xảy ra khi duyệt yêu cầu');
    }
  };


  // Xử lý hiển thị modal từ chối
  const showRejectModal = (requestId) => {
    setSelectedRequestId(requestId);
    setRejectModalVisible(true);
  };

  // Xử lý từ chối yêu cầu
  const handleReject = async () => {
    try {
      if (!rejectReason.trim()) {
        message.error('Vui lòng nhập lý do từ chối');
        return;
      }

      await clubService.rejectClubRequest(selectedRequestId, rejectReason);
      message.success('Từ chối yêu cầu thành công');
      setRejectModalVisible(false);
      setRejectReason('');
      fetchClubRequests('Pending'); // Refresh danh sách
      fetchClubRequests('Rejected');
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi từ chối yêu cầu');
    }
  };

  //Xử lý tìm kiếm
  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (!value.trim()) {
      fetchClubRequests('Pending');
      return;
    }

    try {
      setLoading(true);
      const response = await clubService.searchClubRequests(value, value, 'Pending');
      setPendingClubs(response.data);
    } catch (error) {
      message.error(error.message || 'Có lỗi xảy ra khi tìm kiếm');
    } finally {
      setLoading(false);
    }
  };



  /**
   * Hàm dùng chung để render danh sách CLB.
   * 'tabType' cho biết đang ở tab nào: 'approved', 'pending', 'rejected'.
   */
  const renderClubCards = (clubs, tabType) => (
    <Row gutter={[16, 16]} className="club-cards">
      {clubs.map((club) => (
        <Col span={8} key={club.id}>
          <Card className="club-card">
            {tabType === 'approved' ? (
              <div className="card-actions">
                <EditOutlined key="edit" />
                <DeleteOutlined key="delete" />
              </div>
            ) : tabType !== 'pending' && (
              <div className="card-actions">
                <DeleteOutlined key="delete" />
              </div>
            )}

            <Card.Meta
              avatar={
                <Avatar
                  size={48}
                  src={process.env.REACT_APP_API_URL + club.club_avatar || 'https://i.imgur.com/KUodm7t.jpg'}
                  alt={club.club_name}
                />
              }
              title={<div className="club-title">{club.club_name}</div>}
              description={
                <div className="club-info">
                  <p className="club-id">Mã CLB: {club.club_code}</p>
                  <p className="club-description">{club.description || 'Chưa có mô tả'}</p>

                  <div className="club-location">
                    <p>Địa điểm: {club.location}</p>
                    <p>{club.district}, {club.province}</p>
                  </div>

                  <div className="requester-info">
                    <Avatar
                      src={process.env.REACT_APP_API_URL + club.user_avatar || 'https://i.imgur.com/KUodm7t.jpg'}
                      size="small"
                    />
                    <span>{club.full_name}</span>
                    <p>Email: {club.email}</p>
                  </div>

                  <p>Ngày yêu cầu: {club.requested_at}</p>

                  {tabType === 'rejected' && club.reject_reason && (
                    <p className="club-reason">Lý do từ chối: {club.reject_reason}</p>
                  )}

                  {tabType === 'pending' && (
                    <div className="approval-buttons">
                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(club.request_id)}
                      >
                        Duyệt
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => showRejectModal(club.request_id)}
                      >
                        Từ chối
                      </button>
                    </div>
                  )}
                </div>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <div className="club-list-container">
        <Tabs defaultActiveKey="1" className="custom-tabs">
          <TabPane tab="Chờ duyệt" key="1">
            <div className="content-container">
              <Search
                placeholder="Tìm kiếm yêu cầu..."
                prefix={<SearchOutlined />}
                className="search-bar"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
              />


              {renderClubCards(pendingClubs, 'pending')}
            </div>
          </TabPane>

          <TabPane tab="Đã duyệt" key="2">
            <div className="content-container">
              {renderClubCards(approvedClubs, 'approved')}
            </div>
          </TabPane>

          <TabPane tab="Đã từ chối" key="3">
            <div className="content-container">
              {renderClubCards(rejectedClubs, 'rejected')}
            </div>
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title="Từ chối yêu cầu tạo CLB"
        visible={rejectModalVisible}
        onOk={handleReject}
        onCancel={() => {
          setRejectModalVisible(false);
          setRejectReason('');
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Input.TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Nhập lý do từ chối..."
        />
      </Modal>
    </>
  );
};

export default ClubList;