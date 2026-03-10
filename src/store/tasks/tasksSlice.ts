import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { tasksApi } from '../../api/tasksApi';
import type { CreateTaskPayload, Task, TaskStatus, UpdateTaskPayload } from '../../types';
import { openErrorModal, startLoading, stopLoading } from '../settings/settingsSlice';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  search: string;
  statusFilter: TaskStatus | 'all';
}

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  search: '',
  statusFilter: 'all',
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await tasksApi.getTasks();
    } catch (error) {
      dispatch(openErrorModal('Не удалось загрузить задачи'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await tasksApi.getTaskById(id);
    } catch (error) {
      dispatch(openErrorModal('Не удалось загрузить данные задачи'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const createTaskAsync = createAsyncThunk(
  'tasks/createTaskAsync',
  async (payload: CreateTaskPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await tasksApi.createTask(payload);
    } catch (error) {
      dispatch(openErrorModal('Не удалось создать задачу'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const updateTaskAsync = createAsyncThunk(
  'tasks/updateTaskAsync',
  async (payload: UpdateTaskPayload, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await tasksApi.updateTask(payload);
    } catch (error) {
      dispatch(openErrorModal('Не удалось обновить задачу'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const patchTaskStatusAsync = createAsyncThunk(
  'tasks/patchTaskStatusAsync',
  async ({ id, status }: { id: string; status: TaskStatus }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await tasksApi.patchTaskStatus(id, status);
    } catch (error) {
      dispatch(openErrorModal('Не удалось изменить статус задачи'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTaskAsync',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading());
      return await tasksApi.deleteTask(id);
    } catch (error) {
      dispatch(openErrorModal('Не удалось удалить задачу'));
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<TaskStatus | 'all'>) => {
      state.statusFilter = action.payload;
    },
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
        state.currentTask = action.payload;
      })
      .addCase(patchTaskStatusAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task));
        state.currentTask = action.payload;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setSearch, setStatusFilter, clearCurrentTask } = tasksSlice.actions;
export default tasksSlice.reducer;
