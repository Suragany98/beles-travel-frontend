// src/services/api/contactApi.ts

import { axiosInstance } from './axios.config';
import { ContactMessage } from '@/types/common.types';

export const contactApi = {
  // Отправить сообщение
  sendMessage: async (message: ContactMessage): Promise<void> => {
    const response = await axiosInstance.post('/public/contact', message);
    return response.data;
  }
};
