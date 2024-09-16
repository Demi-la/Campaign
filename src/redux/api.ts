import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiRequest = createApi({
  reducerPath: "apiRequest",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://infinion-test-int-test.azurewebsites.net/",
  }),
  tagTypes: ["Posts", "Campaign"],
  endpoints: (builder) => ({
    getCampaign: builder.query<any, void>({
      query: () => `api/Campaign`,
      providesTags: ["Campaign"],
    }),
    getCampaignById: builder.query<any, string>({
      query: (id) => `api/Campaign/${id}`,
      providesTags: (result, error, id) => [{ type: "Campaign", id }],
    }),
    createCampaign: builder.mutation<any, any>({
      query: (newCampaign) => ({
        url: `api/Campaign`,
        method: "POST",
        body: newCampaign,
      }),
      invalidatesTags: ["Campaign"],
    }),
   
    updateCampaign: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `api/Campaign/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Campaign", id }],
    }),

    deleteCampaign: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/Campaign/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id ) => [{ type: "Campaign", id }],
    }),
  }),
});

export const {
  useGetCampaignQuery,
  useGetCampaignByIdQuery,
  useCreateCampaignMutation,
  useUpdateCampaignMutation,
  useDeleteCampaignMutation,
} = apiRequest;

