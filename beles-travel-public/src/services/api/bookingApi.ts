// src/services/api/bookingApi.ts

import { axiosInstance } from './axios.config';
import {
  BookingCreateRequest,
  Booking,
  AvailabilityResponse,
  PriceCalculationRequest,
  PriceCalculationResponse
} from '@/types/booking.types';

export const bookingApi = {
  // Создать бронирование
  createBooking: async (request: BookingCreateRequest): Promise<Booking> => {
    const response = await axiosInstance.post('/public/bookings', request);
    return response.data.data;
  },

  // Проверить доступность
  checkAvailability: async (
    tourDateId: number,
    participantsCount: number
  ): Promise<AvailabilityResponse> => {
    const response = await axiosInstance.get(
      `/public/bookings/check-availability?tourDateId=${tourDateId}&participantsCount=${participantsCount}`
    );
    return response.data.data;
  },

  // Рассчитать стоимость
  calculatePrice: async (request: PriceCalculationRequest): Promise<PriceCalculationResponse> => {
    const response = await axiosInstance.post('/public/bookings/calculate', request);
    return response.data.data;
  }
};
