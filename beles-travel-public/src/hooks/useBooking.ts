// src/hooks/useBooking.ts

import { useMutation, useQuery } from '@tanstack/react-query';
import { bookingApi } from '@/services/api/bookingApi';
import { BookingCreateRequest, PriceCalculationRequest } from '@/types/booking.types';

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: (request: BookingCreateRequest) => bookingApi.createBooking(request),
  });
};

export const useCheckAvailability = (tourDateId: number, participantsCount: number) => {
  return useQuery({
    queryKey: ['availability', tourDateId, participantsCount],
    queryFn: () => bookingApi.checkAvailability(tourDateId, participantsCount),
    enabled: !!tourDateId && !!participantsCount,
  });
};

export const useCalculatePrice = (request: PriceCalculationRequest) => {
  return useQuery({
    queryKey: ['price-calculation', request.tourId, request.tourDateId, request.participantsCount],
    queryFn: () => bookingApi.calculatePrice(request),
    enabled: !!request.tourDateId && !!request.participantsCount,
  });
};
