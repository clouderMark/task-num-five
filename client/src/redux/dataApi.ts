import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, IReq, IUser} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

export const dataApi = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    getAllUsers: builder.mutation<IUser[], IReq>({
      query: (data) => ({
        url: '/getall',
        method: 'PUT',
        body: {...data},
      }),
      // transformResponse: (response: IUser[]): IData[] =>
      //   response.map((el) => ({
      //     name: el.name,
      //     createdAt: new Date(el.createdAt),
      //     lastVisit: new Date(el.lastVisit.date),
      //     status: el.status.blocked,
      //     id: el._id!,
      //   })),
    }),
  }),
});

export const {useGetAllUsersMutation} = dataApi;
