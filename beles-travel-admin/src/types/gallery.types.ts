// src/types/gallery.types.ts

export interface GalleryImage {
  id: number;
  imageUrl: string;
  thumbnailUrl?: string;
  titleRu?: string;
  titleKk?: string;
  titleEn?: string;
  descriptionRu?: string;
  descriptionKk?: string;
  descriptionEn?: string;
  tags: string[];
  category?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryImageCreateRequest {
  titleRu?: string;
  titleKk?: string;
  titleEn?: string;
  descriptionRu?: string;
  descriptionKk?: string;
  descriptionEn?: string;
  tags?: string[];
  category?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface GalleryImageUpdateRequest extends GalleryImageCreateRequest {
  id: number;
}

export interface GalleryListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  isActive?: boolean;
}

export interface GalleryListResponse {
  images: GalleryImage[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
