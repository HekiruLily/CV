import React from 'react';
import { Button, Table, Tag } from 'antd';
import './PendingClubsList.css';

const PendingClubsList = () => {
    const columns = [
      {
        title: 'TÊN CLB',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <div>
            <div className="club-name">{text}</div>
            <div className="club-code">Mã: {record.code}</div>
          </div>
        ),
      },
      {
        title: 'ĐỊA ĐIỂM',
        key: 'location',
        render: (_, record) => (
          <div>
            <div>{record.district}</div>
            <div className="location-province">{record.province}</div>
          </div>
        ),
      },
      {
        title: 'NGÀY TẠO',
        dataIndex: 'createdDate',
        key: 'createdDate',
      },
      {
        title: 'TRẠNG THÁI',
        key: 'status',
        dataIndex: 'status',
        render: (status) => (
          <Tag color="warning">
            {status}
          </Tag>
        ),
      },
      {
        title: '',
        key: 'action',
        render: (_, record) => (
          <Button type="link">Chi tiết</Button>
        ),
      },
    ];
  
    const data = [
      {
        key: '1',
        name: 'Câu lạc bộ 1',
        code: 'CLB001',
        district: 'Cầu Giấy',
        province: 'Hà Nội',
        createdDate: '2024-03-20',
        status: 'Chờ duyệt',
      },
      {
        key: '2',
        name: 'Câu lạc bộ 2',
        code: 'CLB002',
        district: 'Quận 1',
        province: 'TP. HCM',
        createdDate: '2024-03-21',
        status: 'Chờ duyệt',
      },
    ];
  
    return (
      <div className="pending-clubs-container">
        <h2 className="section-title">Danh sách chờ duyệt</h2>
        <p className="section-description">Các câu lạc bộ đang trong quá trình xét duyệt</p>
        
        <Table 
          columns={columns} 
          dataSource={data}
          pagination={false}
          className="pending-clubs-table"
        />
      </div>
    );
  };

export default PendingClubsList;