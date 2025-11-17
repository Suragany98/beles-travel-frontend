// src/types/tour.types.ts

export type TourDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const TourDifficulty = {
  EASY: 'EASY' as const,
  MEDIUM: 'MEDIUM' as const,
  HARD: 'HARD' as const,
};

export type TourStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export const TourStatus = {
  DRAFT: 'DRAFT' as const,
  PUBLISHED: 'PUBLISHED' as const,
  ARCHIVED: 'ARCHIVED' as const,
};

export interface TourImage {
  id: number;
  imageUrl: string;
  altText?: string;
  displayOrder: number;
  isCover: boolean;
}

export interface TourDate {
  id: number;
  startDate: string;
  endDate: string;
  availableSlots: number;
  bookedSlots: number;
  basePrice: number;
  specialPrice?: number;
  isActive: boolean;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals?: string;
}

export interface Category {
  id: number;
  nameRu: string;
  nameKk: string;
  nameEn: string;
  slug: string;
  description?: string;
  displayOrder: number;
}

export interface Tour {
  id: number;
  titleRu: string;
  titleKk: string;
  titleEn: string;
  slug: string;
  descriptionRu: string;
  descriptionKk: string;
  descriptionEn: string;
  shortDescriptionRu?: string;
  shortDescriptionKk?: string;
  shortDescriptionEn?: string;
  duration: number;
  difficulty: TourDifficulty;
  destination: string;
  maxGroupSize: number;
  minAge: number;
  basePrice: number;
  status: TourStatus;
  featured: boolean;
  includedServices: string[];
  excludedServices: string[];
  whatToBring: string[];
  categories: Category[];
  images: TourImage[];
  dates: TourDate[];
  itinerary: DayItinerary[];
  createdAt: string;
  updatedAt: string;
}

export interface TourCreateRequest {
  titleRu: string;
  titleKk: string;
  titleEn: string;
  descriptionRu: string;
  descriptionKk: string;
  descriptionEn: string;
  shortDescriptionRu?: string;
  shortDescriptionKk?: string;
  shortDescriptionEn?: string;
  duration: number;
  difficulty: TourDifficulty;
  destination: string;
  maxGroupSize: number;
  minAge: number;
  basePrice: number;
  status: TourStatus;
  featured: boolean;
  includedServices: string[];
  excludedServices: string[];
  whatToBring: string[];
  categoryIds: number[];
}

export interface TourUpdateRequest extends TourCreateRequest {
  id: number;
}

export interface TourListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TourStatus;
  categoryId?: number;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface TourListResponse {
  tours: Tour[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
