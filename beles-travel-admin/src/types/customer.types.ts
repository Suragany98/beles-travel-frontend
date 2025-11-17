// src/types/customer.types.ts

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  iin?: string;
  passportNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  createdAt: string;
  updatedAt: string;
  totalBookings: number;
  completedBookings: number;
}

export interface CustomerListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface CustomerListResponse {
  customers: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
