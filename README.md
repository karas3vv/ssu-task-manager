# Task Manager

Учебный fullstack-проект на React + FastAPI.

---

## Описание

Приложение для управления задачами.

Возможности:

* регистрация и авторизация
* создание, редактирование и удаление задач
* изменение статуса задач
* просмотр категорий
* аналитика задач

---

## Технологии

**Frontend:**

* React + TypeScript
* Redux Toolkit + react-redux
* react-router-dom
* axios

**Backend:**

* FastAPI (Python)

**База данных:**

* SQLite

**Аутентификация:**

* JWT

---

## Структура проекта

```
/backend   — backend на FastAPI
/src       — frontend
```

---

## Запуск проекта

### 🔹 Frontend

```bash
npm install
npm run dev
```

Откроется:

```
http://localhost:3000
```

---

### 🔹 Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Backend:

```
http://127.0.0.1:8000
```

Swagger:

```
http://127.0.0.1:8000/docs
```

---

## Подключение frontend к backend

Создать файл `.env` в корне проекта:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

После этого frontend будет работать с реальным API.

---

## Тестовый пользователь

```
email: student@example.com
password: 123456
```

---

## API методы

**Auth:**

* POST /api/auth/register
* POST /api/auth/login

**Tasks:**

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks/{id}
* PATCH /api/tasks/{id}/status
* DELETE /api/tasks/{id}

**Categories:**

* GET /api/categories

---

## Архитектура

* Frontend общается с backend через REST API
* Backend обрабатывает логику и работает с БД
* SQLite хранит данные
* JWT используется для авторизации

---

## Возможные проблемы

**CORS ошибка**
→ Проверь, что backend разрешает localhost:3000

**Backend не запускается**
→ Проверь виртуальное окружение

**Ошибки npm**

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Реализовано

* регистрация и логин
* CRUD для задач
* категории
* аналитика
* JWT авторизация
* Swagger документация

---

## Примечание

Проект выполнен в учебных целях.
