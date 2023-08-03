import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../interface";
import { FormDataPost, apiDelete, apiGet, apiPatch, apiPost, apiPut, formDataPut } from "../utils/axios";
import { fetchDataFailure, fetchProduct, fetchDataStart, fetchDataSuccess, fetchDataUser, fetchCategories } from "./reducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const loginUser = createAsyncThunk(
  "loginUser",
  async (formData: LoginData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/merchants/login", formData);
      console.log(response)
      localStorage.setItem("userId", response.data.data._id);
      localStorage.setItem("merchantId", response.data.data.merchantId);
      localStorage.setItem("signature", response.data.data.token);
      localStorage.setItem("logo", response.data.data.logo)
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error: any) {
      console.log(error.response);
      toast.error(error.response.statusText);
      dispatch(fetchDataFailure(error.response.statusText));
    }
  }
);

/**==============Get Merchant======= **/
export const getMerchant = createAsyncThunk(
  "singleUser",
  async (id:string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/merchants/${id}`);
      dispatch(fetchDataUser(response.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
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
      console.log('resp', response.data.data)
      dispatch(fetchCategories(response.data.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Create Products======= **/
export const createProducts = createAsyncThunk(
  "getProducts",
  async (formData:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await FormDataPost(`/products`, formData);
      dispatch(fetchProduct(response.data.data));
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Get Products======= **/
export const getProducts = createAsyncThunk(
  "getProducts",
  async (id:string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/products?merchantId=${id}&page=1&size=10`);
      console.log(response.data)
      dispatch(fetchProduct(response.data.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**============== Update Products======= **/
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({id, formData}:{id:any, formData:any}, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(`/products/${id}`, formData);
      toast.success(response.data.message);
      // window.location.reload()
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Deleter Products======= **/
export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id:string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiDelete(`/products/${id}`);
      toast.success(response.data.message);
      window.location.reload()
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
  async ({id, imageData}:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await formDataPut(`/merchants/update/${id}/logo`, imageData);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
      window.location.reload()
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
  async ({id, formData}:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPut(`/merchants/${id}`, formData);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
      window.location.reload()
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData: LoginData, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPost("/user/signup", formData);
      toast.success(response.data.message);
      localStorage.setItem("signature", response.data.signature);
      localStorage.setItem("role", response.data.role);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/confirm";
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);



  /**==============Logout ======= **/
  export const Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };