import { tagTypes } from '../tag-types';
import { baseApi } from './baseApi'

const AUTH_URL = '/auth'
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/login`,
        method: "POST",
        data
      }),
      invalidatesTags:[tagTypes.user]
    }),
    signup: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/signup`,
        method: "POST",
        data
      }),
      invalidatesTags:[tagTypes.user]
    }),

    emailVerification: build.query({
          query: (token: string) => {
            return {
              url: `${AUTH_URL}/verify-email?token=${token}`,
              method: "GET"
            };
          },
          providesTags: [tagTypes.user],
        }),


    changePassword: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/change-password/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.user]
    }),

    forgotPassword: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/forgot-password`,
        method: "POST",
        data:data
      }),
      invalidatesTags:[tagTypes.user]
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url : `${AUTH_URL}/reset-password`,
        method: "POST",
        data:data
      }),
      invalidatesTags:[tagTypes.user]
    }),
  }),
  overrideExisting: false,

  
})

export const { useLoginMutation,useSignupMutation,useEmailVerificationQuery,useChangePasswordMutation,useForgotPasswordMutation,useResetPasswordMutation } = authApi;