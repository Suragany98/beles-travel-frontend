// src/services/api/dashboardApi.ts

import { axiosInstance } from './axios.config';

export interface DashboardStats {
  totalRevenue: number;
  totalBookings: number;
  activeTours: number;
  totalCustomers: number;
  pendingBookings: number;
  completedBookings: number;
  revenueGrowth: number;
  bookingsGrowth: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface PopularTour {
  id: number;
  title: string;
  bookingsCount: number;
  revenue: number;
}

export interface RecentBooking {
  id: number;
  bookingNumber: string;
  customerName: string;
  tourTitle: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export interface DashboardData {
  stats: DashboardStats;
  revenueChart: RevenueData[];
  popularTours: PopularTour[];
  recentBookings: RecentBooking[];
}

export const dashboardApi = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<DashboardData> => {
    const response = await axiosInstance.get('/admin/dashboard/stats');
    return response.data;
  },
};
