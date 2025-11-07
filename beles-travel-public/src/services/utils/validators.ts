// src/services/utils/validators.ts

// Валидация email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Валидация телефона (казахстанский формат)
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+7\d{10}$/;
  return phoneRegex.test(phone);
};

// Нормализация телефона
export const normalizePhone = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');

  if (cleaned.startsWith('8')) {
    cleaned = '7' + cleaned.slice(1);
  }

  if (cleaned.startsWith('7') && cleaned.length === 11) {
    return '+' + cleaned;
  }

  return phone;
};
