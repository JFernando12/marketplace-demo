import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 'dark',
  token: null,
  isAuthenticated: false,
  user: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.token;
      state.isAuthenticated = true;
    },
  },
});

export const { setMode, setUser, setToken } = globalSlice.actions;

export default globalSlice.reducer;
