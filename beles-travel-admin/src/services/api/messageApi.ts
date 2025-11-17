// src/services/api/messageApi.ts

import { axiosInstance } from './axios.config';
import type {
  Message,
  MessageListParams,
  MessageListResponse,
} from '@/types/message.types';

export const messageApi = {
  // Get all messages with filters and pagination
  getAllMessages: async (params?: MessageListParams): Promise<MessageListResponse> => {
    const response = await axiosInstance.get('/admin/messages', { params });
    return response.data;
  },

  // Get single message by ID
  getMessageById: async (id: number): Promise<Message> => {
    const response = await axiosInstance.get(`/admin/messages/${id}`);
    return response.data;
  },

  // Mark message as read
  markAsRead: async (id: number): Promise<Message> => {
    const response = await axiosInstance.patch(`/admin/messages/${id}/read`);
    return response.data;
  },

  // Mark message as replied
  markAsReplied: async (id: number): Promise<Message> => {
    const response = await axiosInstance.patch(`/admin/messages/${id}/replied`);
    return response.data;
  },

  // Delete message
  deleteMessage: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/messages/${id}`);
  },
};
