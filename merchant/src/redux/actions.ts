import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../interface";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../utils/axios";
import { fetchDataFailure, fetchDataPhoto, fetchDataStart, fetchDataSuccess, fetchDataUser } from "./reducer";
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
      localStorage.setItem("signature", response.data.data.token);
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

/**==============Update Profile=======  **/
export const updateLogo = createAsyncThunk(
  "updateLogo",
  async ({id, formData}:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPatch(`/merchants/update/${id}/logo`, formData);
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

export const verifyUser = createAsyncThunk(
  "verifyUser",
  async (token: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPatch(`/user/verify/?token=${token}`, {});
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
      setTimeout(() => {
        window.location.href = "/verified";
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
      window.location.href = "/expired";
    }
  }
);

export const resendverification = createAsyncThunk(
  "resendverification",
  async (token: string, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet(`/user/resendverification/${token}`);
      toast.success(response.data.message);
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




/**==============Get Events ======= **/
export const getEvents = createAsyncThunk(
  "getEvents",
  async (_, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiGet("/event/getEvents");
      dispatch(fetchDataSuccess(response.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Register For Event======= **/

export const registerEvent = createAsyncThunk(
  "registerEvent",
  async ({formData , id}:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      const response = await apiPatch(`/user/register-event?id=${id}`, formData);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

  /**==============Upload Photos=======  **/
export const uploadPhotos = createAsyncThunk(
  "uploadPhotos",
  async (formData:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      console.log(formData)
      const response = await apiPatch(`/photographer/upload-photos`, formData);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Save Photos======= **/
export const saveImages = createAsyncThunk(
  "saveImages",
  async (formData:any, { dispatch }) => {
    try {
      dispatch(fetchDataStart);
      console.log(formData)
      const response = await apiPut(`/user/save-image`, formData);
      toast.success(response.data.message);
      dispatch(fetchDataSuccess(response.data));
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.Error);
      dispatch(fetchDataFailure(error.response.data.error));
    }
  }
);

/**==============Delete Photos======= **/
  export const deletePhotos = createAsyncThunk(
    "deletePhotos",
    async ({eventId, url}:any, { dispatch }) => {
      try {
        dispatch(fetchDataStart);
        const response = await apiDelete(`/photographer/delete-photos?eventId=${eventId}&url=${url}`);
        toast.success(response.data.message);
        dispatch(fetchDataSuccess(response.data));
      } catch (error: any) {
        console.log(error.response.data.error);
        toast.error(error.response.data.Error);
        dispatch(fetchDataFailure(error.response.data.error));
      }
    }
  );


  /**==============Get Photographers======= **/
  export const getPhotographers = createAsyncThunk(
    "getPhotographers",
    async (_, { dispatch }) => {
      try {
        dispatch(fetchDataStart);
        const response = await apiGet(`/photographer/get-photographer`);
        toast.success(response.data.message);
        dispatch(fetchDataPhoto(response.data));
      } catch (error: any) {
        console.log(error.response.data.error);
        toast.error(error.response.data.Error);
        dispatch(fetchDataFailure(error.response.data.error));
      }
    }
  );

    /**==============Get Photographers======= **/
    export const getSinglePhotographer = createAsyncThunk(
      "getSinglePhotographer",
      async (_, { dispatch }) => {
        try {
          dispatch(fetchDataStart);
          const response = await apiGet(`/photographer/get-singlephotographer`);
          toast.success(response.data.message);
          dispatch(fetchDataPhoto(response.data));
        } catch (error: any) {
          console.log(error.response.data.error);
          toast.error(error.response.data.Error);
          dispatch(fetchDataFailure(error.response.data.error));
        }
      }
    );

    /**==============Get All Users ========= **/
    export const getUsers= createAsyncThunk(
      "getUsers",
      async (_, { dispatch }) => {
        try {
          dispatch(fetchDataStart);
          const response = await apiGet(`/user/get-users`);
          toast.success(response.data.message);
          dispatch(fetchDataSuccess(response.data));
        } catch (error: any) {
          console.log(error.response.data.error);
          toast.error(error.response.data.Error);
          dispatch(fetchDataFailure(error.response.data.error));
        }
      }
    );

  /**==============Get Photographers======= **/
  export const createPhotographer = createAsyncThunk(
    "createPhotographer",
    async (formData :any, { dispatch }) => {
      try {
        dispatch(fetchDataStart);
        const response = await apiPost(`/admin/create-photographer`, formData);
        toast.success(response.data.message);
        dispatch(fetchDataSuccess(response.data));
      } catch (error: any) {
        console.log(error.response.data.error);
        toast.error(error.response.data.Error);
        dispatch(fetchDataFailure(error.response.data.error));
      }
    }
  );

    /**==============Create Event======= **/
    export const createEvent = createAsyncThunk(
      "createEvent",
      async (formData :any, { dispatch }) => {
        try {
          dispatch(fetchDataStart);
          const response = await apiPost(`/admin/create-event`, formData);
          toast.success(response.data.message);
          dispatch(fetchDataSuccess(response.data));
        } catch (error: any) {
          console.log(error.response.data.error);
          toast.error(error.response.data.Error);
          dispatch(fetchDataFailure(error.response.data.error));
        }
      }
    );




  /**==============Update Photographers Profile=======  **/
  export const updatePhotoProfile = createAsyncThunk(
    "updateProfile",
    async (formData:any, { dispatch }) => {
      try {
        dispatch(fetchDataStart);
        const response = await apiPatch(`/photographer/update`, formData);
        toast.success(response.data.message);
        dispatch(fetchDataSuccess(response.data));
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