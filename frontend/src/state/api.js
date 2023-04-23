import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
  }),
  reducerPath: 'api',
  tagTypes: ['Products'],
  endpoints: (build) => ({
    getUser: build.query({
      query: () => ({
        url: '/users/currentuser',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    signinApi: build.mutation({
      query: ({ email, password }) => ({
        url: '/users/signin',
        method: 'POST',
        body: { email, password },
      }),
    }),
    signupApi: build.mutation({
      query: ({ email, password, validatePassword }) => ({
        url: '/users/signup',
        method: 'POST',
        body: { email, password, validate_password: validatePassword },
      }),
    }),
    createProductApi: build.mutation({
      query: ({ name, sku, quantity, price }) => ({
        url: '/products',
        method: 'POST',
        body: { name, sku, quantity, price },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }),
      invalidatesTags: ['Products'],
    }),
    getProducts: build.query({
      query: () => ({
        url: '/products',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getProductsAdminApi: build.query({
      query: () => ({
        url: '/products/admin',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getProductsBuyerApi: build.query({
      query: () => ({
        url: '/products/buyer',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useSigninApiMutation,
  useSignupApiMutation,
  useCreateProductApiMutation,
  useGetProductsQuery,
  useGetProductsAdminApiQuery,
  useGetProductsBuyerApiQuery,
} = api;
