import { formatDate } from "./../utils/index";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData, OrderData, RegisterData } from "../interface";
import {
  FormDataPost,
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  formDataPut,
} from "../utils/axios";
import {
  fetchDataFailure,
  fetchProduct,
  fetchDataStart,
  fetchDataSuccess,
  fetchDataUser,
  fetchCategories,
} from "./reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData: LoginData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/merchants/login", formData);

      localStorage.setItem("userId", response.data.data._id);
      localStorage.setItem("merchantId", response.data.data.merchantId);
      localStorage.setItem("signature", response.data.data.token);
      localStorage.setItem("logo", response.data.data.logo);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.statusText);
      dispatch(fetchDataFailure(error.response.statusText));
    }
  }
);

export const resetUser = createAsyncThunk(
  "resetUser",
  async (email: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(
        `/merchants/forgot-password?email=${email}`
      );
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData: RegisterData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/merchants", formData);
      toast.success(response.data.message);
      localStorage.setItem("signature", response.data.signature);
      localStorage.setItem("role", response.data.role);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/confirm";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Merchant======= **/
export const getMerchant = createAsyncThunk(
  "singleUser",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/merchants/${id}`);

      dispatch(fetchDataUser(response.data.data));
    } catch (error: any) {
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get sales info======= **/
export const fetchOrderData = createAsyncThunk(
  "fetchOrderData",
  async ({ merchantId }: OrderData, { dispatch }) => {
    try {
      dispatch(fetchDataStart());

      const response = await apiGet(
        `/checkouts/order?merchantId=${merchantId}&page=1&size=9999999999`
      );

      dispatch(fetchDataSuccess(response.data.data));
    } catch (error: any) {
      toast.error(error.response?.statusText || "Failed to fetch order data");
      dispatch(fetchDataFailure(error.response?.statusText));
    }
  }
);

/**==============Get Categories======= **/
export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/categories`);
      dispatch(fetchCategories(response.data.data));
    } catch (error: any) {
      toast.error(error.message);
      dispatch(fetchDataFailure(error.response.data.error));
      throw error;
    }
  }
);

/**==============Create Products======= **/
export const createProducts = createAsyncThunk(
  "getProducts",
  async (formData: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await FormDataPost(`/products`, formData);
      dispatch(fetchProduct(response.data.data));
    } catch (error: any) {
      toast.error(error.message);
      dispatch(fetchDataFailure(error.response.data.error));
      throw error;
    }
  }
);

/**==============Get Products======= **/
export const getProducts = createAsyncThunk<void, { id: string }>(
  "product/getProducts",
  async ({ id }, { dispatch }) => {
    try {
      dispatch(fetchDataStart());
      const response = await apiGet(
        `/products?merchantId=${id}&page=1&size=9999999999`
      );
      dispatch(fetchProduct(response.data.data));
    } catch (error: any) {
      toast.error(error.message);
      dispatch(
        fetchDataFailure(error.response?.data?.error || "Unknown error")
      );
      throw error;
    }
  }
);
export const getProductById = (id: string) => async (dispatch: any) => {
  dispatch(fetchDataStart());
  try {
    const response = await axios.get(`/products/${id}`);
    dispatch(fetchDataSuccess(response.data));
    return response.data;
  } catch (error: any) {
    dispatch(fetchDataFailure(error.message || "Failed to fetch product"));
    throw error;
  }
};

/**============== Update Products======= **/
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, formData }: { id: any; formData: any }, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(`/products/${id}`, formData);
      if (response?.data) {
        dispatch(fetchDataSuccess(response.data));
        return { success: true, data: response.data };
      }

      throw new Error("No data received from server");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.Error ||
        error.response?.data?.error ||
        error.message ||
        "Failed to update product";

      console.error("Update product error:", errorMessage);
      dispatch(fetchDataFailure(errorMessage));
      toast.error(errorMessage);

      // Return error object to be handled in the component
      return { error: errorMessage };
    }
  }
);

/**==============Deleter Products======= **/
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiDelete(`/products/${id}`);
      toast.success(response.data.message);
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Update Logo=======  **/
export const updateLogo = createAsyncThunk(
  "updateLogo",
  async ({ id, imageData }: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(
        `/merchants/update/${id}/logo`,
        imageData
      );
      toast.success("Profile Logo Updated");
      dispatch(fetchDataSuccess(response.data));
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Update Profile=======  **/
export const updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ id, formData }: any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPut(`/merchants/${id}`, formData);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/dashboard/profile";
      }, 2000);
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Update Profile=======  **/
export const withdraw = createAsyncThunk(
  "withdraw",
  async (formatData: any, { rejectWithValue, dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/merchants/withdraw", formatData);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to process withdrawal"
      );
    }
  }
);

/**==============Logout ======= **/
export const Logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};
