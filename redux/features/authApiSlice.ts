import { apiSlice } from '../services/apiSlice';

interface User {
	first_name: string;
	last_name: string;
	email: string;
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
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
			query: ({
				first_name,
				last_name,
				email,
				password,
				re_password,
			}) => ({
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
			query: email => ({
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
		applicationGenerate: builder.mutation({
			query: ({ department, lead_researcher, lead_contactno, co_researcher, 
				co_researcher1, co_researcher2, co_researcher3, co_researcher4, 
				research_title, datetime_defense, place_defense, panel_chair, 
				adviser, panel1, panel2, panel3, documenter
			}) => ({
				url: '/application-docx/',
				method: 'POST',
				body: { department, lead_researcher, lead_contactno, co_researcher, 
					co_researcher1, co_researcher2, co_researcher3, co_researcher4, 
					research_title, datetime_defense, place_defense, panel_chair, 
					adviser, panel1, panel2, panel3, documenter },
			}),
		}),
		panelGenerate: builder.mutation({
			query: ({ research_title, co_researcher, co_researcher1, co_researcher2,
					co_researcher3, co_researcher4, lead_researcher, adviser,
					panel_chair, panel1, panel2, panel3
			}) => ({
				url: '/panel-docx/',
				method: 'POST',
				body: { research_title, co_researcher, co_researcher1, co_researcher2,
					co_researcher3, co_researcher4, lead_researcher, adviser,
					panel_chair, panel1, panel2, panel3 },
			}),
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
} = authApiSlice;