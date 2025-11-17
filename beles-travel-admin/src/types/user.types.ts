// src/types/user.types.ts

export type UserRole = 'ADMIN';

export const UserRole = {
  ADMIN: 'ADMIN' as const,
};

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
}

export interface UserCreateRequest {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  isActive: boolean;
}

export interface UserUpdateRequest {
  email?: string;
  password?: string;
  fullName?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
