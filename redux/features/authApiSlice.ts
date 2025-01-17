import { apiSlice } from '../services/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveUser: builder.query({
            query: () => '/users/me/'
        })
    })
})

export const { useRetrieveUserQuery } = authApiSlice;