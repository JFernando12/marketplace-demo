import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
    getSellersApi: build.query({
      query: () => ({
        url: '/users/sellers',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getProductsAdminApi: build.query({
      query: ({ user_id }) => ({
        url: `/products/admin?${user_id ? `user_id=${user_id}` : ''}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
    getProductsBuyerApi: build.query({
      query: ({ key, minPrice, maxPrice }) => ({
        url: `/products/buyer${key ? `?key=${key}` : ''}${
          minPrice ? `${key ? '&' : '?'}minPrice=${minPrice}` : ''
        }${
          maxPrice ? `${minPrice || key ? '&' : '?'}maxPrice=${maxPrice}` : ''
        }`,
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
  useGetSellersApiQuery,
  useGetProductsAdminApiQuery,
  useGetProductsBuyerApiQuery,
} = api;
