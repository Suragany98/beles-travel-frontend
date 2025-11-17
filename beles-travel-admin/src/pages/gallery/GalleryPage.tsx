// src/pages/gallery/GalleryPage.tsx

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Card,
  Upload,
  Modal,
  Form,
  Input,
  Switch,
  InputNumber,
  Select,
  Button,
  Space,
  Typography,
  Row,
  Col,
  Image,
  message,
  Empty,
  Spin,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { galleryApi } from '@/services/api/galleryApi';
import type { GalleryImage, GalleryImageUpdateRequest } from '@/types/gallery.types';

const { Title } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;
const { confirm } = Modal;

const GalleryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // Fetch gallery images
  const { data, isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: () => galleryApi.getAllImages(),
  });

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async ({ file, data }: { file: File; data: any }) => {
      return galleryApi.uploadImage(file, data);
    },
    onSuccess: () => {
      message.success('Изображение успешно загружено');
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      setUploadModalVisible(false);
      setFileList([]);
      uploadForm.resetFields();
    },
    onError: () => {
      message.error('Ошибка при загрузке изображения');
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: GalleryImageUpdateRequest }) =>
      galleryApi.updateImage(id, data),
    onSuccess: () => {
      message.success('Изображение успешно обновлено');
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      setEditModalVisible(false);
      setSelectedImage(null);
      editForm.resetFields();
    },
    onError: () => {
      message.error('Ошибка при обновлении изображения');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => galleryApi.deleteImage(id),
    onSuccess: () => {
      message.success('Изображение успешно удалено');
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
    },
    onError: () => {
      message.error('Ошибка при удалении изображения');
    },
  });

  const handleUpload = (values: any) => {
    if (fileList.length === 0) {
      message.error('Выберите файл для загрузки');
      return;
    }

    const file = fileList[0].originFileObj as File;
    uploadMutation.mutate({ file, data: values });
  };

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image);
    editForm.setFieldsValue(image);
    setEditModalVisible(true);
  };

  const handleUpdate = (values: any) => {
    if (!selectedImage) return;

    updateMutation.mutate({
      id: selectedImage.id,
      data: { ...values, id: selectedImage.id },
    });
  };

  const handleDelete = (image: GalleryImage) => {
    confirm({
      title: 'Удалить изображение?',
      icon: <ExclamationCircleOutlined />,
      content: 'Вы уверены, что хотите удалить это изображение?',
      okText: 'Удалить',
      okType: 'danger',
      cancelText: 'Отмена',
      onOk: () => {
        deleteMutation.mutate(image.id);
      },
    });
  };

  const uploadProps: UploadProps = {
    fileList,
    onChange: ({ fileList }) => setFileList(fileList),
    beforeUpload: () => false, // Prevent auto upload
    accept: 'image/*',
    maxCount: 1,
  };

  const images = data?.images || [];

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2} style={{ margin: 0 }}>Управление галереей</Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setUploadModalVisible(true)}
            size="large"
          >
            Загрузить изображение
          </Button>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" />
          </div>
        ) : images.length === 0 ? (
          <Empty description="Нет изображений" />
        ) : (
          <Row gutter={[16, 16]}>
            {images.map((image) => (
              <Col xs={24} sm={12} md={8} lg={6} key={image.id}>
                <Card
                  hoverable
                  cover={
                    <Image
                      alt={image.titleRu || 'Gallery image'}
                      src={image.thumbnailUrl || image.imageUrl}
                      height={200}
                      style={{ objectFit: 'cover' }}
                      preview={{
                        src: image.imageUrl,
                      }}
                    />
                  }
                  actions={[
                    <EditOutlined key="edit" onClick={() => handleEdit(image)} />,
                    <DeleteOutlined key="delete" onClick={() => handleDelete(image)} />,
                  ]}
                >
                  <Card.Meta
                    title={image.titleRu || `ID: ${image.id}`}
                    description={
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        {image.descriptionRu && (
                          <div style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {image.descriptionRu}
                          </div>
                        )}
                        <div>
                          {image.tags.map((tag) => (
                            <Tag key={tag} color="blue" style={{ marginBottom: '4px' }}>
                              {tag}
                            </Tag>
                          ))}
                        </div>
                        <div>
                          <Tag color={image.isActive ? 'green' : 'red'}>
                            {image.isActive ? 'Активно' : 'Неактивно'}
                          </Tag>
                        </div>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>

      {/* Upload Modal */}
      <Modal
        title="Загрузить изображение"
        open={uploadModalVisible}
        onCancel={() => {
          setUploadModalVisible(false);
          setFileList([]);
          uploadForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={uploadForm}
          layout="vertical"
          onFinish={handleUpload}
          initialValues={{ isActive: true, displayOrder: 0 }}
        >
          <Form.Item>
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Нажмите или перетащите файл</p>
              <p className="ant-upload-hint">Поддерживаются изображения JPG, PNG, GIF</p>
            </Dragger>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Название (RU)" name="titleRu">
                <Input placeholder="Название на русском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Название (KK)" name="titleKk">
                <Input placeholder="Название на казахском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Название (EN)" name="titleEn">
                <Input placeholder="Название на английском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Описание (RU)" name="descriptionRu">
                <TextArea rows={2} placeholder="Описание на русском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Теги" name="tags">
                <Select mode="tags" placeholder="Добавьте теги" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Категория" name="category">
                <Input placeholder="Категория (например: природа, города)" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Порядок отображения" name="displayOrder">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Активно" name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={uploadMutation.isPending}
              >
                Загрузить
              </Button>
              <Button onClick={() => setUploadModalVisible(false)}>Отмена</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Редактировать изображение"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedImage(null);
          editForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdate}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Название (RU)" name="titleRu">
                <Input placeholder="Название на русском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Название (KK)" name="titleKk">
                <Input placeholder="Название на казахском" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Название (EN)" name="titleEn">
                <Input placeholder="Название на английском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Описание (RU)" name="descriptionRu">
                <TextArea rows={2} placeholder="Описание на русском" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Теги" name="tags">
                <Select mode="tags" placeholder="Добавьте теги" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Категория" name="category">
                <Input placeholder="Категория" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Порядок отображения" name="displayOrder">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Активно" name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={updateMutation.isPending}
              >
                Сохранить
              </Button>
              <Button onClick={() => setEditModalVisible(false)}>Отмена</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GalleryPage;
