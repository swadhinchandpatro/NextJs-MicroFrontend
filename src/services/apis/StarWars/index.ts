import { createApi } from "@reduxjs/toolkit/query/react";
import {
  axiosBaseQuery,
  fetcher,
} from "../../../utility/rtkQuery/fetchBaseQuery";
import { BASE_URL } from "../../../services/constants";

/* Endpoints for Star Wars API calls , 
   used for services only , 
   not to be consumed directly. 
*/

export const starWarApi = createApi({
  reducerPath: "starWars",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getStarWarMoviesList: builder.query({
      query: ({ params, config }) =>
        fetcher({
          url: "films",
          method: "GET",
          params: params,
          config: config,
        }),
    }),
    addStarWarFilm : builder.mutation({
      query: ({ params, config }) =>
        fetcher({
          url: "films",
          method: "POST",
          params: params,
          config: config,
        }),
    }),
  }),
});

export const { useGetStarWarMoviesListQuery, useAddStarWarFilmMutation } = starWarApi;
