import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jsonPlaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
    }),
    createTodo: builder.mutation({
      query: (todo) => ({
        url: 'todos',
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: todo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = jsonPlaceholderApi;