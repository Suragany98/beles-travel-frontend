// src/pages/settings/SettingsPage.tsx

import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  Form,
  Input,
  Switch,
  Select,
  Button,
  Typography,
  Divider,
  message,
  Spin,
  Row,
  Col,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { settingsApi } from '@/services/api/settingsApi';

const { Title } = Typography;

const SettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // Fetch settings
  const { data: settings, isLoading } = useQuery({
    queryKey: ['admin-settings'],
    queryFn: () => settingsApi.getAllSettings(),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (values: any) => settingsApi.updateSettings({ settings: values }),
    onSuccess: () => {
      message.success('Настройки успешно сохранены');
      queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
    },
    onError: () => {
      message.error('Ошибка при сохранении настроек');
    },
  });

  // Set form values when settings are loaded
  useEffect(() => {
    if (settings) {
      form.setFieldsValue(settings);
    }
  }, [settings, form]);

  const handleSubmit = (values: any) => {
    updateMutation.mutate(values);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>Настройки системы</Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            'site.name': 'Beles Travel',
            'site.description': 'Туристическая компания',
            'site.email': 'info@belestravel.kz',
            'site.phone': '+7 (700) 123-45-67',
            'site.address': 'г. Алматы, ул. Абая, 150',
            'email.notifications.enabled': 'true',
            'email.from': 'noreply@belestravel.kz',
            'booking.auto_confirm': 'false',
            'booking.payment_deadline_hours': '24',
          }}
        >
          <Divider orientation="left">Информация о сайте</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Название сайта"
                name="site.name"
                rules={[{ required: true, message: 'Введите название сайта' }]}
              >
                <Input placeholder="Beles Travel" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="site.email"
                rules={[
                  { required: true, message: 'Введите email' },
                  { type: 'email', message: 'Неверный формат email' },
                ]}
              >
                <Input placeholder="info@belestravel.kz" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Телефон"
                name="site.phone"
                rules={[{ required: true, message: 'Введите телефон' }]}
              >
                <Input placeholder="+7 (700) 123-45-67" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Адрес"
                name="site.address"
              >
                <Input placeholder="г. Алматы, ул. Абая, 150" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Описание сайта"
            name="site.description"
          >
            <Input.TextArea rows={3} placeholder="Краткое описание компании" />
          </Form.Item>

          <Divider orientation="left">Настройки Email</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email отправителя"
                name="email.from"
                rules={[{ type: 'email', message: 'Неверный формат email' }]}
              >
                <Input placeholder="noreply@belestravel.kz" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Уведомления включены"
                name="email.notifications.enabled"
              >
                <Select>
                  <Select.Option value="true">Да</Select.Option>
                  <Select.Option value="false">Нет</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Настройки бронирования</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Автоподтверждение бронирований"
                name="booking.auto_confirm"
              >
                <Select>
                  <Select.Option value="true">Да</Select.Option>
                  <Select.Option value="false">Нет</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Срок оплаты (часы)"
                name="booking.payment_deadline_hours"
                rules={[{ required: true, message: 'Введите срок оплаты' }]}
              >
                <Input type="number" placeholder="24" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: '24px' }}>
            <Button
              type="primary"
              htmlType="submit"
              icon={<SaveOutlined />}
              loading={updateMutation.isPending}
              size="large"
            >
              Сохранить настройки
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SettingsPage;
