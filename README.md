## ICORP-TASK v2 – NestJS ilovasi (UZ)

Ushbu loyiha NestJS 11 asosida yozilgan kichik HTTP xizmat bo‘lib, tashqi servis bilan o‘zaro aloqada bo‘lib, ikki qismdan iborat kodni yig‘adi va yakuniy natijani qaytaradi.

### Ishlayotgan server (Prod URL)
- Bazaviy URL: `http://89.117.60.117:5005/`
- Tezkor sinov:
```bash
curl -X GET "http://89.117.60.117:5005/start"

curl -X GET "http://89.117.60.117:5005/finish"
```

### Talablar
- Node.js 18 yoki undan yuqori
- npm 9+

### O‘rnatish
```bash
npm install
```

### Muhit sozlamalari (.env)
Loyihaning ildizida `.env` fayli yarating va quyidagi o‘zgaruvchilarni to‘ldiring:
```bash
API_URL=http://localhost            # Sizning serverning bazaviy URL manzili (protokol + host)
PORT=6000                           # Ilova tinglaydigan port
TASK_URL=https://example.com/task   # Tashqi servis endpointi
```
Izoh:
- `API_URL` yakunda `API_URL:PORT` ko‘rinishida yig‘ilib, callback URL sifatida yuboriladi.
- `PORT` bo‘sh qolsa, standart 6000 ishlatiladi.

### Ishga tushirish
- Rivojlantirish rejimi (hot-reload):
```bash
npm run start:dev
```
- Oddiy ishga tushirish:
```bash
npm run start
```
- Produsksiya build va ishga tushirish:
```bash
npm run build
npm run start:prod
```

### Skriptlar
- `npm run build` – TypeScript kodini `dist/` ga yig‘adi
- `npm run start` – ilovani ishga tushiradi
- `npm run start:dev` – watch rejimida ishga tushiradi
- `npm run lint` – ESLint bilan tekshiradi
- `npm run test` – unit testlar
- `npm run test:e2e` – e2e testlar

### API marshrutlari
Ilova asosiy controller (`src/app.controller.ts`) orqali 3 ta endpoint taqdim etadi.

- GET `/start`
  - Tashqi `TASK_URL` ga POST yuboradi.
  - `msg` va callback URL (`API_URL:PORT/get_code_2`) jo‘natadi.
  - Javobdan `part1` ni saqlaydi.
  - Javob: "Code 1 received ✅"

- POST `/get_code_2`
  - Callback sifatida chaqiriladi.
  - Body ichidan `part2` ni qabul qilib saqlaydi.
  - Javob: `{ success: true }`

- GET `/finish`
  - Oldin olingan `part1` va `part2` ni birlashtirib, `code` sifatida `TASK_URL` ga GET yuboradi.
  - Asl javob va yig‘ilgan kodlarni JSON ko‘rinishda qaytaradi:
    - `originData`, `code_1`, `code_2`, `fullCode`

### Ish jarayoni (sequence)
1) Mijoz GET `/start` ni chaqiradi.
2) Tashqi servis callback sifatida sizning `/get_code_2` endpointingizga POST yuboradi.
3) Mijoz GET `/finish` ni chaqirib yakuniy natijani oladi.

### Loyihaning tuzilishi
```text
src/
  ├─ app.controller.ts   # Endpointlar: /start, /get_code_2, /finish
  ├─ app.module.ts       # Nest modul konfiguratsiyasi
  ├─ config.ts           # .env o‘qish va sozlamalar
  └─ main.ts             # Bootstrap
```

