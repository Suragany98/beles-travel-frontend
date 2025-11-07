// src/types/booking.types.ts

import type { Tour, TourDate } from './tour.types';

export interface BookingCreateRequest {
  tourId: number;
  tourDateId: number;
  fullName: string;
  email: string;
  phone: string;
  participantsCount: number;
  specialRequests?: string;
}

export interface Booking {
  id: number;
  bookingNumber: string;
  tour: Tour;
  tourDate: TourDate;
  customer: Customer;
  participantsCount: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  specialRequests?: string;
  bookedAt: string;
  confirmedAt?: string;
  cancelledAt?: string;
}

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export const BookingStatus = {
  PENDING: 'PENDING' as const,
  CONFIRMED: 'CONFIRMED' as const,
  CANCELLED: 'CANCELLED' as const,
  COMPLETED: 'COMPLETED' as const,
};

export type PaymentStatus = 'PENDING' | 'PARTIAL' | 'PAID' | 'REFUNDED';

export const PaymentStatus = {
  PENDING: 'PENDING' as const,
  PARTIAL: 'PARTIAL' as const,
  PAID: 'PAID' as const,
  REFUNDED: 'REFUNDED' as const,
};

export interface AvailabilityResponse {
  available: boolean;
  availableSlots: number;
  message?: string;
}

export interface PriceCalculationRequest {
  tourId: number;
  tourDateId: number;
  participantsCount: number;
}

export interface PriceCalculationResponse {
  pricePerPerson: number;
  totalPrice: number;
  participantsCount: number;
}
