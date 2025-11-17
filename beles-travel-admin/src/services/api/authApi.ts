// src/services/api/authApi.ts

import { axiosInstance } from './axios.config';
import { LoginRequest, AuthResponse, User } from '@/types/auth.types';
import { tokenService } from '../auth/tokenService';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/admin/auth/login', credentials);
    const authData = response.data.data;

    // Save tokens
    tokenService.setAccessToken(authData.accessToken);
    tokenService.setRefreshToken(authData.refreshToken);

    return authData;
  },

  logout: async (): Promise<void> => {
    try {
      await axiosInstance.post('/admin/auth/logout');
    } finally {
      tokenService.clearTokens();
    }
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await axiosInstance.get('/admin/auth/me');
    return response.data.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await axiosInstance.post('/admin/auth/refresh', {}, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const authData = response.data.data;
    tokenService.setAccessToken(authData.accessToken);
    tokenService.setRefreshToken(authData.refreshToken);

    return authData;
  }
};
