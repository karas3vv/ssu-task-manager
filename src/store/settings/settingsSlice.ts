import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  isLoading: boolean;
  errorMessage: string | null;
  isErrorModalOpen: boolean;
}

const initialState: SettingsState = {
  isLoading: false,
  errorMessage: null,
  isErrorModalOpen: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    openErrorModal: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isErrorModalOpen = true;
    },
    closeErrorModal: (state) => {
      state.errorMessage = null;
      state.isErrorModalOpen = false;
    },
  },
});

export const { startLoading, stopLoading, openErrorModal, closeErrorModal } = settingsSlice.actions;
export default settingsSlice.reducer;