### Texnologiyalar
- NestJS 11 (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- Axios (HTTP mijoz)
- dotenv (muhit o‘zgaruvchilarini yuklash)
- Jest + Supertest (testlar)
- ESLint + Prettier (kod sifati)

## ICORP-TASK v2 – NestJS приложение (RU)

Данный проект — небольшой HTTP-сервис на NestJS 11. Он взаимодействует с внешним сервисом, получает две части кода, объединяет их и возвращает итог.

### Рабочий сервер (Prod URL)
- Базовый URL: `http://89.117.60.117:5005/`
- Быстрые проверки:
```bash
curl -X GET "http://89.117.60.117:5005/start"

curl -X GET "http://89.117.60.117:5005/finish"
```

### Требования
- Node.js 18 или выше
- npm 9+

### Установка
```bash
npm install
```

### Переменные окружения (.env)
Создайте файл `.env` в корне проекта и заполните переменные:
```bash
API_URL=http://localhost            # Базовый URL вашего сервера (протокол + хост)
PORT=6000                           # Порт, на котором слушает приложение
TASK_URL=https://example.com/task   # Endpoint внешнего сервиса
```
Примечания:
- `API_URL` в итоге используется вместе с `PORT` как callback URL: `API_URL:PORT/get_code_2`.
- Если `PORT` не указан, по умолчанию используется 6000.

### Запуск
- Режим разработки (hot-reload):
```bash
npm run start:dev
```
- Обычный запуск:
```bash
npm run start
```
- Продакшн сборка и запуск:
```bash
npm run build
npm run start:prod
```

### Скрипты
- `npm run build` – собирает TypeScript в `dist/`
- `npm run start` – запускает приложение
- `npm run start:dev` – запускает в режиме наблюдения
- `npm run lint` – проверка ESLint
- `npm run test` – unit-тесты
- `npm run test:e2e` – e2e-тесты

### Маршруты API
Основной контроллер (`src/app.controller.ts`) предоставляет 3 endpoint’а.

- GET `/start`
  - Отправляет POST на `TASK_URL`.
  - Передаёт `msg` и callback URL (`API_URL:PORT/get_code_2`).
  - Сохраняет `part1` из ответа.
  - Ответ: "Code 1 received ✅"

- POST `/get_code_2`
  - Вызывается как callback.
  - Принимает `part2` из тела запроса и сохраняет его.
  - Ответ: `{ success: true }`

- GET `/finish`
  - Объединяет `part1` и `part2`, отправляет `code` как query на `TASK_URL` (GET).
  - Возвращает JSON с исходными данными и собранным кодом:
    - `originData`, `code_1`, `code_2`, `fullCode`

### Последовательность работы
1) Клиент вызывает GET `/start`.
2) Внешний сервис делает POST на ваш `/get_code_2` (callback).
3) Клиент вызывает GET `/finish` и получает итоговый результат.

### Структура проекта
```text
src/
  ├─ app.controller.ts   # Endpoints: /start, /get_code_2, /finish
  ├─ app.module.ts       # Конфигурация Nest-модуля
  ├─ config.ts           # Загрузка .env и конфиг
  └─ main.ts             # Bootstrap
```

### Технологии
- NestJS 11 (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- Axios (HTTP-клиент)
- dotenv (загрузка переменных окружения)
- Jest + Supertest (тесты)
- ESLint + Prettier (качество кода)

## ICORP-TASK v2 – NestJS application (EN)

This project is a small HTTP service built with NestJS 11. It interacts with an external service, receives two code parts, merges them, and returns the final result.

### Production URL
- Base URL: `http://89.117.60.117:5005/`
- Quick test:
```bash
curl -X GET "http://89.117.60.117:5005/start"

curl -X GET "http://89.117.60.117:5005/finish"
```

### Requirements
- Node.js 18 or higher
- npm 9+

### Installation
```bash
npm install
```

### Environment variables (.env)
Create a `.env` file in the project root and set the following variables:
```bash
API_URL=http://localhost            # Your server base URL (protocol + host)
PORT=6000                           # Port the app listens on
TASK_URL=https://example.com/task   # External service endpoint
```
Notes:
- `API_URL` is combined with `PORT` to form the callback URL: `API_URL:PORT/get_code_2`.
- If `PORT` is omitted, 6000 is used by default.

### Run
- Development (hot-reload):
```bash
npm run start:dev
```
- Standard run:
```bash
npm run start
```
- Production build and run:
```bash
npm run build
npm run start:prod
```

### Scripts
- `npm run build` – compile TypeScript into `dist/`
- `npm run start` – start the app
- `npm run start:dev` – start in watch mode
- `npm run lint` – ESLint check
- `npm run test` – unit tests
- `npm run test:e2e` – e2e tests

### API routes
The main controller (`src/app.controller.ts`) exposes 3 endpoints.

- GET `/start`
  - Sends POST to `TASK_URL`.
  - Passes `msg` and callback URL (`API_URL:PORT/get_code_2`).
  - Stores `part1` from the response.
  - Response: "Code 1 received ✅"

- POST `/get_code_2`
  - Invoked as a callback.
  - Accepts `part2` from the request body and stores it.
  - Response: `{ success: true }`

- GET `/finish`
  - Merges `part1` and `part2`, sends the combined `code` to `TASK_URL` (GET).
  - Returns JSON with original data and the merged code:
    - `originData`, `code_1`, `code_2`, `fullCode`

### Flow
1) Client calls GET `/start`.
2) External service POSTs to your `/get_code_2` (callback).
3) Client calls GET `/finish` to obtain the final result.

### Project structure
```text
src/
  ├─ app.controller.ts   # Endpoints: /start, /get_code_2, /finish
  ├─ app.module.ts       # Nest module configuration
  ├─ config.ts           # .env loading and config
  └─ main.ts             # Bootstrap
```

### Technologies
- NestJS 11 (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- Axios (HTTP client)
- dotenv (environment variables loader)
- Jest + Supertest (tests)
- ESLint + Prettier (code quality)