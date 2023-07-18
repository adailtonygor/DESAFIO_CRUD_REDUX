import { configureStore } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api";
import tarefasReducer from "./tarefasSlice";
import reducer from "./redurce";

const storeRedux = configureStore({ reducer: reducer });
const storeToolkit = configureStore({ reducer: { tarefas: tarefasReducer } });
const storeQuery = configureStore({reducer: {
  [jsonPlaceholderApi.reducerPath]: jsonPlaceholderApi.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jsonPlaceholderApi.middleware),
});

export { storeRedux, storeQuery, storeToolkit };
