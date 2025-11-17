// src/pages/DashboardPage.tsx

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, Typography, Statistic, Row, Col, Table, Tag, Spin } from 'antd';
import {
  UserOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { dashboardApi } from '@/services/api/dashboardApi';
import type { RecentBooking, PopularTour } from '@/services/api/dashboardApi';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardApi.getDashboardStats(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  const stats = data?.stats || {
    totalRevenue: 0,
    totalBookings: 0,
    activeTours: 0,
    totalCustomers: 0,
    pendingBookings: 0,
    completedBookings: 0,
    revenueGrowth: 0,
    bookingsGrowth: 0,
  };

  const revenueChart = data?.revenueChart || [];
  const popularTours = data?.popularTours || [];
  const recentBookings = data?.recentBookings || [];

  const bookingsColumns: ColumnsType<RecentBooking> = [
    {
      title: 'Номер',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      width: 150,
    },
    {
      title: 'Клиент',
      dataIndex: 'customerName',
      key: 'customerName',
      ellipsis: true,
    },
    {
      title: 'Тур',
      dataIndex: 'tourTitle',
      key: 'tourTitle',
      ellipsis: true,
    },
    {
      title: 'Сумма',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `${price.toLocaleString()} ₸`,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          PENDING: { color: 'orange', text: 'Ожидает' },
          CONFIRMED: { color: 'blue', text: 'Подтверждено' },
          COMPLETED: { color: 'green', text: 'Завершено' },
          CANCELLED: { color: 'red', text: 'Отменено' },
        };
        const config = statusMap[status] || { color: 'default', text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
  ];

  const toursColumns: ColumnsType<PopularTour> = [
    {
      title: 'Тур',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'Бронирований',
      dataIndex: 'bookingsCount',
      key: 'bookingsCount',
      align: 'center',
      sorter: (a, b) => a.bookingsCount - b.bookingsCount,
    },
    {
      title: 'Доход',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue: number) => `${revenue.toLocaleString()} ₸`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Панель управления
      </Title>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Общий доход"
              value={stats.totalRevenue}
              precision={0}
              prefix={<DollarOutlined />}
              suffix="₸"
              valueStyle={{ color: '#3f8600', fontSize: '24px' }}
            />
            {stats.revenueGrowth !== 0 && (
              <div style={{ marginTop: '8px' }}>
                <Tag
                  color={stats.revenueGrowth > 0 ? 'green' : 'red'}
                  icon={stats.revenueGrowth > 0 ? <RiseOutlined /> : <FallOutlined />}
                >
                  {stats.revenueGrowth > 0 ? '+' : ''}
                  {stats.revenueGrowth}% за месяц
                </Tag>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Всего бронирований"
              value={stats.totalBookings}
              prefix={<ShoppingOutlined />}
              valueStyle={{ color: '#1890ff', fontSize: '24px' }}
            />
            {stats.bookingsGrowth !== 0 && (
              <div style={{ marginTop: '8px' }}>
                <Tag
                  color={stats.bookingsGrowth > 0 ? 'green' : 'red'}
                  icon={stats.bookingsGrowth > 0 ? <RiseOutlined /> : <FallOutlined />}
                >
                  {stats.bookingsGrowth > 0 ? '+' : ''}
                  {stats.bookingsGrowth}% за месяц
                </Tag>
              </div>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Активные туры"
              value={stats.activeTours}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#722ed1', fontSize: '24px' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag icon={<ClockCircleOutlined />} color="orange">
                {stats.pendingBookings} ожидают
              </Tag>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Всего клиентов"
              value={stats.totalCustomers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#cf1322', fontSize: '24px' }}
            />
            <div style={{ marginTop: '8px' }}>
              <Tag icon={<CheckCircleOutlined />} color="green">
                {stats.completedBookings} завершено
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Revenue Chart */}
      {revenueChart.length > 0 && (
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} lg={16}>
            <Card title="Доход и бронирования по месяцам">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3f8600"
                    strokeWidth={2}
                    name="Доход (₸)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="bookings"
                    stroke="#1890ff"
                    strokeWidth={2}
                    name="Бронирования"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Популярные туры" style={{ height: '100%' }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={popularTours.slice(0, 5)} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="title" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="bookingsCount" fill="#1890ff" name="Бронирований" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      )}

      {/* Recent Bookings */}
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Последние бронирования">
            <Table
              columns={bookingsColumns}
              dataSource={recentBookings}
              rowKey="id"
              pagination={{ pageSize: 5 }}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Popular Tours Table */}
      {popularTours.length > 0 && (
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col xs={24}>
            <Card title="Топ туры по бронированиям">
              <Table
                columns={toursColumns}
                dataSource={popularTours}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                size="small"
              />
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DashboardPage;
