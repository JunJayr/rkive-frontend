import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;
  isDean: boolean;
  isHeadDept: boolean;
  isFaculty: boolean;
  isStudent: boolean;

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
    isDean: false,
    isHeadDept: false,
    isFaculty: false,
    isStudent: false,
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
    setAuthLogin: (state, action: PayloadAction<{ isSuperuser: boolean; isStaff: boolean; isActive: boolean;
      isDean: boolean; isHeadDept: boolean; isFaculty: boolean; isStudent: boolean;
     }>) => {
      state.isAuthenticated = true;
      state.isSuperuser = action.payload.isSuperuser;
      state.isStaff = action.payload.isStaff;
      state.isActive = action.payload.isActive;
      state.isDean = action.payload.isDean;
      state.isHeadDept = action.payload.isHeadDept;
      state.isFaculty = action.payload.isFaculty;
      state.isStudent = action.payload.isStudent;
    
      localStorage.setItem('authState', JSON.stringify(state)); // Save to localStorage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isSuperuser = false;
      state.isStaff = false;
      state.isActive = false;
      state.isDean = false;
      state.isHeadDept = false;
      state.isFaculty = false;
      state.isStudent = false;
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
