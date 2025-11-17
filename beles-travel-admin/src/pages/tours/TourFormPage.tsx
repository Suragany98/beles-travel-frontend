// src/pages/tours/TourFormPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Button,
  Card,
  Space,
  Typography,
  Row,
  Col,
  Divider,
  message,
  Spin,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { tourApi } from '@/services/api/tourApi';
import { categoryApi } from '@/services/api/categoryApi';
import { ROUTES } from '@/constants/routes';
import type { TourCreateRequest, TourUpdateRequest } from '@/types/tour.types';

const { Title } = Typography;
const { TextArea } = Input;

const TourFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const isEditMode = !!id;

  // Fetch tour data if editing
  const { data: tour, isLoading: isTourLoading } = useQuery({
    queryKey: ['admin-tour', id],
    queryFn: () => tourApi.getTourById(Number(id)),
    enabled: isEditMode,
  });

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: () => categoryApi.getAllCategories(),
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: TourCreateRequest) => tourApi.createTour(data),
    onSuccess: () => {
      message.success('Тур успешно создан');
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      navigate(ROUTES.TOURS);
    },
    onError: () => {
      message.error('Ошибка при создании тура');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TourUpdateRequest }) =>
      tourApi.updateTour(id, data),
    onSuccess: () => {
      message.success('Тур успешно обновлен');
      queryClient.invalidateQueries({ queryKey: ['admin-tours'] });
      queryClient.invalidateQueries({ queryKey: ['admin-tour', id] });
      navigate(ROUTES.TOURS);
    },
    onError: () => {
      message.error('Ошибка при обновлении тура');
    },
  });

  // Set form values when tour data is loaded
  useEffect(() => {
    if (tour) {
      form.setFieldsValue({
        ...tour,
        categoryIds: tour.categories.map((c) => c.id),
      });
    }
  }, [tour, form]);

  const handleSubmit = (values: any) => {
    const data: TourCreateRequest = {
      titleRu: values.titleRu,
      titleKk: values.titleKk,
      titleEn: values.titleEn,
      descriptionRu: values.descriptionRu,
      descriptionKk: values.descriptionKk,
      descriptionEn: values.descriptionEn,
      shortDescriptionRu: values.shortDescriptionRu,
      shortDescriptionKk: values.shortDescriptionKk,
      shortDescriptionEn: values.shortDescriptionEn,
      duration: values.duration,
      difficulty: values.difficulty,
      destination: values.destination,
      maxGroupSize: values.maxGroupSize,
      minAge: values.minAge,
      basePrice: values.basePrice,
      status: values.status,
      featured: values.featured || false,
      includedServices: values.includedServices || [],
      excludedServices: values.excludedServices || [],
      whatToBring: values.whatToBring || [],
      categoryIds: values.categoryIds || [],
    };

    if (isEditMode) {
      updateMutation.mutate({ id: Number(id), data: { ...data, id: Number(id) } });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditMode && isTourLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Space style={{ marginBottom: '24px' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.TOURS)}>
            Назад
          </Button>
        </Space>

        <Title level={2}>{isEditMode ? 'Редактировать тур' : 'Создать тур'}</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            status: 'DRAFT',
            featured: false,
            difficulty: 'MEDIUM',
            minAge: 18,
            maxGroupSize: 15,
          }}
        >
          <Divider orientation="left">Основная информация</Divider>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Название (RU)"
                name="titleRu"
                rules={[{ required: true, message: 'Введите название на русском' }]}
              >
                <Input placeholder="Название тура на русском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Название (KK)"
                name="titleKk"
                rules={[{ required: true, message: 'Введите название на казахском' }]}
              >
                <Input placeholder="Название тура на казахском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Название (EN)"
                name="titleEn"
                rules={[{ required: true, message: 'Введите название на английском' }]}
              >
                <Input placeholder="Название тура на английском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Краткое описание (RU)"
                name="shortDescriptionRu"
              >
                <TextArea rows={3} placeholder="Краткое описание на русском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Краткое описание (KK)"
                name="shortDescriptionKk"
              >
                <TextArea rows={3} placeholder="Краткое описание на казахском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Краткое описание (EN)"
                name="shortDescriptionEn"
              >
                <TextArea rows={3} placeholder="Краткое описание на английском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Полное описание (RU)"
                name="descriptionRu"
                rules={[{ required: true, message: 'Введите описание на русском' }]}
              >
                <TextArea rows={6} placeholder="Полное описание на русском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Полное описание (KK)"
                name="descriptionKk"
                rules={[{ required: true, message: 'Введите описание на казахском' }]}
              >
                <TextArea rows={6} placeholder="Полное описание на казахском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Полное описание (EN)"
                name="descriptionEn"
                rules={[{ required: true, message: 'Введите описание на английском' }]}
              >
                <TextArea rows={6} placeholder="Полное описание на английском" />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Параметры тура</Divider>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Направление"
                name="destination"
                rules={[{ required: true, message: 'Введите направление' }]}
              >
                <Input placeholder="Например: Алматы, Астана" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Длительность (дни)"
                name="duration"
                rules={[{ required: true, message: 'Введите длительность' }]}
              >
                <InputNumber min={1} max={365} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Сложность"
                name="difficulty"
                rules={[{ required: true, message: 'Выберите сложность' }]}
              >
                <Select>
                  <Select.Option value="EASY">Легкая</Select.Option>
                  <Select.Option value="MEDIUM">Средняя</Select.Option>
                  <Select.Option value="HARD">Сложная</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Базовая цена (₸)"
                name="basePrice"
                rules={[{ required: true, message: 'Введите цену' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Макс. группа"
                name="maxGroupSize"
                rules={[{ required: true, message: 'Введите размер группы' }]}
              >
                <InputNumber min={1} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Мин. возраст"
                name="minAge"
                rules={[{ required: true, message: 'Введите минимальный возраст' }]}
              >
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Статус"
                name="status"
                rules={[{ required: true, message: 'Выберите статус' }]}
              >
                <Select>
                  <Select.Option value="DRAFT">Черновик</Select.Option>
                  <Select.Option value="PUBLISHED">Опубликован</Select.Option>
                  <Select.Option value="ARCHIVED">Архив</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Избранное" name="featured" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Категории" name="categoryIds">
                <Select
                  mode="multiple"
                  placeholder="Выберите категории"
                  options={categories?.map((cat) => ({
                    label: cat.nameRu,
                    value: cat.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Услуги</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Включено в стоимость" name="includedServices">
                <Select
                  mode="tags"
                  placeholder="Добавьте услуги (нажмите Enter)"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Не включено в стоимость" name="excludedServices">
                <Select
                  mode="tags"
                  placeholder="Добавьте услуги (нажмите Enter)"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Что взять с собой" name="whatToBring">
                <Select
                  mode="tags"
                  placeholder="Добавьте предметы (нажмите Enter)"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: '24px' }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={createMutation.isPending || updateMutation.isPending}
                size="large"
              >
                {isEditMode ? 'Сохранить изменения' : 'Создать тур'}
              </Button>
              <Button onClick={() => navigate(ROUTES.TOURS)} size="large">
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default TourFormPage;
