// src/hooks/useTours.ts

import { useQuery } from '@tanstack/react-query';
import { tourApi } from '@/services/api/tourApi';
import { TourFilters } from '@/types/tour.types';

export const useTours = (filters: TourFilters, page: number, size: number = 10) => {
  return useQuery({
    queryKey: ['tours', filters, page, size],
    queryFn: () => tourApi.getAllTours(filters, page, size),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
};

export const useTourDetail = (id: number) => {
  return useQuery({
    queryKey: ['tour', id],
    queryFn: () => tourApi.getTourById(id),
    enabled: !!id,
  });
};

export const useFeaturedTours = (limit: number = 6) => {
  return useQuery({
    queryKey: ['featured-tours', limit],
    queryFn: () => tourApi.getFeaturedTours(limit),
    staleTime: 10 * 60 * 1000, // 10 минут
  });
};

export const useTourDates = (tourId: number) => {
  return useQuery({
    queryKey: ['tour-dates', tourId],
    queryFn: () => tourApi.getAvailableDates(tourId),
    enabled: !!tourId,
  });
};
