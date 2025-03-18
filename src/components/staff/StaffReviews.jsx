import React from 'react';
import { List, Rate, Avatar, Card, Select, Input, Button } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const StaffReviews = () => {
  const reviews = [
    {
      id: 1,
      customerName: 'Nguyễn Văn A',
      rating: 5,
      comment: 'Dịch vụ rất tốt, nhân viên phục vụ chuyên nghiệp',
      date: '2024-03-15',
      service: 'Massage Thái',
    },
    {
      id: 2,
      customerName: 'Trần Thị B',
      rating: 4,
      comment: 'Không gian thoáng mát, dịch vụ massage rất tốt',
      date: '2024-03-14',
      service: 'Xông hơi',
    },
  ];

  return (
    <div className="staff-reviews">
      <h2 className="text-2xl font-semibold mb-6">Đánh giá từ khách hàng</h2>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-wrap gap-4">
          <Select defaultValue="all" className="w-40">
            <Option value="all">Tất cả dịch vụ</Option>
            <Option value="massage">Massage</Option>
            <Option value="sauna">Xông hơi</Option>
            <Option value="facial">Chăm sóc da</Option>
          </Select>
          <Select defaultValue="all" className="w-40">
            <Option value="all">Tất cả đánh giá</Option>
            <Option value="5">5 sao</Option>
            <Option value="4">4 sao</Option>
            <Option value="3">3 sao</Option>
            <Option value="2">2 sao</Option>
            <Option value="1">1 sao</Option>
          </Select>
          <Input
            placeholder="Tìm kiếm theo tên khách hàng"
            prefix={<SearchOutlined />}
            className="w-64"
          />
          <Button type="primary">Tìm kiếm</Button>
        </div>
      </Card>

      {/* Reviews List */}
      <Card>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 4 }}
          dataSource={reviews}
          renderItem={(review) => (
            <List.Item>
              <Card className="h-full">
                <div className="flex items-center mb-4">
                  <Avatar icon={<UserOutlined />} className="mr-3" />
                  <div>
                    <h3 className="font-semibold">{review.customerName}</h3>
                    <p className="text-gray-600 text-sm">{review.service}</p>
                  </div>
                </div>
                <Rate disabled defaultValue={review.rating} className="mb-2" />
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </Card>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default StaffReviews; 