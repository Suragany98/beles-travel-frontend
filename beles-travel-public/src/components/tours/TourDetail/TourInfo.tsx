import React from 'react';
import { Tour } from '@/types/tour.types';
import { formatPrice, getDifficultyLabel, getDifficultyColor } from '@/services/utils/formatters';

interface TourInfoProps {
  tour: Tour;
}

const TourInfo: React.FC<TourInfoProps> = ({ tour }) => {
  return (
    <div className="space-y-6">
      {/* Title and Category */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
            {tour.category.nameRu}
          </span>
          {tour.featured && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              Популярный
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {tour.titleRu}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{tour.destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{tour.viewCount} просмотров</span>
          </div>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Длительность</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{tour.durationDays} дней</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-sm">Группа</span>
          </div>
          <div className="text-xl font-bold text-gray-900">
            до {tour.maxParticipants || '∞'} чел.
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm">Сложность</span>
          </div>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(tour.difficultyLevel)}`}>
            {getDifficultyLabel(tour.difficultyLevel)}
          </div>
        </div>

        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-primary-700 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Цена</span>
          </div>
          <div className="text-2xl font-bold text-primary-700">
            {formatPrice(tour.price)} ₸
          </div>
          <div className="text-xs text-primary-600">за человека</div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
        <div className="prose max-w-none text-gray-700">
          <p>{tour.descriptionRu}</p>
        </div>
      </div>
    </div>
  );
};

export default TourInfo;
