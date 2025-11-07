// src/types/tour.types.ts

export interface Tour {
  id: number;
  titleRu: string;
  titleKk?: string;
  titleEn?: string;
  descriptionRu: string;
  descriptionKk?: string;
  descriptionEn?: string;
  category: Category;
  price: number;
  durationDays: number;
  maxParticipants?: number;
  difficultyLevel: TourDifficulty;
  destination: string;
  includedServices?: string;
  excludedServices?: string;
  itinerary?: DayItinerary[];
  isActive: boolean;
  featured: boolean;
  viewCount: number;
  images: TourImage[];
  dates: TourDate[];
  createdAt: string;
  updatedAt: string;
}

export interface TourImage {
  id: number;
  imageUrl: string;
  thumbnailUrl: string;
  captionRu?: string;
  captionKk?: string;
  captionEn?: string;
  displayOrder: number;
  isMain: boolean;
}

export interface TourDate {
  id: number;
  startDate: string;
  endDate: string;
  availableSlots: number;
  bookedSlots: number;
  priceOverride?: number;
  isAvailable: boolean;
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  activities?: string[];
}

export type TourDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

export const TourDifficulty = {
  EASY: 'EASY' as const,
  MEDIUM: 'MEDIUM' as const,
  HARD: 'HARD' as const,
};

export interface Category {
  id: number;
  nameRu: string;
  nameKk?: string;
  nameEn?: string;
  slug: string;
  descriptionRu?: string;
  icon?: string;
  displayOrder: number;
}

export interface TourFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  difficulty?: TourDifficulty;
  destination?: string;
  featured?: boolean;
  search?: string;
}

export interface TourListResponse {
  content: Tour[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}
