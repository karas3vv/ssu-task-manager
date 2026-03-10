import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { openErrorModal, startLoading, stopLoading } from '../settings/settingsSlice';
import type { LoginPayload, RegisterPayload, User } from '../../types';
import { tokenStorage } from '../../utils/localStorage';

interface UserState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
}

const initialState: UserState = {
  user: null,
  token: tokenStorage.getToken(),
  isAuth: Boolean(tokenStorage.getToken()),
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await authApi.login(payload);
      tokenStorage.setToken(response.token);
      return response;
    } catch (error) {
      dispatch(openErrorModal('Login failed'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (payload: RegisterPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await authApi.register(payload);
      tokenStorage.setToken(response.token);
      return response;
    } catch (error) {
      dispatch(openErrorModal('Registration failed'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      tokenStorage.clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
      });
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
