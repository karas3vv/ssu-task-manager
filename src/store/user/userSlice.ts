import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { openErrorModal, startLoading, stopLoading } from '../settings/settingsSlice';
import type { LoginPayload, RegisterPayload, User } from '../../types';
import { tokenStorage } from '../../utils/localStorage';
import type { RootState } from '../../app/store';

interface UserState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  profileStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  user: null,
  token: tokenStorage.getToken(),
  isAuth: Boolean(tokenStorage.getToken()),
  profileStatus: 'idle',
};

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await authApi.getProfile();
    } catch (error) {
      tokenStorage.clearToken();
      dispatch(openErrorModal('Не удалось загрузить профиль'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState() as RootState;
      return Boolean(user.token) && user.profileStatus !== 'loading' && !user.user;
    },
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      const response = await authApi.login(payload);
      tokenStorage.setToken(response.token);
      return response;
    } catch (error) {
      dispatch(openErrorModal('Не удалось выполнить вход'));
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
      dispatch(openErrorModal('Не удалось выполнить регистрацию'));
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
      state.profileStatus = 'idle';
      tokenStorage.clearToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileStatus = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
        state.profileStatus = 'succeeded';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuth = true;
        state.profileStatus = 'succeeded';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.profileStatus = 'succeeded';
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isAuth = false;
        state.profileStatus = 'failed';
      });
  },
});

export const { setUserData, logout } = userSlice.actions;
export default userSlice.reducer;
