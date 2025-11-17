// src/services/api/galleryApi.ts

import { axiosInstance } from './axios.config';
import type {
  GalleryImage,
  GalleryImageCreateRequest,
  GalleryImageUpdateRequest,
  GalleryListParams,
  GalleryListResponse,
} from '@/types/gallery.types';

export const galleryApi = {
  // Get all gallery images with filters and pagination
  getAllImages: async (params?: GalleryListParams): Promise<GalleryListResponse> => {
    const response = await axiosInstance.get('/admin/gallery', { params });
    return response.data;
  },

  // Get single image by ID
  getImageById: async (id: number): Promise<GalleryImage> => {
    const response = await axiosInstance.get(`/admin/gallery/${id}`);
    return response.data;
  },

  // Upload new image
  uploadImage: async (file: File, data?: GalleryImageCreateRequest): Promise<GalleryImage> => {
    const formData = new FormData();
    formData.append('file', file);

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, String(value));
          }
        }
      });
    }

    const response = await axiosInstance.post('/admin/gallery/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update image metadata
  updateImage: async (id: number, data: GalleryImageUpdateRequest): Promise<GalleryImage> => {
    const response = await axiosInstance.put(`/admin/gallery/${id}`, data);
    return response.data;
  },

  // Delete image
  deleteImage: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/gallery/${id}`);
  },
};
