import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;
}

const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const storedAuth = localStorage.getItem('authState');
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  }
  return {
    isAuthenticated: false,
    isLoading: true,
    isSuperuser: false,
    isStaff: false,
    isActive: false,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
      localStorage.setItem('authState', JSON.stringify(state)); // Save to localStorage
    },
    setAuthLogin: (state, action: PayloadAction<{ isSuperuser: boolean; isStaff: boolean; isActive: boolean }>) => {
      state.isAuthenticated = true;
      state.isSuperuser = action.payload.isSuperuser;
      state.isStaff = action.payload.isStaff;
      state.isActive = action.payload.isActive;
      localStorage.setItem('authState', JSON.stringify(state)); // Save to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isSuperuser = false;
      state.isStaff = false;
      state.isActive = false;
      localStorage.removeItem('authState'); // Clear auth state on logout
    },
    finishInitialLoad: (state) => {
      state.isLoading = false;
      localStorage.setItem('authState', JSON.stringify(state)); // Save to localStorage
    },
  },
});

export const { setAuth, setAuthLogin, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
