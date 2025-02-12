import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuperuser: boolean;
  isStaff: boolean;
  isActive: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  isSuperuser: false,
  isStaff: false,
  isActive: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
		setAuth: (state, action: PayloadAction<{ isSuperuser: boolean; isStaff: boolean; isActive: boolean }>) => {
		state.isAuthenticated = true;
		state.isSuperuser = action.payload.isSuperuser;
		state.isStaff = action.payload.isStaff;
		state.isActive = action.payload.isActive;
		},
		logout: (state) => {
		state.isAuthenticated = false;
		state.isSuperuser = false;
		state.isStaff = false;
		state.isActive = false;
		},
		finishInitialLoad: (state) => {
		state.isLoading = false;
		},
  	},
});

export const { setAuth, logout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;
