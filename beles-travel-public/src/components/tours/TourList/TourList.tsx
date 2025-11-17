import React from 'react';
import { Tour } from '@/types/tour.types';
import TourCard from '../../home/FeaturedTours/TourCard';

interface TourListProps {
  tours: Tour[];
  isLoading?: boolean;
}

const TourList: React.FC<TourListProps> = ({ tours, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-200" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
              <div className="h-4 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />
              <div className="flex justify-between pt-4 border-t">
                <div className="h-8 bg-gray-200 rounded w-24" />
                <div className="h-10 bg-gray-200 rounded w-28" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">Туры не найдены</h3>
        <p className="mt-1 text-sm text-gray-500">
          Попробуйте изменить параметры фильтрации
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
};

export default TourList;
