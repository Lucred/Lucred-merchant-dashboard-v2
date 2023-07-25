import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  data: any[];
  merchant: any[];
  product: any[];
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  merchant: [],
  product: [],
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataUser: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.merchant = action.payload;
    },
    fetchProduct : (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataUser, fetchProduct, fetchDataFailure } = dataSlice.actions;

export default dataSlice.reducer;
