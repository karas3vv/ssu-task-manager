import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../types';
import { axiosInstance } from './axiosInstance';

export const tasksApi = {
  getTasks: async (): Promise<Task[]> => {
    const { data } = await axiosInstance.get<Task[]>('/tasks');
    return data;
  },
  getTaskById: async (id: string): Promise<Task> => {
    const { data } = await axiosInstance.get<Task>(`/tasks/${id}`);
    return data;
  },
  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    const { data } = await axiosInstance.post<Task>('/tasks', payload);
    return data;
  },
  updateTask: async (payload: UpdateTaskPayload): Promise<Task> => {
    const { id, ...body } = payload;
    const { data } = await axiosInstance.put<Task>(`/tasks/${id}`, body);
    return data;
  },
  patchTaskStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    const { data } = await axiosInstance.patch<Task>(`/tasks/${id}/status`, { status });
    return data;
  },
  deleteTask: async (id: string): Promise<string> => {
    await axiosInstance.delete(`/tasks/${id}`);
    return id;
  },
};
