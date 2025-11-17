// src/types/common.types.ts

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  data: null;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
}
