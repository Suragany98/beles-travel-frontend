// src/pages/auth/LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, Alert, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import { LoginRequest } from '@/types/auth.types';

const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const onFinish = async (values: LoginRequest) => {
    setLoading(true);
    setError(null);

    try {
      await login(values);
      // Navigation is handled in AuthContext
    } catch (err: any) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message ||
        'Неверное имя пользователя или пароль'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <Title level={2} className="!mb-2">
            Beles Travel Admin
          </Title>
          <Text type="secondary">Вход в административную панель</Text>
        </div>

        {error && (
          <Alert
            message="Ошибка входа"
            description={error}
            type="error"
            closable
            onClose={() => setError(null)}
            className="mb-4"
          />
        )}

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            label="Имя пользователя"
            name="username"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя пользователя!' }
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="admin"
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
            >
              {loading ? 'Вход...' : 'Войти'}
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center text-gray-500 text-sm mt-4">
          <Text type="secondary">
            Демо: admin / admin123
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
