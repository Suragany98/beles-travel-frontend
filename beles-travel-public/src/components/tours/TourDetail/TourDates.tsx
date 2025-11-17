import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TourDate } from '@/types/tour.types';
import { formatDate, formatPrice } from '@/services/utils/formatters';

interface TourDatesProps {
  dates: TourDate[];
  tourId: number;
  basePrice: number;
}

const TourDates: React.FC<TourDatesProps> = ({ dates, tourId, basePrice }) => {
  const navigate = useNavigate();

  if (!dates || dates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Доступные даты</h2>
        <p className="text-gray-600">Даты тура скоро появятся. Свяжитесь с нами для уточнения.</p>
      </div>
    );
  }

  const availableDates = dates.filter(date => date.isAvailable);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Доступные даты</h2>

      <div className="space-y-4">
        {availableDates.length === 0 ? (
          <p className="text-gray-600">На данный момент нет доступных дат. Свяжитесь с нами для уточнения.</p>
        ) : (
          availableDates.map((date) => {
            const slotsLeft = date.availableSlots - date.bookedSlots;
            const price = date.priceOverride || basePrice;

            return (
              <div
                key={date.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-600 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Dates */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-900 font-medium">
                        {formatDate(date.startDate)} - {formatDate(date.endDate)}
                      </span>
                    </div>

                    {/* Slots Available */}
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`${slotsLeft <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                        {slotsLeft <= 5 && slotsLeft > 0 && 'Осталось '}
                        {slotsLeft} {slotsLeft === 1 ? 'место' : slotsLeft < 5 ? 'места' : 'мест'}
                      </span>
                      {date.priceOverride && (
                        <span className="text-primary-600 font-medium">Специальная цена!</span>
                      )}
                    </div>
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary-600">
                        {formatPrice(price)} ₸
                      </div>
                      <div className="text-xs text-gray-500">за человека</div>
                    </div>

                    <button
                      onClick={() => navigate(`/booking/${tourId}?dateId=${date.id}`)}
                      disabled={slotsLeft === 0}
                      className="btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {slotsLeft === 0 ? 'Нет мест' : 'Забронировать'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TourDates;
