// src/services/api/categoryApi.ts

import { axiosInstance } from './axios.config';
import type { Category } from '@/types/tour.types';

export const categoryApi = {
  // Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    const response = await axiosInstance.get('/admin/categories');
    return response.data;
  },

  // Get single category by ID
  getCategoryById: async (id: number): Promise<Category> => {
    const response = await axiosInstance.get(`/admin/categories/${id}`);
    return response.data;
  },

  // Create new category
  createCategory: async (data: Partial<Category>): Promise<Category> => {
    const response = await axiosInstance.post('/admin/categories', data);
    return response.data;
  },

  // Update existing category
  updateCategory: async (id: number, data: Partial<Category>): Promise<Category> => {
    const response = await axiosInstance.put(`/admin/categories/${id}`, data);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/categories/${id}`);
  },
};
