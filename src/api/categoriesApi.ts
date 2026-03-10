import type { Category } from '../types';
import { mockCategories } from './mockDb';

const delay = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
};

export const categoriesApi = {
  getCategories: async (): Promise<Category[]> => {
    await delay();
    return [...mockCategories];
  },
};
