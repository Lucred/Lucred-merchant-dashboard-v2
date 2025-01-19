import { store } from "@/App";
import { Product } from "./product";

export interface RootState {
  product: ProductState;
}

export interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

// Action types
export interface FetchDataStartAction {
  type: "FETCH_DATA_START";
}

export interface FetchDataFailureAction {
  type: "FETCH_DATA_FAILURE";
  payload: string;
}

export interface FetchProductAction {
  type: "FETCH_PRODUCT";
  payload: Product[];
}

export type ProductActionTypes =
  | FetchDataStartAction
  | FetchDataFailureAction
  | FetchProductAction;

// Thunk types
export type AppDispatch = typeof store.dispatch;
export type GetProductsThunkAction = (params: { id: string }) => Promise<void>;
