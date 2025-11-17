// src/pages/bookings/BookingsPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Tag,
  Card,
  Typography,
  DatePicker,
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { bookingApi } from '@/services/api/bookingApi';
import { buildBookingDetailRoute } from '@/constants/routes';
import type { Booking, BookingStatus, PaymentStatus, BookingListParams } from '@/types/booking.types';
import dayjs from 'dayjs';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const BookingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<BookingListParams>({
    page: 1,
    limit: 10,
    search: '',
    status: undefined,
    paymentStatus: undefined,
  });

  // Fetch bookings
  const { data, isLoading } = useQuery({
    queryKey: ['admin-bookings', params],
    queryFn: () => bookingApi.getAllBookings(params),
  });

  const getStatusColor = (status: BookingStatus): string => {
    const statusMap = {
      PENDING: 'orange',
      CONFIRMED: 'blue',
      CANCELLED: 'red',
      COMPLETED: 'green',
    };
    return statusMap[status] || 'default';
  };

  const getStatusText = (status: BookingStatus): string => {
    const statusMap = {
      PENDING: 'Ожидает',
      CONFIRMED: 'Подтверждено',
      CANCELLED: 'Отменено',
      COMPLETED: 'Завершено',
    };
    return statusMap[status] || status;
  };

  const getPaymentStatusColor = (status: PaymentStatus): string => {
    const statusMap = {
      PENDING: 'orange',
      PAID: 'green',
      REFUNDED: 'blue',
      FAILED: 'red',
    };
    return statusMap[status] || 'default';
  };

  const getPaymentStatusText = (status: PaymentStatus): string => {
    const statusMap = {
      PENDING: 'Ожидает',
      PAID: 'Оплачено',
      REFUNDED: 'Возврат',
      FAILED: 'Ошибка',
    };
    return statusMap[status] || status;
  };

  const columns: ColumnsType<Booking> = [
    {
      title: 'Номер',
      dataIndex: 'bookingNumber',
      key: 'bookingNumber',
      width: 150,
      fixed: 'left',
    },
    {
      title: 'Клиент',
      dataIndex: ['customer', 'fullName'],
      key: 'customerName',
      ellipsis: true,
      width: 200,
    },
    {
      title: 'Тур',
      dataIndex: 'tourTitle',
      key: 'tourTitle',
      ellipsis: true,
      width: 250,
    },
    {
      title: 'Дата тура',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Участники',
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
      render: (status: BookingStatus) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: 'Оплата',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: 120,
      render: (status: PaymentStatus) => (
        <Tag color={getPaymentStatusColor(status)}>{getPaymentStatusText(status)}</Tag>
      ),
    },
    {
      title: 'Создано',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, booking) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => navigate(buildBookingDetailRoute(booking.id))}
        >
          Просмотр
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>Управление бронированиями</Title>
        </div>

        <Space style={{ marginBottom: '16px', flexWrap: 'wrap' }} size="middle">
          <Input
            placeholder="Поиск по номеру, клиенту, туру..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
            allowClear
          />
          <Select
            placeholder="Статус бронирования"
            style={{ width: 180 }}
            value={params.status}
            onChange={(status) => setParams({ ...params, status, page: 1 })}
            allowClear
          >
            <Select.Option value="PENDING">Ожидает</Select.Option>
            <Select.Option value="CONFIRMED">Подтверждено</Select.Option>
            <Select.Option value="CANCELLED">Отменено</Select.Option>
            <Select.Option value="COMPLETED">Завершено</Select.Option>
          </Select>
          <Select
            placeholder="Статус оплаты"
            style={{ width: 160 }}
            value={params.paymentStatus}
            onChange={(paymentStatus) => setParams({ ...params, paymentStatus, page: 1 })}
            allowClear
          >
            <Select.Option value="PENDING">Ожидает</Select.Option>
            <Select.Option value="PAID">Оплачено</Select.Option>
            <Select.Option value="REFUNDED">Возврат</Select.Option>
            <Select.Option value="FAILED">Ошибка</Select.Option>
          </Select>
          <RangePicker
            placeholder={['Дата от', 'Дата до']}
            onChange={(dates) => {
              if (dates) {
                setParams({
                  ...params,
                  startDate: dates[0]?.format('YYYY-MM-DD'),
                  endDate: dates[1]?.format('YYYY-MM-DD'),
                  page: 1,
                });
              } else {
                setParams({
                  ...params,
                  startDate: undefined,
                  endDate: undefined,
                  page: 1,
                });
              }
            }}
          />
        </Space>

        <Table
          columns={columns}
          dataSource={data?.bookings || []}
          rowKey="id"
          loading={isLoading}
          pagination={{
            current: params.page,
            pageSize: params.limit,
            total: data?.total || 0,
            showSizeChanger: true,
            showTotal: (total) => `Всего: ${total}`,
            onChange: (page, limit) => setParams({ ...params, page, limit }),
          }}
          scroll={{ x: 1600 }}
        />
      </Card>
    </div>
  );
};

export default BookingsPage;
