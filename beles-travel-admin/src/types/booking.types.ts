// src/types/booking.types.ts

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export const BookingStatus = {
  PENDING: 'PENDING' as const,
  CONFIRMED: 'CONFIRMED' as const,
  CANCELLED: 'CANCELLED' as const,
  COMPLETED: 'COMPLETED' as const,
};

export type PaymentStatus = 'PENDING' | 'PAID' | 'REFUNDED' | 'FAILED';

export const PaymentStatus = {
  PENDING: 'PENDING' as const,
  PAID: 'PAID' as const,
  REFUNDED: 'REFUNDED' as const,
  FAILED: 'FAILED' as const,
};

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  nationality?: string;
  specialRequests?: string;
}

export interface Booking {
  id: number;
  bookingNumber: string;
  customer: Customer;
  tourId: number;
  tourTitle: string;
  tourDateId: number;
  startDate: string;
  endDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface BookingListResponse {
  bookings: Booking[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BookingUpdateStatusRequest {
  status: BookingStatus;
  paymentStatus?: PaymentStatus;
  notes?: string;
}
