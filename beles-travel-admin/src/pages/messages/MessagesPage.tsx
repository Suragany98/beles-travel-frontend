// src/pages/messages/MessagesPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Button,
  Space,
  Select,
  Modal,
  message as antMessage,
  Card,
  Typography,
  Tag,
  Drawer,
  Descriptions,
} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { messageApi } from '@/services/api/messageApi';
import type { Message, MessageStatus, MessageListParams } from '@/types/message.types';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [params, setParams] = useState<MessageListParams>({
    page: 1,
    limit: 10,
    status: undefined,
  });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch messages
  const { data, isLoading } = useQuery({
    queryKey: ['admin-messages', params],
    queryFn: () => messageApi.getAllMessages(params),
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => messageApi.markAsRead(id),
    onSuccess: () => {
      antMessage.success('Сообщение отмечено как прочитанное');
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
    },
    onError: () => {
      antMessage.error('Ошибка при обновлении статуса');
    },
  });

  // Mark as replied mutation
  const markAsRepliedMutation = useMutation({
    mutationFn: (id: number) => messageApi.markAsReplied(id),
    onSuccess: () => {
      antMessage.success('Сообщение отмечено как отвеченное');
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
    },
    onError: () => {
      antMessage.error('Ошибка при обновлении статуса');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => messageApi.deleteMessage(id),
    onSuccess: () => {
      antMessage.success('Сообщение успешно удалено');
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      setDrawerVisible(false);
      setSelectedMessage(null);
    },
    onError: () => {
      antMessage.error('Ошибка при удалении сообщения');
    },
  });

  const handleViewMessage = async (msg: Message) => {
    setSelectedMessage(msg);
    setDrawerVisible(true);

    // Auto mark as read if it's NEW
    if (msg.status === 'NEW') {
      markAsReadMutation.mutate(msg.id);
    }
  };

  const handleDelete = (msg: Message) => {
    confirm({
      title: 'Удалить сообщение?',
      icon: <ExclamationCircleOutlined />,
      content: `Вы уверены, что хотите удалить сообщение от "${msg.name}"?`,
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteMutation.mutate(msg.id);
      },
    });
  };

  const getStatusColor = (status: MessageStatus): string => {
    const statusMap = {
      NEW: 'orange',
      READ: 'blue',
      REPLIED: 'green',
    };
    return statusMap[status] || 'default';
  };

  const getStatusText = (status: MessageStatus): string => {
    const statusMap = {
      NEW: 'Новое',
      READ: 'Прочитано',
      REPLIED: 'Отвечено',
    };
    return statusMap[status] || status;
  };

  const columns: ColumnsType<Message> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (name: string, record) => (
        <Space>
          {record.status === 'NEW' && <MailOutlined style={{ color: '#1890ff' }} />}
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
      title: 'Тема',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: MessageStatus) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (_, msg) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewMessage(msg)}
          >
            Просмотр
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(msg)}
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
        <div style={{ marginBottom: '24px' }}>
          <Title level={2}>Сообщения</Title>
        </div>

        <Space style={{ marginBottom: '16px' }} size="middle">
          <Select
            placeholder="Статус"
            style={{ width: 150 }}
            value={params.status}
            onChange={(status) => setParams({ ...params, status, page: 1 })}
            allowClear
          >
            <Select.Option value="NEW">Новое</Select.Option>
            <Select.Option value="READ">Прочитано</Select.Option>
            <Select.Option value="REPLIED">Отвечено</Select.Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={data?.messages || []}
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
          rowClassName={(record) => record.status === 'NEW' ? 'font-weight-bold' : ''}
        />
      </Card>

      {/* Message Detail Drawer */}
      <Drawer
        title="Детали сообщения"
        placement="right"
        onClose={() => {
          setDrawerVisible(false);
          setSelectedMessage(null);
        }}
        open={drawerVisible}
        width={600}
      >
        {selectedMessage && (
          <div>
            <Descriptions column={1} size="small" bordered>
              <Descriptions.Item label="ID">{selectedMessage.id}</Descriptions.Item>
              <Descriptions.Item label="Имя">{selectedMessage.name}</Descriptions.Item>
              <Descriptions.Item label="Email">
                <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
              </Descriptions.Item>
              {selectedMessage.phone && (
                <Descriptions.Item label="Телефон">
                  <a href={`tel:${selectedMessage.phone}`}>{selectedMessage.phone}</a>
                </Descriptions.Item>
              )}
              <Descriptions.Item label="Тема">{selectedMessage.subject}</Descriptions.Item>
              <Descriptions.Item label="Статус">
                <Tag color={getStatusColor(selectedMessage.status)}>
                  {getStatusText(selectedMessage.status)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Дата">
                {dayjs(selectedMessage.createdAt).format('DD.MM.YYYY HH:mm')}
              </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: '24px' }}>
              <Title level={5}>Сообщение:</Title>
              <Card>
                <Paragraph style={{ whiteSpace: 'pre-wrap' }}>
                  {selectedMessage.message}
                </Paragraph>
              </Card>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Space>
                {selectedMessage.status !== 'REPLIED' && (
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => markAsRepliedMutation.mutate(selectedMessage.id)}
                    loading={markAsRepliedMutation.isPending}
                  >
                    Отметить как отвеченное
                  </Button>
                )}
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(selectedMessage)}
                  loading={deleteMutation.isPending}
                >
                  Удалить
                </Button>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default MessagesPage;
