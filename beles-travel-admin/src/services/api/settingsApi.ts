// src/services/api/settingsApi.ts

import { axiosInstance } from './axios.config';
import type { Settings, SettingsUpdateRequest } from '@/types/settings.types';

export const settingsApi = {
  // Get all settings
  getAllSettings: async (): Promise<Settings> => {
    const response = await axiosInstance.get('/admin/settings');
    return response.data;
  },

  // Update settings
  updateSettings: async (data: SettingsUpdateRequest): Promise<Settings> => {
    const response = await axiosInstance.put('/admin/settings', data);
    return response.data;
  },
};
