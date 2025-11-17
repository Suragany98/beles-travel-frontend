// src/pages/bookings/BookingDetailPage.tsx

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  Descriptions,
  Button,
  Space,
  Tag,
  Typography,
  Spin,
  Modal,
  Select,
  Form,
  Input,
  message,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { bookingApi } from '@/services/api/bookingApi';
import { ROUTES } from '@/constants/routes';
import type { Booking, BookingStatus, PaymentStatus } from '@/types/booking.types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const BookingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch booking data
  const { data: booking, isLoading } = useQuery({
    queryKey: ['admin-booking', id],
    queryFn: () => bookingApi.getBookingById(Number(id)),
    enabled: !!id,
  });

  // Update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      bookingApi.updateBookingStatus(id, data),
    onSuccess: () => {
      message.success('Статус успешно обновлен');
      queryClient.invalidateQueries({ queryKey: ['admin-booking', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      setStatusModalVisible(false);
      form.resetFields();
    },
    onError: () => {
      message.error('Ошибка при обновлении статуса');
    },
  });

  // Confirm booking mutation
  const confirmMutation = useMutation({
    mutationFn: (id: number) => bookingApi.confirmBooking(id),
    onSuccess: () => {
      message.success('Бронирование подтверждено');
      queryClient.invalidateQueries({ queryKey: ['admin-booking', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
    },
    onError: () => {
      message.error('Ошибка при подтверждении');
    },
  });

  // Cancel booking mutation
  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }: { id: number; reason?: string }) =>
      bookingApi.cancelBooking(id, reason),
    onSuccess: () => {
      message.success('Бронирование отменено');
      queryClient.invalidateQueries({ queryKey: ['admin-booking', id] });
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
    },
    onError: () => {
      message.error('Ошибка при отмене');
    },
  });

  const handleUpdateStatus = (values: any) => {
    updateStatusMutation.mutate({
      id: Number(id),
      data: values,
    });
  };

  const handleConfirm = () => {
    Modal.confirm({
      title: 'Подтвердить бронирование?',
      content: 'Клиент получит уведомление о подтверждении.',
      okText: 'Подтвердить',
      cancelText: 'Отмена',
      onOk: () => {
        confirmMutation.mutate(Number(id));
      },
    });
  };

  const handleCancel = () => {
    Modal.confirm({
      title: 'Отменить бронирование?',
      content: (
        <Form layout="vertical">
          <Form.Item label="Причина отмены (опционально)">
            <Input.TextArea
              id="cancel-reason"
              rows={3}
              placeholder="Укажите причину отмены"
            />
          </Form.Item>
        </Form>
      ),
      okText: 'Отменить бронирование',
      okType: 'danger',
      cancelText: 'Назад',
      onOk: () => {
        const reason = (document.getElementById('cancel-reason') as HTMLTextAreaElement)?.value;
        cancelMutation.mutate({ id: Number(id), reason });
      },
    });
  };

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

  if (isLoading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Text>Бронирование не найдено</Text>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Space style={{ marginBottom: '24px' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(ROUTES.BOOKINGS)}>
            Назад
          </Button>
        </Space>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={2}>Бронирование #{booking.bookingNumber}</Title>
          <Space>
            {booking.status === 'PENDING' && (
              <>
                <Button
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={handleConfirm}
                  loading={confirmMutation.isPending}
                >
                  Подтвердить
                </Button>
                <Button
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={handleCancel}
                  loading={cancelMutation.isPending}
                >
                  Отменить
                </Button>
              </>
            )}
            <Button onClick={() => setStatusModalVisible(true)}>
              Изменить статус
            </Button>
          </Space>
        </div>

        <Row gutter={24}>
          <Col span={12}>
            <Card title="Информация о бронировании" size="small" style={{ marginBottom: '16px' }}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Номер">{booking.bookingNumber}</Descriptions.Item>
                <Descriptions.Item label="Статус">
                  <Tag color={getStatusColor(booking.status)}>{getStatusText(booking.status)}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Статус оплаты">
                  <Tag color={getPaymentStatusColor(booking.paymentStatus)}>
                    {getPaymentStatusText(booking.paymentStatus)}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Дата создания">
                  {dayjs(booking.createdAt).format('DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label="Обновлено">
                  {dayjs(booking.updatedAt).format('DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title="Информация о туре" size="small">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Тур">{booking.tourTitle}</Descriptions.Item>
                <Descriptions.Item label="Дата начала">
                  {dayjs(booking.startDate).format('DD.MM.YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Дата окончания">
                  {dayjs(booking.endDate).format('DD.MM.YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Участников">{booking.numberOfPeople}</Descriptions.Item>
                <Descriptions.Item label="Общая стоимость">
                  <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
                    {booking.totalPrice.toLocaleString()} ₸
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>

          <Col span={12}>
            <Card title="Информация о клиенте" size="small" style={{ marginBottom: '16px' }}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="ФИО">{booking.customer.fullName}</Descriptions.Item>
                <Descriptions.Item label="Email">{booking.customer.email}</Descriptions.Item>
                <Descriptions.Item label="Телефон">{booking.customer.phone}</Descriptions.Item>
                {booking.customer.nationality && (
                  <Descriptions.Item label="Гражданство">
                    {booking.customer.nationality}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>

            {(booking.specialRequests || booking.customer.specialRequests) && (
              <Card title="Особые пожелания" size="small">
                <Text>{booking.specialRequests || booking.customer.specialRequests}</Text>
              </Card>
            )}
          </Col>
        </Row>

        <Modal
          title="Изменить статус"
          open={statusModalVisible}
          onCancel={() => {
            setStatusModalVisible(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleUpdateStatus}>
            <Form.Item
              label="Статус бронирования"
              name="status"
              rules={[{ required: true, message: 'Выберите статус' }]}
            >
              <Select placeholder="Выберите статус">
                <Select.Option value="PENDING">Ожидает</Select.Option>
                <Select.Option value="CONFIRMED">Подтверждено</Select.Option>
                <Select.Option value="CANCELLED">Отменено</Select.Option>
                <Select.Option value="COMPLETED">Завершено</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Статус оплаты" name="paymentStatus">
              <Select placeholder="Выберите статус оплаты">
                <Select.Option value="PENDING">Ожидает</Select.Option>
                <Select.Option value="PAID">Оплачено</Select.Option>
                <Select.Option value="REFUNDED">Возврат</Select.Option>
                <Select.Option value="FAILED">Ошибка</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Примечание" name="notes">
              <Input.TextArea rows={3} placeholder="Добавьте примечание (опционально)" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateStatusMutation.isPending}
                >
                  Сохранить
                </Button>
                <Button onClick={() => setStatusModalVisible(false)}>Отмена</Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default BookingDetailPage;
