// src/services/utils/formatters.ts

import { TourDifficulty } from '@/types/tour.types';
import { format, parseISO } from 'date-fns';
import { ru, kk, enUS } from 'date-fns/locale';

// Форматирование цены
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU').format(price);
};

// Форматирование даты
export const formatDate = (date: string, language: string = 'ru'): string => {
  const locales = { ru, kk, en: enUS };
  const locale = locales[language as keyof typeof locales] || ru;

  try {
    return format(parseISO(date), 'dd MMMM yyyy', { locale });
  } catch (error) {
    return date;
  }
};

// Форматирование даты в короткий формат
export const formatDateShort = (date: string): string => {
  try {
    return format(parseISO(date), 'dd.MM.yyyy');
  } catch (error) {
    return date;
  }
};

// Получить лейбл сложности
export const getDifficultyLabel = (difficulty: TourDifficulty): string => {
  const labels = {
    [TourDifficulty.EASY]: 'Легкий',
    [TourDifficulty.MEDIUM]: 'Средний',
    [TourDifficulty.HARD]: 'Сложный',
  };
  return labels[difficulty] || difficulty;
};

// Получить цвет сложности
export const getDifficultyColor = (difficulty: TourDifficulty): string => {
  const colors = {
    [TourDifficulty.EASY]: 'bg-green-100 text-green-800',
    [TourDifficulty.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [TourDifficulty.HARD]: 'bg-red-100 text-red-800',
  };
  return colors[difficulty] || 'bg-gray-100 text-gray-800';
};

// Форматирование телефона
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('7')) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  }
  return phone;
};

// Склонение слов
export const pluralize = (count: number, words: [string, string, string]): string => {
  const cases = [2, 0, 1, 1, 1, 2];
  return words[
    count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)]
  ];
};

// Пример: pluralize(5, ['день', 'дня', 'дней']) => 'дней'
