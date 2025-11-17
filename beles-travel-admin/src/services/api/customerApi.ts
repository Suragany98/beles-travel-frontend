// src/services/api/customerApi.ts

import { axiosInstance } from './axios.config';
import type {
  Customer,
  CustomerListParams,
  CustomerListResponse,
} from '@/types/customer.types';
import type { Booking } from '@/types/booking.types';

export const customerApi = {
  // Get all customers with filters and pagination
  getAllCustomers: async (params?: CustomerListParams): Promise<CustomerListResponse> => {
    const response = await axiosInstance.get('/admin/customers', { params });
    return response.data;
  },

  // Get single customer by ID
  getCustomerById: async (id: number): Promise<Customer> => {
    const response = await axiosInstance.get(`/admin/customers/${id}`);
    return response.data;
  },

  // Get customer bookings history
  getCustomerBookings: async (id: number): Promise<Booking[]> => {
    const response = await axiosInstance.get(`/admin/customers/${id}/bookings`);
    return response.data;
  },
};
