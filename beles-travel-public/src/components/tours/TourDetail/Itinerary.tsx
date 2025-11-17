import React from 'react';
import { DayItinerary as DayItineraryType } from '@/types/tour.types';

interface ItineraryProps {
  itinerary?: DayItineraryType[];
}

const Itinerary: React.FC<ItineraryProps> = ({ itinerary }) => {
  if (!itinerary || itinerary.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Программа тура</h2>

      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div key={day.day} className="flex gap-4">
            {/* Day Number */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold">
                {day.day}
              </div>
              {index < itinerary.length - 1 && (
                <div className="w-0.5 h-full bg-gray-200 mx-auto mt-2" />
              )}
            </div>

            {/* Day Content */}
            <div className="flex-1 pb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                День {day.day}: {day.title}
              </h3>
              <p className="text-gray-700 mb-3">{day.description}</p>

              {day.activities && day.activities.length > 0 && (
                <ul className="space-y-1">
                  {day.activities.map((activity, actIndex) => (
                    <li key={actIndex} className="flex items-start gap-2 text-gray-600 text-sm">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
