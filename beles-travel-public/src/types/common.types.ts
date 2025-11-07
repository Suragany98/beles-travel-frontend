// src/types/common.types.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export type Language = 'ru' | 'kk' | 'en';

export interface ContactMessage {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface GalleryImage {
  id: number;
  imageUrl: string;
  thumbnailUrl: string;
  title?: string;
  description?: string;
  category?: string;
  uploadedAt: string;
}
