// src/pages/customers/CustomersPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Table,
  Input,
  Card,
  Typography,
  Space,
  Button,
  Tag,
} from 'antd';
import {
  EyeOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { customerApi } from '@/services/api/customerApi';
import { buildCustomerDetailRoute } from '@/constants/routes';
import type { Customer, CustomerListParams } from '@/types/customer.types';
import dayjs from 'dayjs';

const { Title } = Typography;

const CustomersPage: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState<CustomerListParams>({
    page: 1,
    limit: 10,
    search: '',
  });

  // Fetch customers
  const { data, isLoading } = useQuery({
    queryKey: ['admin-customers', params],
    queryFn: () => customerApi.getAllCustomers(params),
  });

  const columns: ColumnsType<Customer> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: true,
      render: (name: string) => (
        <Space>
          <UserOutlined />
          {name}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Гражданство',
      dataIndex: 'nationality',
      key: 'nationality',
      width: 120,
    },
    {
      title: 'Всего бронирований',
      dataIndex: 'totalBookings',
      key: 'totalBookings',
      width: 100,
      align: 'center',
      render: (count: number) => (
        <Tag color="blue">{count}</Tag>
      ),
    },
    {
      title: 'Завершено',
      dataIndex: 'completedBookings',
      key: 'completedBookings',
      width: 100,
      align: 'center',
      render: (count: number) => (
        <Tag color="green">{count}</Tag>
      ),
    },
    {
      title: 'Дата регистрации',
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
      render: (_, customer) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => navigate(buildCustomerDetailRoute(customer.id))}
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
          <Title level={2}>Управление клиентами</Title>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Поиск по имени, email, телефону..."
            prefix={<SearchOutlined />}
            style={{ width: 400 }}
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={data?.customers || []}
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
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
};

export default CustomersPage;
