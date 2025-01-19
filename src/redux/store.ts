import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer";
import { RootState } from "../../types/store";

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
