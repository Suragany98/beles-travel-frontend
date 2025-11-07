// src/services/api/categoryApi.ts

import { axiosInstance } from './axios.config';
import { Category } from '@/types/tour.types';

export const categoryApi = {
  // Получить все категории
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get('/public/categories');
    return response.data.data;
  },

  // Получить категорию по slug
  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await axiosInstance.get(`/public/categories/${slug}`);
    return response.data.data;
  }
};
