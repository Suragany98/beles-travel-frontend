// src/pages/customers/CustomerDetailPage.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Descriptions,
  Button,
  Typography,
  Spin,
  Row,
  Col,
  Space,
  Table,
  Tag,
} from 'antd';
import {
  ArrowLeftOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { customerApi } from '@/services/api/customerApi';
import { ROUTES, buildBookingDetailRoute } from '@/constants/routes';
import type { Booking } from '@/types/booking.types';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const CustomerDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch customer data
  const { data: customer, isLoading: isCustomerLoading } = useQuery({
    queryKey: ['admin-customer', id],
    queryFn: () => customerApi.getCustomerById(Number(id)),
    enabled: !!id,
  });

  // Fetch customer bookings
  const { data: bookings = [], isLoading: isBookingsLoading } = useQuery({
    queryKey: ['admin-customer-bookings', id],
    queryFn: () => customerApi.getCustomerBookings(Number(id)),
    enabled: !!id,
  });

  const getStatusColor = (status: string): string => {
    const statusMap: Record<string, string> = {
      PENDING: 'orange',
      CONFIRMED: 'blue',
      CANCELLED: 'red',
      COMPLETED: 'green',
    };
    return statusMap[status] || 'default';
  };

  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      PENDING: 'Ожидает',
      CONFIRMED: 'Подтверждено',
      CANCELLED: 'Отменено',
      COMPLETED: 'Завершено',
    };
    return statusMap[status] || status;
  };

  const bookingsColumns: ColumnsType<Booking> = [
    {
      title: 'Номер',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      width: 150,
      render: (bookingNumber: string, record) => (
        <a onClick={() => navigate(buildBookingDetailRoute(record.id))}>
          {bookingNumber}
        </a>
      ),
    },
    {
      title: 'Тур',
      dataIndex: 'tourTitle',
      key: 'tourTitle',
      ellipsis: true,
    },
    {
      title: 'Дата тура',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Участников',
      dataIndex: 'numberOfPeople',
      key: 'numberOfPeople',
      width: 100,
      align: 'center',
    },
    {
      title: 'Сумма',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      width: 130,
      render: (price: number) => `${price.toLocaleString()} ₸`,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
  ];

  if (isCustomerLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Text>Клиент не найден</Text>
        </Card>
      </div>
    );
  }

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  return (
    <div style={{ padding: '24px' }}>
      <Space style={{ marginBottom: '24px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.CUSTOMERS)}>
          Назад
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <UserOutlined style={{ fontSize: '64px', color: '#1890ff' }} />
              <Title level={3} style={{ marginTop: '16px', marginBottom: '8px' }}>
                {customer.fullName}
              </Title>
              <Text type="secondary">ID: {customer.id}</Text>
            </div>

            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={<><MailOutlined /> Email</>}
              >
                {customer.email}
              </Descriptions.Item>
              <Descriptions.Item
                label={<><PhoneOutlined /> Телефон</>}
              >
                {customer.phone}
              </Descriptions.Item>
              {customer.iin && (
                <Descriptions.Item label="ИИН">
                  {customer.iin}
                </Descriptions.Item>
              )}
              {customer.passportNumber && (
                <Descriptions.Item label="Паспорт">
                  {customer.passportNumber}
                </Descriptions.Item>
              )}
              {customer.dateOfBirth && (
                <Descriptions.Item label="Дата рождения">
                  {dayjs(customer.dateOfBirth).format('DD.MM.YYYY')}
                </Descriptions.Item>
              )}
              {customer.nationality && (
                <Descriptions.Item label="Гражданство">
                  {customer.nationality}
                </Descriptions.Item>
              )}
            </Descriptions>

            {customer.emergencyContact && (
              <>
                <Title level={5} style={{ marginTop: '24px' }}>
                  Экстренный контакт
                </Title>
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="ФИО">
                    {customer.emergencyContact}
                  </Descriptions.Item>
                  {customer.emergencyPhone && (
                    <Descriptions.Item label="Телефон">
                      {customer.emergencyPhone}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </>
            )}

            <Title level={5} style={{ marginTop: '24px' }}>
              Информация о регистрации
            </Title>
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Дата регистрации">
                {dayjs(customer.createdAt).format('DD.MM.YYYY HH:mm')}
              </Descriptions.Item>
              <Descriptions.Item label="Последнее обновление">
                {dayjs(customer.updatedAt).format('DD.MM.YYYY HH:mm')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="Статистика" style={{ marginBottom: '16px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#1890ff', fontWeight: 'bold' }}>
                    {customer.totalBookings}
                  </div>
                  <Text type="secondary">Всего бронирований</Text>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#52c41a', fontWeight: 'bold' }}>
                    {customer.completedBookings}
                  </div>
                  <Text type="secondary">Завершено</Text>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', color: '#722ed1', fontWeight: 'bold' }}>
                    {totalRevenue.toLocaleString()} ₸
                  </div>
                  <Text type="secondary">Общая сумма</Text>
                </div>
              </Col>
            </Row>
          </Card>

          <Card title="История бронирований">
            <Table
              columns={bookingsColumns}
              dataSource={bookings}
              rowKey="id"
              loading={isBookingsLoading}
              pagination={{
                pageSize: 10,
                showTotal: (total) => `Всего: ${total}`,
              }}
              scroll={{ x: 1000 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerDetailPage;
