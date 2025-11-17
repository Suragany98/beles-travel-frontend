// src/pages/categories/CategoryFormPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  Space,
  Typography,
  Row,
  Col,
  message,
  Spin,
} from 'antd';
import { SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { categoryApi } from '@/services/api/categoryApi';
import { ROUTES } from '@/constants/routes';
import type { Category } from '@/types/tour.types';

const { Title } = Typography;
const { TextArea } = Input;

const CategoryFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const isEditMode = !!id;

  // Fetch category data if editing
  const { data: category, isLoading: isCategoryLoading } = useQuery({
    queryKey: ['admin-category', id],
    queryFn: () => categoryApi.getCategoryById(Number(id)),
    enabled: isEditMode,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: Partial<Category>) => categoryApi.createCategory(data),
    onSuccess: () => {
      message.success('Категория успешно создана');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      navigate(ROUTES.CATEGORIES);
    },
    onError: () => {
      message.error('Ошибка при создании категории');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Category> }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: () => {
      message.success('Категория успешно обновлена');
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin-category', id] });
      navigate(ROUTES.CATEGORIES);
    },
    onError: () => {
      message.error('Ошибка при обновлении категории');
    },
  });

  // Set form values when category data is loaded
  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    }
  }, [category, form]);

  // Auto-generate slug from Russian name
  const handleNameRuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameRu = e.target.value;
    if (!isEditMode || !category) {
      // Only auto-generate slug for new categories
      const slug = nameRu
        .toLowerCase()
        .replace(/[а-яё]/g, (char) => {
          const cyrillicToLatin: Record<string, string> = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
            'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
            'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
            'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
            'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
          };
          return cyrillicToLatin[char] || char;
        })
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      form.setFieldValue('slug', slug);
    }
  };

  const handleSubmit = (values: any) => {
    const data: Partial<Category> = {
      nameRu: values.nameRu,
      nameKk: values.nameKk,
      nameEn: values.nameEn,
      slug: values.slug,
      description: values.description,
      displayOrder: values.displayOrder || 0,
    };

    if (isEditMode) {
      updateMutation.mutate({ id: Number(id), data });
    } else {
      createMutation.mutate(data);
    }
  };

  if (isEditMode && isCategoryLoading) {
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
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.CATEGORIES)}>
            Назад
          </Button>
        </Space>

        <Title level={2}>{isEditMode ? 'Редактировать категорию' : 'Создать категорию'}</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            displayOrder: 0,
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Название (RU)"
                name="nameRu"
                rules={[{ required: true, message: 'Введите название на русском' }]}
              >
                <Input
                  placeholder="Название категории на русском"
                  onChange={handleNameRuChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Название (KK)"
                name="nameKk"
                rules={[{ required: true, message: 'Введите название на казахском' }]}
              >
                <Input placeholder="Название категории на казахском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Название (EN)"
                name="nameEn"
                rules={[{ required: true, message: 'Введите название на английском' }]}
              >
                <Input placeholder="Название категории на английском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Slug (URL)"
                name="slug"
                rules={[
                  { required: true, message: 'Введите slug' },
                  {
                    pattern: /^[a-z0-9-]+$/,
                    message: 'Только латинские буквы, цифры и дефис'
                  }
                ]}
                extra="Используется в URL адресе категории"
              >
                <Input placeholder="adventure-tours" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Порядок отображения"
                name="displayOrder"
                rules={[{ required: true, message: 'Введите порядок' }]}
                extra="Чем меньше число, тем выше в списке"
              >
                <InputNumber min={0} max={999} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Описание (опционально)"
                name="description"
              >
                <TextArea rows={4} placeholder="Краткое описание категории" />
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
                {isEditMode ? 'Сохранить изменения' : 'Создать категорию'}
              </Button>
              <Button onClick={() => navigate(ROUTES.CATEGORIES)} size="large">
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CategoryFormPage;
