import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminLayout from './components/layout/AdminLayout/AdminLayout';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ToursPage from './pages/tours/ToursPage';
import TourFormPage from './pages/tours/TourFormPage';
import BookingsPage from './pages/bookings/BookingsPage';
import BookingDetailPage from './pages/bookings/BookingDetailPage';
import { ROUTES } from './constants/routes';

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Placeholder pages
const CategoriesPage = () => <div><h2>Управление категориями</h2><p>Скоро будет...</p></div>;
const GalleryPage = () => <div><h2>Управление галереей</h2><p>Скоро будет...</p></div>;
const CustomersPage = () => <div><h2>Управление клиентами</h2><p>Скоро будет...</p></div>;
const MessagesPage = () => <div><h2>Сообщения</h2><p>Скоро будет...</p></div>;
const SettingsPage = () => <div><h2>Настройки</h2><p>Скоро будет...</p></div>;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={ruRU}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />

              {/* Protected routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
                <Route path={ROUTES.TOURS} element={<ToursPage />} />
                <Route path={ROUTES.TOUR_CREATE} element={<TourFormPage />} />
                <Route path={ROUTES.TOUR_EDIT} element={<TourFormPage />} />
                <Route path={ROUTES.BOOKINGS} element={<BookingsPage />} />
                <Route path={ROUTES.BOOKING_DETAIL} element={<BookingDetailPage />} />
                <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
                <Route path={ROUTES.GALLERY} element={<GalleryPage />} />
                <Route path={ROUTES.CUSTOMERS} element={<CustomersPage />} />
                <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
                <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
              </Route>

              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

              {/* 404 */}
              <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
