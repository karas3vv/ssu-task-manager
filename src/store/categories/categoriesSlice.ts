import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoriesApi } from '../../api/categoriesApi';
import type { Category } from '../../types';
import { openErrorModal, startLoading, stopLoading } from '../settings/settingsSlice';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
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
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
