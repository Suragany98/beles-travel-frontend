// src/services/api/tourApi.ts

import { axiosInstance } from './axios.config';
import type {
  Tour,
  TourCreateRequest,
  TourUpdateRequest,
  TourListParams,
  TourListResponse,
} from '@/types/tour.types';

export const tourApi = {
  // Get all tours with filters and pagination
  getAllTours: async (params?: TourListParams): Promise<TourListResponse> => {
    const response = await axiosInstance.get('/admin/tours', { params });
    return response.data;
  },

  // Get single tour by ID
  getTourById: async (id: number): Promise<Tour> => {
    const response = await axiosInstance.get(`/admin/tours/${id}`);
    return response.data;
  },

  // Create new tour
  createTour: async (data: TourCreateRequest): Promise<Tour> => {
    const response = await axiosInstance.post('/admin/tours', data);
    return response.data;
  },

  // Update existing tour
  updateTour: async (id: number, data: TourUpdateRequest): Promise<Tour> => {
    const response = await axiosInstance.put(`/admin/tours/${id}`, data);
    return response.data;
  },

  // Delete tour
  deleteTour: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/admin/tours/${id}`);
  },

  // Upload tour image
  uploadTourImage: async (tourId: number, file: File, isCover: boolean = false): Promise<void> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('isCover', String(isCover));

    await axiosInstance.post(`/admin/tours/${tourId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Delete tour image
  deleteTourImage: async (tourId: number, imageId: number): Promise<void> => {
    await axiosInstance.delete(`/admin/tours/${tourId}/images/${imageId}`);
  },

  // Add tour date
  addTourDate: async (tourId: number, dateData: any): Promise<void> => {
    await axiosInstance.post(`/admin/tours/${tourId}/dates`, dateData);
  },

  // Update tour date
  updateTourDate: async (tourId: number, dateId: number, dateData: any): Promise<void> => {
    await axiosInstance.put(`/admin/tours/${tourId}/dates/${dateId}`, dateData);
  },

  // Delete tour date
  deleteTourDate: async (tourId: number, dateId: number): Promise<void> => {
    await axiosInstance.delete(`/admin/tours/${tourId}/dates/${dateId}`);
  },
};
