import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import TourGallery from '../components/tours/TourDetail/TourGallery';
import TourInfo from '../components/tours/TourDetail/TourInfo';
import Itinerary from '../components/tours/TourDetail/Itinerary';
import IncludedServices from '../components/tours/TourDetail/IncludedServices';
import TourDates from '../components/tours/TourDetail/TourDates';
import { useTourDetail } from '../hooks/useTours';

const TourDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const tourId = id ? Number(id) : 0;
  const { data: tour, isLoading, error } = useTourDetail(tourId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            {/* Loading Skeleton */}
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded-lg mb-8" />
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-64 bg-gray-200 rounded" />
                <div className="h-64 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Тур не найден</h2>
            <p className="text-gray-600 mb-6">Тур с ID {id} не существует или был удален</p>
            <button
              onClick={() => navigate('/tours')}
              className="btn-primary"
            >
              Вернуться к турам
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/tours')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Вернуться к турам</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <TourGallery images={tour.images} tourTitle={tour.titleRu} />

              {/* Tour Info */}
              <TourInfo tour={tour} />

              {/* Itinerary */}
              <Itinerary itinerary={tour.itinerary} />

              {/* Included Services */}
              <IncludedServices
                included={tour.includedServices}
                excluded={tour.excludedServices}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Available Dates */}
                <TourDates
                  dates={tour.dates}
                  tourId={tour.id}
                  basePrice={tour.price}
                />

                {/* Contact Card */}
                <div className="bg-primary-50 rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Нужна консультация?</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Наши специалисты ответят на все ваши вопросы и помогут выбрать лучший тур
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+77001234567"
                      className="flex items-center gap-2 text-primary-700 hover:text-primary-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>+7 (700) 123-45-67</span>
                    </a>
                    <a
                      href="mailto:info@belestravel.kz"
                      className="flex items-center gap-2 text-primary-700 hover:text-primary-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>info@belestravel.kz</span>
                    </a>
                    <button
                      onClick={() => navigate('/contact')}
                      className="w-full btn-primary mt-4"
                    >
                      Написать нам
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TourDetailPage;
