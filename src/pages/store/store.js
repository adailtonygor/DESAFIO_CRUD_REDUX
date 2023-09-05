import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../api";
import tarefasReducer from "./tarefasSlice";
import reducer from "./redurce";

const storeRedux = configureStore({ reducer: reducer });
const storeToolkit = configureStore({ reducer: { tarefas: tarefasReducer } });
const storeQuery = configureStore({reducer: {
  [api.reducerPath]: api.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export { storeRedux, storeQuery, storeToolkit };
