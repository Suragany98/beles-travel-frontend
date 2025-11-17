// src/constants/routes.ts

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  TOURS: '/tours',
  TOUR_CREATE: '/tours/create',
  TOUR_EDIT: '/tours/edit/:id',
  BOOKINGS: '/bookings',
  BOOKING_DETAIL: '/bookings/:id',
  CATEGORIES: '/categories',
  GALLERY: '/gallery',
  CUSTOMERS: '/customers',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
} as const;

export const buildTourEditRoute = (id: number) => `/tours/edit/${id}`;
export const buildBookingDetailRoute = (id: number) => `/bookings/${id}`;
