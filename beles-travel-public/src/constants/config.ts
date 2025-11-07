// src/constants/config.ts

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Beles Travel';
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
export const DEFAULT_LANGUAGE = import.meta.env.VITE_DEFAULT_LANGUAGE || 'ru';

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
} as const;

export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/belestravel',
  FACEBOOK: 'https://facebook.com/belestravel',
  WHATSAPP: 'https://wa.me/77001234567',
} as const;

export const CONTACT_INFO = {
  PHONE: '+7 (700) 123-45-67',
  EMAIL: 'info@belestravel.kz',
  ADDRESS: 'г. Алматы, ул. Абая 123',
} as const;
