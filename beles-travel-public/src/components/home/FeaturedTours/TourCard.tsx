import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tour } from '@/types/tour.types';
import { formatPrice, getDifficultyLabel, getDifficultyColor } from '@/services/utils/formatters';
import { buildTourDetailRoute } from '@/constants/routes';

interface TourCardProps {
  tour: Tour;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const navigate = useNavigate();

  const mainImage = tour.images.find(img => img.isMain) || tour.images[0];
  const imageUrl = mainImage?.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image';

  const handleClick = () => {
    navigate(buildTourDetailRoute(tour.id));
  };

  return (
    <div
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={tour.titleRu}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />
        {tour.featured && (
          <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Популярный
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white text-sm">{tour.category.nameRu}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {tour.titleRu}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tour.descriptionRu}
        </p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{tour.destination}</span>
        </div>

        {/* Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{tour.durationDays} дней</span>
          </div>
          {tour.maxParticipants && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>до {tour.maxParticipants} чел.</span>
            </div>
          )}
          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(tour.difficultyLevel)}`}>
            {getDifficultyLabel(tour.difficultyLevel)}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(tour.price)} ₸
            </span>
            <span className="text-gray-500 text-sm ml-1">/ чел.</span>
          </div>
          <button
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
