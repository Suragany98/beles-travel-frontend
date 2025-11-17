import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';
import TourFilters from '../components/tours/TourList/TourFilters';
import TourSort, { SortOption } from '../components/tours/TourList/TourSort';
import TourList from '../components/tours/TourList/TourList';
import Pagination from '../components/tours/TourList/Pagination';
import { useTours } from '../hooks/useTours';
import { TourFilters as TourFiltersType } from '../types/tour.types';
import { PAGINATION } from '../constants/config';

const ToursPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL
  const [filters, setFilters] = useState<TourFiltersType>({
    search: searchParams.get('search') || undefined,
    categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    difficulty: (searchParams.get('difficulty') as any) || undefined,
    destination: searchParams.get('destination') || undefined,
    featured: searchParams.get('featured') === 'true' ? true : undefined,
  });

  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 0
  );

  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'popular'
  );

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Fetch tours with current filters
  const { data: toursData, isLoading, error } = useTours(
    filters,
    currentPage,
    PAGINATION.DEFAULT_PAGE_SIZE
  );

  // Update URL when filters change
  useEffect(() => {
    const params: Record<string, string> = {};

    if (filters.search) params.search = filters.search;
    if (filters.categoryId) params.categoryId = filters.categoryId.toString();
    if (filters.minPrice) params.minPrice = filters.minPrice.toString();
    if (filters.maxPrice) params.maxPrice = filters.maxPrice.toString();
    if (filters.difficulty) params.difficulty = filters.difficulty;
    if (filters.destination) params.destination = filters.destination;
    if (filters.featured) params.featured = 'true';
    if (currentPage > 0) params.page = currentPage.toString();
    if (sortBy !== 'popular') params.sort = sortBy;

    setSearchParams(params);
  }, [filters, currentPage, sortBy, setSearchParams]);

  const handleFiltersChange = (newFilters: TourFiltersType) => {
    setFilters(newFilters);
    setCurrentPage(0); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(0);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    setCurrentPage(0);
  };

  // Sort tours client-side (or you can implement server-side sorting)
  const sortedTours = React.useMemo(() => {
    if (!toursData?.content) return [];

    const tours = [...toursData.content];

    switch (sortBy) {
      case 'price-asc':
        return tours.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return tours.sort((a, b) => b.price - a.price);
      case 'duration-asc':
        return tours.sort((a, b) => a.durationDays - b.durationDays);
      case 'duration-desc':
        return tours.sort((a, b) => b.durationDays - a.durationDays);
      case 'popular':
      default:
        return tours.sort((a, b) => b.viewCount - a.viewCount);
    }
  }, [toursData?.content, sortBy]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Все туры
            </h1>
            <p className="text-gray-600">
              {toursData?.totalElements
                ? `Найдено туров: ${toursData.totalElements}`
                : 'Выберите подходящий тур для вашего путешествия'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <TourFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </aside>

            {/* Mobile Filters Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Фильтры
              </button>

              {/* Mobile Filters Modal */}
              {showMobileFilters && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileFilters(false)}>
                  <div
                    className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Фильтры</h3>
                        <button onClick={() => setShowMobileFilters(false)}>
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <TourFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        onReset={handleResetFilters}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Tours List */}
            <div className="flex-1">
              {/* Sort */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center justify-between">
                <TourSort sortBy={sortBy} onSortChange={handleSortChange} />

                {toursData && (
                  <div className="text-sm text-gray-600">
                    Страница {currentPage + 1} из {toursData.totalPages}
                  </div>
                )}
              </div>

              {/* Error State */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700">
                    Ошибка при загрузке туров. Попробуйте обновить страницу.
                  </p>
                </div>
              )}

              {/* Tours Grid */}
              <TourList tours={sortedTours} isLoading={isLoading} />

              {/* Pagination */}
              {toursData && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={toursData.totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ToursPage;
