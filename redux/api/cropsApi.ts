import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/crops";

export const cropApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    crops: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.crop],
    }),
    cropsByFarmer: build.query({
      query: () => {
        return {
          url: `${URL}/farmer-crops`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.crop],
    }),

    crop: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.crop]
    }),

    addCrop: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.crop]
      }),

    updateCrop: build.mutation({
      query: (data) => ({
        url : `${URL}/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.crop]
    }),

    
    deleteCrop: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.crop]
    }),

  }),
});

export const { useCropsQuery,useCropsByFarmerQuery,useCropQuery,useAddCropMutation,useUpdateCropMutation,useDeleteCropMutation } = cropApi;
