import type { Category } from '../types';
import { axiosInstance } from './axiosInstance';

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get<Category[]>('/categories');
    return data;
  },
};
