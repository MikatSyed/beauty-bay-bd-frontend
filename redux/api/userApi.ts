import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  USER_URL = "/users";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({



    users: build.query({
      query: () => {
        return {
          url: USER_URL,
          method: "GET",
        
        };
      },
      providesTags: [tagTypes.user],
    }),
    userStatistic: build.query({
      query: () => {
        return {
          url: `${USER_URL}/statistic/user`,
          method: "GET",
        
        };
      },
      providesTags: [tagTypes.user],
    }),
    logisticUsers: build.query({
      query: () => {
        return {
          url:`${USER_URL}/logistics`,
          method: "GET",
        
        };
      },
      providesTags: [tagTypes.user,tagTypes.crop,tagTypes.booking,tagTypes.review,tagTypes.tracking],
    }),

    loggedUser: build.query({
      query: () => {
        return {
          url: `${USER_URL}/my-profile`,
          method: "GET"
        };
      },
      providesTags: [tagTypes.user],
    }),

    updateLoggedUser: build.mutation({
      query: (data) => ({
        url : `${USER_URL}/my-profile`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.user]
    }),

    userById: build.query({
      query: (id) => ({
        url : `${USER_URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.user]
    }),

    updateUser: build.mutation({
      query: (data) => ({
        url : `${USER_URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.user]
    }),

    
    deleteUser: build.mutation({
      query: (id) => ({
        url : `${USER_URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.user]
    }),

     approvalToggle: build.mutation({
      query: (data) => ({
       url : `${USER_URL}/verify/${data.id}`,
        method: "PATCH",
        data:data.body   
      }),
      invalidatesTags:[tagTypes.user]
    }),

  }),
});

export const { useUsersQuery,useUserStatisticQuery,useUserByIdQuery,useUpdateUserMutation,useDeleteUserMutation,useLoggedUserQuery,useUpdateLoggedUserMutation,useLogisticUsersQuery,useApprovalToggleMutation } = adminApi;
