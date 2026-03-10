import type { Category, Task, User } from '../types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Vadim Karasev',
  email: 'student@example.com',
};

export const mockCategories: Category[] = [
  { id: 'cat-1', title: 'Учеба', color: '#3b82f6' },
  { id: 'cat-2', title: 'Работа', color: '#8b5cf6' },
  { id: 'cat-3', title: 'Личное', color: '#10b981' },
];

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Подготовить архитектуру React',
    description: 'Собрать структуру папок, роутер и Redux Store.',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2026-03-20',
    categoryId: 'cat-1',
    userId: 'user-1',
    createdAt: '2026-03-10T10:00:00.000Z',
    updatedAt: '2026-03-10T10:00:00.000Z',
  },
  {
    id: 'task-2',
    title: 'Реализовать CRUD для задач',
    description: 'Добавить создание, редактирование, смену статуса и удаление.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2026-03-24',
    categoryId: 'cat-2',
    userId: 'user-1',
    createdAt: '2026-03-10T10:10:00.000Z',
    updatedAt: '2026-03-10T10:10:00.000Z',
  },
  {
    id: 'task-3',
    title: 'Подготовить раздел аналитики',
    description: 'Подсчитать задачи по статусам и приоритетам.',
    status: 'done',
    priority: 'low',
    dueDate: null,
    categoryId: 'cat-3',
    userId: 'user-1',
    createdAt: '2026-03-10T10:20:00.000Z',
    updatedAt: '2026-03-10T10:20:00.000Z',
  },
];
