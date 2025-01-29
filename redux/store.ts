import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './services/apiSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				// Ignore paths in RTK Query state if they're storing non-serializable data
				ignoredPaths: [apiSlice.reducerPath],
				// or you can ignore the specific RTK Query action types, e.g.:
				// ignoredActions: [
				//   'api/executeQuery/pending',
				//   'api/executeQuery/fulfilled',
				//   'api/executeQuery/rejected',
				// ],
			  },
		}).concat(apiSlice.middleware),
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = (typeof store)['dispatch'];