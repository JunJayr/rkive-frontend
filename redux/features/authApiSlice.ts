import { apiSlice } from '../services/apiSlice';

interface User {
  first_name: string;
  last_name: string;
  email: string;
}

interface ApplicationFormData {
  department: string;
  lead_researcher: string;
  lead_contactno: string;
  co_researcher: string;
  co_researcher1: string;
  co_researcher2: string;
  co_researcher3: string;
  co_researcher4: string;
  research_title: string;
  datetime_defense: string;
  place_defense: string;
  panel_chair: string;
  adviser: string;
  panel1: string;
  panel2: string;
  panel3: string;
  documenter: string;
}

interface PanelFormData {
  research_title: string;
  co_researcher: string;
  co_researcher1: string;
  co_researcher2: string;
  co_researcher3: string;
  co_researcher4: string;
  lead_researcher: string;
  adviser: string;
  panel_chair: string;
  panel1: string;
  panel2: string;
  panel3: string;
}

const authApiSlice = apiSlice.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
		query: () => '/users/me/',
		}),
		login: builder.mutation({
		query: ({ email, password }) => ({
			url: '/jwt/create/',
			method: 'POST',
			body: { email, password },
		}),
		}),
		register: builder.mutation({
		query: ({ first_name, last_name, email, password, re_password }) => ({
			url: '/users/',
			method: 'POST',
			body: { first_name, last_name, email, password, re_password },
		}),
		}),
		verify: builder.mutation({
		query: () => ({
			url: '/jwt/verify/',
			method: 'POST',
		}),
		}),
		logout: builder.mutation({
		query: () => ({
			url: '/logout/',
			method: 'POST',
		}),
		}),
		activation: builder.mutation({
		query: ({ uid, token }) => ({
			url: '/users/activation/',
			method: 'POST',
			body: { uid, token },
		}),
		}),
		resetPassword: builder.mutation({
		query: (email) => ({
			url: '/users/reset_password/',
			method: 'POST',
			body: { email },
		}),
		}),
		resetPasswordConfirm: builder.mutation({
		query: ({ uid, token, new_password, re_new_password }) => ({
			url: '/users/reset_password_confirm/',
			method: 'POST',
			body: { uid, token, new_password, re_new_password },
		}),
		}),

		// Forms Upload: Application and Panel Form
		// Instead of returning a Blob, we'll create an object URL string
		applicationGenerate: builder.mutation<string, ApplicationFormData>({
		query: (formData) => ({
			url: '/application-docx/',
			method: 'POST',
			body: formData,
			responseHandler: (response) => response.blob(),
		}),
		transformResponse: (responseBlob: Blob) => {
			return URL.createObjectURL(responseBlob);
		},
		}),
		panelGenerate: builder.mutation<string, PanelFormData>({
		query: (formData) => ({
			url: '/panel-docx/',
			method: 'POST',
			body: formData,
			responseHandler: (response) => response.blob(),
		}),
		transformResponse: (responseBlob: Blob) => {
			return URL.createObjectURL(responseBlob);
		},
		}),

		// Manuscript Submission API
		manuscriptSubmission: builder.mutation({
		query: (formData: FormData) => ({
			url: '/manuscripts/',
			method: 'POST',
			body: formData,
		}),
		}),
		// Retrieve Manuscripts API
		searchManuscripts: builder.query<any[], string>({
		query: (searchQuery) => `/manuscripts/?q=${encodeURIComponent(searchQuery)}`,
		transformResponse: (response: any[]) => response, // Ensure it returns an array
		}),
	}),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  
  useApplicationGenerateMutation,
  usePanelGenerateMutation,

  useManuscriptSubmissionMutation,
  useSearchManuscriptsQuery,
} = authApiSlice;
