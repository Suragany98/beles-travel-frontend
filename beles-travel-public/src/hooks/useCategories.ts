// src/hooks/useCategories.ts

import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/services/api/categoryApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAllCategories(),
    staleTime: 15 * 60 * 1000, // 15 минут
  });
};

export const useCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: () => categoryApi.getCategoryBySlug(slug),
    enabled: !!slug,
  });
};
