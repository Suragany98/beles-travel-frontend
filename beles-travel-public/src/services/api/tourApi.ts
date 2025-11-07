// src/services/api/tourApi.ts

import { axiosInstance } from './axios.config';
import { Tour, TourFilters, TourListResponse, TourDate } from '@/types/tour.types';

export const tourApi = {
  // Получить все туры с фильтрами
  getAllTours: async (
    filters: TourFilters,
    page: number = 0,
    size: number = 10
  ): Promise<TourListResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());

    if (filters.categoryId) params.append('categoryId', filters.categoryId.toString());
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.difficulty) params.append('difficulty', filters.difficulty);
    if (filters.destination) params.append('destination', filters.destination);
    if (filters.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters.search) params.append('query', filters.search);

    const response = await axiosInstance.get(`/public/tours?${params.toString()}`);
    return response.data.data;
  },

  // Получить тур по ID
  getTourById: async (id: number): Promise<Tour> => {
    const response = await axiosInstance.get(`/public/tours/${id}`);
    return response.data.data;
  },

  // Получить популярные туры
  getFeaturedTours: async (limit: number = 6): Promise<Tour[]> => {
    const response = await axiosInstance.get(`/public/tours/featured?limit=${limit}`);
    return response.data.data;
  },

  // Поиск туров
  searchTours: async (query: string, page: number = 0, size: number = 10): Promise<TourListResponse> => {
    const response = await axiosInstance.get(
      `/public/tours/search?query=${query}&page=${page}&size=${size}`
    );
    return response.data.data;
  },

  // Получить доступные даты
  getAvailableDates: async (tourId: number): Promise<TourDate[]> => {
    const response = await axiosInstance.get(`/public/tours/${tourId}/dates`);
    return response.data.data;
  }
};
