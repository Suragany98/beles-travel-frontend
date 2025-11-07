import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeaturedTours } from '@/hooks/useTours';
import TourCard from './TourCard';
import { ROUTES } from '@/constants/routes';

const FeaturedTours: React.FC = () => {
  const navigate = useNavigate();
  const { data: tours, isLoading, error } = useFeaturedTours(6);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Популярные туры
            </h2>
            <p className="text-gray-600 text-lg">
              Загрузка...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Ошибка загрузки туров</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Популярные туры
          </h2>
          <p className="text-gray-600 text-lg">
            Самые востребованные направления для путешествий
          </p>
        </div>

        {/* Tours Grid */}
        {tours && tours.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button
                onClick={() => navigate(ROUTES.TOURS)}
                className="btn-primary text-lg px-8 py-3"
              >
                Посмотреть все туры
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">
            <p>Туры скоро появятся</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedTours;
