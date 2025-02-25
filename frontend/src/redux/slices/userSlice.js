import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.userData));
    }
  }
});

export const { setUser, clearUser, setError, updateUserProfile } = userSlice.actions;
export default userSlice.reducer; 