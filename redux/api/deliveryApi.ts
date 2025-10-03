import {  IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const  URL = "/delivery";

export const deliveryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    deliveries: build.query({
      query: () => {
        return {
          url: URL,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.delivery],
    }),

    deliveryForLogistic: build.query({
      query: () => {
        return {
          url: `${URL}/logistic`,
          method: "GET",      
        };
      },
    
      providesTags: [tagTypes.delivery],
    }),

    delivery: build.query({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "GET"
       
      }),
      providesTags:[tagTypes.delivery]
    }),

    addDelivery: build.mutation({
        query: (data) => ({
          url : `${URL}`,
          method: "POST",
          data
        }),
        invalidatesTags:[tagTypes.delivery,tagTypes.tracking]
      }),

    updateDeliveryStatusByLogistic: build.mutation({
      query: (data) => ({
        url : `${URL}/status/${data.id}`,
        method: "PATCH",
        data:data.body
      }),
      invalidatesTags:[tagTypes.delivery]
    }),

    
    deleteDelivery: build.mutation({
      query: (id) => ({
        url : `${URL}/${id}`,
        method: "DELETE"
       
      }),
      invalidatesTags:[tagTypes.delivery]
    }),

  }),
});

export const { useDeliveriesQuery,useDeliveryQuery,useAddDeliveryMutation,useUpdateDeliveryStatusByLogisticMutation,useDeleteDeliveryMutation,useDeliveryForLogisticQuery } = deliveryApi;
