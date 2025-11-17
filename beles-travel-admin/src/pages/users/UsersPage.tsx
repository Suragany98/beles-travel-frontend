// src/pages/users/UsersPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Modal,
  message,
  Card,
  Typography,
  Tag,
  Switch,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { userApi } from '@/services/api/userApi';
import { buildUserEditRoute, ROUTES } from '@/constants/routes';
import type { User, UserListParams } from '@/types/user.types';
import dayjs from 'dayjs';

const { Title } = Typography;
const { confirm } = Modal;

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [params, setParams] = useState<UserListParams>({
    page: 1,
    limit: 10,
    search: '',
  });

  // Fetch users
  const { data, isLoading } = useQuery({
    queryKey: ['admin-users', params],
    queryFn: () => userApi.getAllUsers(params),
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: (id: number) => userApi.toggleUserActive(id),
    onSuccess: () => {
      message.success('Статус пользователя обновлен');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: () => {
      message.error('Ошибка при обновлении статуса');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => userApi.deleteUser(id),
    onSuccess: () => {
      message.success('Пользователь успешно удален');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при удалении пользователя';
      message.error(errorMessage);
    },
  });

  const handleDelete = (user: User) => {
    confirm({
      title: 'Удалить пользователя?',
      icon: <ExclamationCircleOutlined />,
      content: `Вы уверены, что хотите удалить пользователя "${user.fullName}"?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteMutation.mutate(user.id);
      },
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Имя пользователя',
      dataIndex: 'username',
      key: 'username',
      ellipsis: true,
    },
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      key: 'fullName',
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Статус',
      dataIndex: 'isActive',
      key: 'isActive',
      width: 120,
      render: (isActive: boolean, record) => (
        <Switch
          checked={isActive}
          checkedChildren={<CheckCircleOutlined />}
          unCheckedChildren={<CloseCircleOutlined />}
          onChange={() => toggleActiveMutation.mutate(record.id)}
        />
      ),
    },
    {
      title: 'Последний вход',
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
      width: 150,
      render: (date: string) => date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-',
    },
    {
      title: 'Создан',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (_, user) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(buildUserEditRoute(user.id))}
          >
            Редактировать
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(user)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2} style={{ margin: 0 }}>Управление пользователями</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(ROUTES.USER_CREATE)}
            size="large"
          >
            Создать пользователя
          </Button>
        </div>

        <Space style={{ marginBottom: '16px' }} size="middle">
          <Input
            placeholder="Поиск по имени, email..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
            allowClear
          />
          <Select
            placeholder="Статус"
            style={{ width: 150 }}
            value={params.isActive}
            onChange={(isActive) => setParams({ ...params, isActive, page: 1 })}
            allowClear
          >
            <Select.Option value={true}>Активный</Select.Option>
            <Select.Option value={false}>Неактивный</Select.Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={data?.users || []}
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

export default UsersPage;
