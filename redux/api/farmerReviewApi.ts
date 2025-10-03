import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/farmer-reviews";

export const farmerReviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

  

    reviewByFarmerId: build.query({
      query: (id:string) => {
        return {
          url: `${URL}/${id}`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.review],
    }),
  

 
    addFarmerReview: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.review,tagTypes.services]
      }),
 
    deleteFarmerReview: build.mutation({
        query: (id) => ({
          url : `${URL}/${id}`,
          method: "DELETE"
         
        }),
        invalidatesTags:[tagTypes.review]
      }),
  }),
});

export const { useAddFarmerReviewMutation,useReviewByFarmerIdQuery,useDeleteFarmerReviewMutation } = farmerReviewApi;
