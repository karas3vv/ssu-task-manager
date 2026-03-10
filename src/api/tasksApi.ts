import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../types';
import { mockTasks } from './mockDb';

let tasks = [...mockTasks];

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 350));
};

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    await delay();
    return [...tasks];
  },
  getTaskById: async (id: string): Promise<Task> => {
    await delay();
    const task = tasks.find((item) => item.id === id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  },
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    await delay();
    const newTask: Task = {
      id: `task-${Date.now()}`,
      userId: 'user-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload,
    };
    tasks = [newTask, ...tasks];
    return newTask;
  },
  updateTask: async (payload: UpdateTaskPayload): Promise<Task> => {
    await delay();
    const updatedTask: Task = {
      ...payload,
      userId: 'user-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    tasks = tasks.map((task) => (task.id === payload.id ? updatedTask : task));
    return updatedTask;
  },
  patchTaskStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    await delay();
    let updated: Task | null = null;
    tasks = tasks.map((task) => {
      if (task.id === id) {
        updated = { ...task, status, updatedAt: new Date().toISOString() };
        return updated;
      }
      return task;
    });
    if (!updated) {
      throw new Error('Task not found');
    }
    return updated;
  },
  deleteTask: async (id: string): Promise<string> => {
    await delay();
    tasks = tasks.filter((task) => task.id !== id);
    return id;
  },
};
