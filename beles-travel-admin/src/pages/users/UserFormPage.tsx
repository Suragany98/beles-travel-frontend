// src/pages/users/UserFormPage.tsx

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Form,
  Input,
  Select,
  Switch,
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
import { userApi } from '@/services/api/userApi';
import { ROUTES } from '@/constants/routes';
import type { UserCreateRequest, UserUpdateRequest } from '@/types/user.types';

const { Title } = Typography;

const UserFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const isEditMode = !!id;

  // Fetch user data if editing
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['admin-user', id],
    queryFn: () => userApi.getUserById(Number(id)),
    enabled: isEditMode,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: UserCreateRequest) => userApi.createUser(data),
    onSuccess: () => {
      message.success('Пользователь успешно создан');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      navigate(ROUTES.USERS);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при создании пользователя';
      message.error(errorMessage);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UserUpdateRequest }) =>
      userApi.updateUser(id, data),
    onSuccess: () => {
      message.success('Пользователь успешно обновлен');
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      queryClient.invalidateQueries({ queryKey: ['admin-user', id] });
      navigate(ROUTES.USERS);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Ошибка при обновлении пользователя';
      message.error(errorMessage);
    },
  });

  // Set form values when user data is loaded
  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const handleSubmit = (values: any) => {
    if (isEditMode) {
      const data: UserUpdateRequest = {
        email: values.email,
        fullName: values.fullName,
        role: values.role,
        isActive: values.isActive,
      };

      // Only include password if it was changed
      if (values.password) {
        data.password = values.password;
      }

      updateMutation.mutate({ id: Number(id), data });
    } else {
      const data: UserCreateRequest = {
        username: values.username,
        email: values.email,
        password: values.password,
        fullName: values.fullName,
        role: values.role,
        isActive: values.isActive !== undefined ? values.isActive : true,
      };

      createMutation.mutate(data);
    }
  };

  if (isEditMode && isUserLoading) {
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
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.USERS)}>
            Назад
          </Button>
        </Space>

        <Title level={2}>{isEditMode ? 'Редактировать пользователя' : 'Создать пользователя'}</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            isActive: true,
            role: 'ADMIN',
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Имя пользователя"
                name="username"
                rules={[
                  { required: !isEditMode, message: 'Введите имя пользователя' },
                  { min: 3, message: 'Минимум 3 символа' },
                  { pattern: /^[a-zA-Z0-9_]+$/, message: 'Только латинские буквы, цифры и _' },
                ]}
              >
                <Input
                  placeholder="admin"
                  disabled={isEditMode}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ФИО"
                name="fullName"
                rules={[
                  { required: true, message: 'Введите ФИО' },
                  { min: 2, message: 'Минимум 2 символа' },
                ]}
              >
                <Input placeholder="Иван Иванов" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Введите email' },
                  { type: 'email', message: 'Неверный формат email' },
                ]}
              >
                <Input placeholder="admin@belestravel.kz" autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={isEditMode ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль'}
                name="password"
                rules={[
                  { required: !isEditMode, message: 'Введите пароль' },
                  { min: 6, message: 'Минимум 6 символов' },
                ]}
              >
                <Input.Password
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Роль"
                name="role"
                rules={[{ required: true, message: 'Выберите роль' }]}
              >
                <Select>
                  <Select.Option value="ADMIN">Администратор</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Активный" name="isActive" valuePropName="checked">
                <Switch />
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
                {isEditMode ? 'Сохранить изменения' : 'Создать пользователя'}
              </Button>
              <Button onClick={() => navigate(ROUTES.USERS)} size="large">
                Отмена
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserFormPage;
