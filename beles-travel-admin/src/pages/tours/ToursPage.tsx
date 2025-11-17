// src/pages/tours/ToursPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Button,
  Space,
  Input,
  Select,
  Tag,
  Modal,
  message,
  Card,
  Typography,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { tourApi } from '@/services/api/tourApi';
import { ROUTES, buildTourEditRoute } from '@/constants/routes';
import type { Tour, TourStatus, TourListParams } from '@/types/tour.types';

const { Title } = Typography;
const { confirm } = Modal;

const ToursPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [params, setParams] = useState<TourListParams>({
    page: 1,
    limit: 10,
    search: '',
    status: undefined,
    featured: undefined,
  });

  // Fetch tours
  const { data, isLoading } = useQuery({
    queryKey: ['admin-tours', params],
    queryFn: () => tourApi.getAllTours(params),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => tourApi.deleteTour(id),
    onSuccess: () => {
      message.success('Тур успешно удален');
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
    },
    onError: () => {
      message.error('Ошибка при удалении тура');
    },
  });

  const handleDelete = (tour: Tour) => {
    confirm({
      title: 'Удалить тур?',
      icon: <ExclamationCircleOutlined />,
      content: `Вы уверены, что хотите удалить тур "${tour.titleRu}"?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteMutation.mutate(tour.id);
      },
    });
  };

  const columns: ColumnsType<Tour> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Название',
      dataIndex: 'titleRu',
      key: 'titleRu',
      ellipsis: true,
    },
    {
      title: 'Направление',
      dataIndex: 'destination',
      key: 'destination',
      width: 150,
    },
    {
      title: 'Длительность',
      dataIndex: 'duration',
      key: 'duration',
      width: 120,
      render: (duration: number) => `${duration} дн.`,
    },
    {
      title: 'Цена',
      dataIndex: 'basePrice',
      key: 'basePrice',
      width: 120,
      render: (price: number) => `${price.toLocaleString()} ₸`,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: TourStatus) => {
        const statusMap = {
          PUBLISHED: { color: 'green', text: 'Опубликован' },
          DRAFT: { color: 'orange', text: 'Черновик' },
          ARCHIVED: { color: 'red', text: 'Архив' },
        };
        const config = statusMap[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Избранное',
      dataIndex: 'featured',
      key: 'featured',
      width: 100,
      render: (featured: boolean) => (
        <Tag color={featured ? 'blue' : 'default'}>
          {featured ? 'Да' : 'Нет'}
        </Tag>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 150,
      fixed: 'right',
      render: (_, tour) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(buildTourEditRoute(tour.id))}
          >
            Редактировать
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(tour)}
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
          <Title level={2} style={{ margin: 0 }}>Управление турами</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(ROUTES.TOUR_CREATE)}
            size="large"
          >
            Создать тур
          </Button>
        </div>

        <Space style={{ marginBottom: '16px' }} size="middle">
          <Input
            placeholder="Поиск по названию..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={params.search}
            onChange={(e) => setParams({ ...params, search: e.target.value, page: 1 })}
            allowClear
          />
          <Select
            placeholder="Статус"
            style={{ width: 150 }}
            value={params.status}
            onChange={(status) => setParams({ ...params, status, page: 1 })}
            allowClear
          >
            <Select.Option value="PUBLISHED">Опубликован</Select.Option>
            <Select.Option value="DRAFT">Черновик</Select.Option>
            <Select.Option value="ARCHIVED">Архив</Select.Option>
          </Select>
          <Select
            placeholder="Избранное"
            style={{ width: 150 }}
            value={params.featured}
            onChange={(featured) => setParams({ ...params, featured, page: 1 })}
            allowClear
          >
            <Select.Option value={true}>Да</Select.Option>
            <Select.Option value={false}>Нет</Select.Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={data?.tours || []}
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

export default ToursPage;
