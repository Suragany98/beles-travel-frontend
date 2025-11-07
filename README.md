# Beles Travel - Frontend Applications

Это монорепозиторий с двумя фронтенд приложениями для туристической платформы Beles Travel.

## 📦 Структура проекта

```
beles-travel-frontend/
├── beles-travel-public/    # Публичный сайт для клиентов
└── beles-travel-admin/      # Административная панель
```

## 🚀 Beles Travel Public (Публичный сайт)

### Технологии
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- React Query (TanStack Query)
- React Hook Form + Zod
- Axios
- i18next (мультиязычность: RU, KK, EN)

### Установка и запуск

```bash
cd beles-travel-public
npm install
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Основные возможности

- ✅ Главная страница с Hero и популярными турами
- ✅ Header и Footer с навигацией
- ✅ Мультиязычность (RU/KK/EN)
- ✅ Типизированный API с React Query
- ✅ Responsive дизайн
- 🔄 Страница списка туров (в разработке)
- 🔄 Детальная страница тура (в разработке)
- 🔄 Форма бронирования (в разработке)
- 🔄 Галерея (в разработке)
- 🔄 Страница контактов (в разработке)

### Сборка для production

```bash
npm run build
npm run preview
```

## 🔐 Beles Travel Admin (Административная панель)

### Технологии
- React 18 + TypeScript
- Vite
- Ant Design
- React Router v6
- React Query
- JWT Authentication
- Recharts (графики)

### Установка и запуск

```bash
cd beles-travel-admin
npm install
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3001

### Основные возможности

- 🔄 Аутентификация (JWT)
- 🔄 Dashboard с статистикой
- 🔄 Управление турами (CRUD)
- 🔄 Управление бронированиями
- 🔄 Управление категориями
- 🔄 Управление галереей
- 🔄 Управление клиентами
- 🔄 Просмотр сообщений

## 📋 API Configuration

Оба приложения настроены на работу с бэкенд API:
- API URL: `http://localhost:8080/api`

### Конфигурация

Создайте `.env` файлы в каждом проекте:

**beles-travel-public/.env**
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Beles Travel
VITE_DEFAULT_LANGUAGE=ru
```

**beles-travel-admin/.env**
```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Beles Travel Admin
```

## 🏗️ Архитектура

### Public Website

```
src/
├── components/        # React компоненты
│   ├── common/       # Общие компоненты (Header, Footer, Button)
│   ├── home/         # Компоненты главной страницы
│   ├── tours/        # Компоненты туров
│   └── booking/      # Компоненты бронирования
├── pages/            # Страницы приложения
├── services/         # API сервисы
│   ├── api/         # Axios конфигурация и API функции
│   └── utils/       # Утилиты (formatters, validators)
├── hooks/            # Custom React хуки
├── context/          # React Context
├── types/            # TypeScript типы
├── constants/        # Константы
└── styles/           # Глобальные стили
```

### Admin Panel

```
src/
├── components/
│   ├── layout/      # Layout компоненты
│   ├── tours/       # Управление турами
│   ├── bookings/    # Управление бронированиями
│   └── common/      # Общие компоненты
├── pages/           # Страницы
│   ├── auth/       # Аутентификация
│   ├── tours/      # CRUD туров
│   └── bookings/   # Управление бронированиями
├── services/
│   ├── api/        # API сервисы
│   └── auth/       # Auth сервисы (token management)
├── hooks/           # Custom хуки
├── context/         # AuthContext
└── types/           # TypeScript типы
```

## 📝 Статус разработки

### Public Website
- [x] Структура проекта
- [x] Конфигурация (Vite, TypeScript, Tailwind)
- [x] TypeScript типы
- [x] API сервисы
- [x] React хуки
- [x] i18n конфигурация
- [x] Header и Footer
- [x] Главная страница (Hero + Featured Tours)
- [ ] Страница туров с фильтрами
- [ ] Детальная страница тура
- [ ] Форма бронирования
- [ ] Галерея
- [ ] Страница контактов

### Admin Panel
- [x] Структура проекта
- [x] Конфигурация
- [ ] Аутентификация (Login)
- [ ] Layout (Sidebar, TopBar)
- [ ] Dashboard
- [ ] Управление турами
- [ ] Управление бронированиями
- [ ] Управление категориями

## 🛠️ Команды для разработки

### Public Website
```bash
cd beles-travel-public
npm run dev      # Запуск dev сервера
npm run build    # Сборка для production
npm run preview  # Preview production сборки
npm run lint     # Проверка кода
```

### Admin Panel
```bash
cd beles-travel-admin
npm run dev      # Запуск dev сервера (порт 3001)
npm run build    # Сборка для production
npm run preview  # Preview production сборки
npm run lint     # Проверка кода
```

## 🤝 Дальнейшая разработка

### Приоритеты для Public Website:
1. Страница списка туров с фильтрацией и пагинацией
2. Детальная страница тура с галереей и маршрутом
3. Форма бронирования с валидацией
4. Страница галереи с Lightbox
5. Страница контактов с формой

### Приоритеты для Admin Panel:
1. Login страница и JWT аутентификация
2. Admin Layout с Sidebar
3. Dashboard с статистикой и графиками
4. CRUD для туров (список, создание, редактирование)
5. Управление бронированиями
6. Управление категориями и галереей

## 📚 Документация API

Backend API должен реализовывать следующие endpoints:

### Public API
- `GET /api/public/tours` - Список туров
- `GET /api/public/tours/{id}` - Детали тура
- `GET /api/public/tours/featured` - Популярные туры
- `GET /api/public/tours/{id}/dates` - Доступные даты
- `POST /api/public/bookings` - Создание бронирования
- `GET /api/public/categories` - Категории туров

### Admin API
- `POST /api/admin/auth/login` - Вход
- `POST /api/admin/auth/refresh` - Обновление токена
- `GET /api/admin/tours` - Список туров (admin)
- `POST /api/admin/tours` - Создание тура
- `PUT /api/admin/tours/{id}` - Обновление тура
- `DELETE /api/admin/tours/{id}` - Удаление тура
- `GET /api/admin/bookings` - Список бронирований
- `PUT /api/admin/bookings/{id}/status` - Изменение статуса

## 📄 Лицензия

Проект создан для Beles Travel.

---

**Версия:** 0.1.0
**Дата:** 2025-01-07
