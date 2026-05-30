# Construction Work Journal

Приложение для учёта выполненных работ на строительных объектах.

### Backend (NestJS)
- **NestJS** — модульная архитектура, DI, встроенная поддержка TypeScript.
- **TypeORM + PostgreSQL** — работа с БД, миграции, QueryBuilder.
- **class-validator** — декларативная валидация DTO.

### Frontend (React)
- **React 19 + TypeScript** — строгая типизация.
- **React Hook Form + Zod** — формы и валидация с общими схемами с бэкендом.
- **TanStack Query** — управление серверным состоянием (кэш, пагинация, инвалидация).
- **Wretch** — лёгкий HTTP-клиент с ретраями и перехватчиками.
- **shadcn/ui + Tailwind** — кастомизируемые компоненты и утилитарный CSS.
- **Vite** — быстрая сборка и HMR.

### Инфраструктура
- **Docker Compose** — оркестрация трёх сервисов (backend, frontend, postgres).
- **Nginx** — раздача статики и проксирование API в production.

## 🚀 Запуск

### Через Docker (рекомендуется)

 - В корне проекта:

```bash
docker-compose up -d
