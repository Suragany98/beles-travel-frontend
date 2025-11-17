import React from 'react';

export type SortOption = 'price-asc' | 'price-desc' | 'duration-asc' | 'duration-desc' | 'popular';

interface TourSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const TourSort: React.FC<TourSortProps> = ({ sortBy, onSortChange }) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-gray-700">
        Сортировка:
      </label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="input text-sm w-auto"
      >
        <option value="popular">Популярные</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="duration-asc">Длительность: короткие</option>
        <option value="duration-desc">Длительность: длинные</option>
      </select>
    </div>
  );
};

export default TourSort;
