// src/pages/categories/CategoriesPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  message,
  Card,
  Typography,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { categoryApi } from '@/services/api/categoryApi';
import { buildCategoryEditRoute, ROUTES } from '@/constants/routes';
import type { Category } from '@/types/tour.types';

const { Title } = Typography;
const { confirm } = Modal;

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => categoryApi.getAllCategories(),
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      message.success('Категория успешно удалена');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
    },
    onError: () => {
      message.error('Ошибка при удалении категории');
    },
  });

  const handleDelete = (category: Category) => {
    confirm({
      title: 'Удалить категорию?',
      icon: <ExclamationCircleOutlined />,
      content: `Вы уверены, что хотите удалить категорию "${category.nameRu}"?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteMutation.mutate(category.id);
      },
    });
  };

  // Filter categories by search
  const filteredCategories = categories.filter((cat) =>
    cat.nameRu.toLowerCase().includes(searchText.toLowerCase()) ||
    cat.nameKk.toLowerCase().includes(searchText.toLowerCase()) ||
    cat.nameEn.toLowerCase().includes(searchText.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<Category> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Название (RU)',
      dataIndex: 'nameRu',
      key: 'nameRu',
      ellipsis: true,
    },
    {
      title: 'Название (KK)',
      dataIndex: 'nameKk',
      key: 'nameKk',
      ellipsis: true,
    },
    {
      title: 'Название (EN)',
      dataIndex: 'nameEn',
      key: 'nameEn',
      ellipsis: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      width: 150,
      render: (slug: string) => <Tag color="blue">{slug}</Tag>,
    },
    {
      title: 'Порядок',
      dataIndex: 'displayOrder',
      key: 'displayOrder',
      width: 100,
      align: 'center',
      sorter: (a, b) => a.displayOrder - b.displayOrder,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (_, category) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(buildCategoryEditRoute(category.id))}
          >
            Редактировать
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(category)}
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
          <Title level={2} style={{ margin: 0 }}>Управление категориями</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate(ROUTES.CATEGORY_CREATE)}
            size="large"
          >
            Создать категорию
          </Button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Поиск по названию или slug..."
            prefix={<SearchOutlined />}
            style={{ width: 400 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredCategories}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 20,
            showTotal: (total) => `Всего: ${total}`,
          }}
        />
      </Card>
    </div>
  );
};

export default CategoriesPage;
