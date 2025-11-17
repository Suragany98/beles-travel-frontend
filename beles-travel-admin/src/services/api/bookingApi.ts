// src/services/api/bookingApi.ts

import { axiosInstance } from './axios.config';
import type {
  Booking,
  BookingListParams,
  BookingListResponse,
  BookingUpdateStatusRequest,
} from '@/types/booking.types';

export const bookingApi = {
  // Get all bookings with filters and pagination
  getAllBookings: async (params?: BookingListParams): Promise<BookingListResponse> => {
    const response = await axiosInstance.get('/admin/bookings', { params });
    return response.data;
  },

  // Get single booking by ID
  getBookingById: async (id: number): Promise<Booking> => {
    const response = await axiosInstance.get(`/admin/bookings/${id}`);
    return response.data;
  },

  // Update booking status
  updateBookingStatus: async (
    id: number,
    data: BookingUpdateStatusRequest
  ): Promise<Booking> => {
    const response = await axiosInstance.patch(`/admin/bookings/${id}/status`, data);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id: number, reason?: string): Promise<Booking> => {
    const response = await axiosInstance.post(`/admin/bookings/${id}/cancel`, { reason });
    return response.data;
  },

  // Confirm booking
  confirmBooking: async (id: number): Promise<Booking> => {
    const response = await axiosInstance.post(`/admin/bookings/${id}/confirm`);
    return response.data;
  },

  // Get booking statistics
  getBookingStats: async (): Promise<any> => {
    const response = await axiosInstance.get('/admin/bookings/stats');
    return response.data;
  },
};
