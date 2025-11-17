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
  CATEGORY_CREATE: '/categories/create',
  CATEGORY_EDIT: '/categories/edit/:id',
  GALLERY: '/gallery',
  CUSTOMERS: '/customers',
  CUSTOMER_DETAIL: '/customers/:id',
  MESSAGES: '/messages',
  SETTINGS: '/settings',
  USERS: '/users',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/edit/:id',
} as const;

export const buildTourEditRoute = (id: number) => `/tours/edit/${id}`;
export const buildBookingDetailRoute = (id: number) => `/bookings/${id}`;
export const buildCategoryEditRoute = (id: number) => `/categories/edit/${id}`;
export const buildCustomerDetailRoute = (id: number) => `/customers/${id}`;
export const buildUserEditRoute = (id: number) => `/users/edit/${id}`;
