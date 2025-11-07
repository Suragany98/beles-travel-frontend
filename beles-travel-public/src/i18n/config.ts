// src/i18n/config.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  ru: {
    translation: {
      // Common
      loading: 'Загрузка...',
      error: 'Ошибка',
      save: 'Сохранить',
      cancel: 'Отмена',
      close: 'Закрыть',
      search: 'Поиск',
      filters: 'Фильтры',

      // Navigation
      home: 'Главная',
      tours: 'Туры',
      gallery: 'Галерея',
      about: 'О нас',
      contact: 'Контакты',

      // Tours
      allTours: 'Все туры',
      featuredTours: 'Популярные туры',
      tourDetails: 'Детали тура',
      bookTour: 'Забронировать тур',
      duration: 'Продолжительность',
      participants: 'Участники',
      difficulty: 'Сложность',
      pricePerPerson: 'Цена за человека',

      // Booking
      booking: 'Бронирование',
      fullName: 'Полное имя',
      email: 'Email',
      phone: 'Телефон',
      selectDate: 'Выберите дату',
      numberOfParticipants: 'Количество участников',
      specialRequests: 'Особые пожелания',
      totalPrice: 'Итого',
      bookNow: 'Забронировать сейчас',

      // Footer
      followUs: 'Следите за нами',
      quickLinks: 'Быстрые ссылки',
      contactUs: 'Свяжитесь с нами',

      // Messages
      bookingSuccess: 'Бронирование успешно создано!',
      bookingError: 'Ошибка при создании бронирования',
      messageSent: 'Сообщение отправлено!',
    }
  },
  kk: {
    translation: {
      loading: 'Жүктелуде...',
      error: 'Қате',
      save: 'Сақтау',
      cancel: 'Болдырмау',
      close: 'Жабу',
      search: 'Іздеу',
      filters: 'Сүзгілер',

      home: 'Басты бет',
      tours: 'Турлар',
      gallery: 'Галерея',
      about: 'Біз туралы',
      contact: 'Байланыс',
    }
  },
  en: {
    translation: {
      loading: 'Loading...',
      error: 'Error',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      search: 'Search',
      filters: 'Filters',

      home: 'Home',
      tours: 'Tours',
      gallery: 'Gallery',
      about: 'About',
      contact: 'Contact',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: import.meta.env.VITE_DEFAULT_LANGUAGE || 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
