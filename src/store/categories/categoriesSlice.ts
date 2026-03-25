import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoriesApi } from '../../api/categoriesApi';
import type { Category } from '../../types';
import { openErrorModal, startLoading, stopLoading } from '../settings/settingsSlice';
import type { RootState } from '../../app/store';

interface CategoriesState {
  categories: Category[];
  categoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CategoriesState = {
  categories: [],
  categoriesStatus: 'idle',
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await categoriesApi.getCategories();
    } catch (error) {
      dispatch(openErrorModal('Could not load categories'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
  {
    condition: (_, { getState }) => {
      const { categories } = getState() as RootState;
      return categories.categoriesStatus !== 'loading' && categories.categories.length === 0;
    },
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesStatus = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesStatus = 'failed';
      });
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
