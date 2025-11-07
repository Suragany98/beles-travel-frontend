// src/constants/routes.ts

export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  TOUR_DETAIL: '/tours/:id',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CONTACT: '/contact',
  BOOKING: '/booking/:tourId',
} as const;

export const buildTourDetailRoute = (id: number) => `/tours/${id}`;
export const buildBookingRoute = (tourId: number) => `/booking/${tourId}`;
