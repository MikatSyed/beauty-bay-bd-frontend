import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const URL = "/tracking";

export const trackingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

   
    trackingById: build.query({
      query: (orderId) => ({
        url: `${URL}/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tracking],
    }),

   

 
  }),
});

export const {
useTrackingByIdQuery
} = trackingApi;
