// src/services/api/userApi.ts

import { axiosInstance } from './axios.config';
import type {
  User,
  UserCreateRequest,
  UserUpdateRequest,
  UserListParams,
  UserListResponse,
} from '@/types/user.types';

export const userApi = {
  // Get all users with filters and pagination
  getAllUsers: async (params?: UserListParams): Promise<UserListResponse> => {
    const response = await axiosInstance.get('/admin/users', { params });
    return response.data;
  },

  // Get single user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await axiosInstance.get(`/admin/users/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (data: UserCreateRequest): Promise<User> => {
    const response = await axiosInstance.post('/admin/users', data);
    return response.data;
  },

  // Update existing user
  updateUser: async (id: number, data: UserUpdateRequest): Promise<User> => {
    const response = await axiosInstance.put(`/admin/users/${id}`, data);
    return response.data;
  },

  // Toggle user active status
  toggleUserActive: async (id: number): Promise<User> => {
    const response = await axiosInstance.patch(`/admin/users/${id}/toggle-active`);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/users/${id}`);
  },
};
