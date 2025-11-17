import React from 'react';
import { useCategories } from '@/hooks/useCategories';
import { TourFilters as TourFiltersType, TourDifficulty } from '@/types/tour.types';

interface TourFiltersProps {
  filters: TourFiltersType;
  onFiltersChange: (filters: TourFiltersType) => void;
  onReset: () => void;
}

const TourFilters: React.FC<TourFiltersProps> = ({ filters, onFiltersChange, onReset }) => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const handleChange = (key: keyof TourFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Фильтры</h3>
        <button
          onClick={onReset}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Сбросить
        </button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Поиск
          </label>
          <input
            type="text"
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Название тура или место..."
            className="input text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Категория
          </label>
          <select
            value={filters.categoryId || ''}
            onChange={(e) => handleChange('categoryId', e.target.value ? Number(e.target.value) : undefined)}
            className="input text-sm"
            disabled={categoriesLoading}
          >
            <option value="">Все категории</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameRu}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена (₸)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="От"
              className="input text-sm"
              min="0"
            />
            <input
              type="number"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="До"
              className="input text-sm"
              min="0"
            />
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Сложность
          </label>
          <select
            value={filters.difficulty || ''}
            onChange={(e) => handleChange('difficulty', e.target.value || undefined)}
            className="input text-sm"
          >
            <option value="">Любая</option>
            <option value={TourDifficulty.EASY}>Легкая</option>
            <option value={TourDifficulty.MEDIUM}>Средняя</option>
            <option value={TourDifficulty.HARD}>Сложная</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Направление
          </label>
          <input
            type="text"
            value={filters.destination || ''}
            onChange={(e) => handleChange('destination', e.target.value)}
            placeholder="Город или регион..."
            className="input text-sm"
          />
        </div>

        {/* Featured only */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={filters.featured || false}
            onChange={(e) => handleChange('featured', e.target.checked || undefined)}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
            Только популярные
          </label>
        </div>
      </div>
    </div>
  );
};

export default TourFilters;
