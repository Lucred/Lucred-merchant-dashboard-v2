import axios from "axios";


// const baseUrl = "https://lucred-backend.onrender.com/api/v1";
// const baseUrl = "https://api.lucred.co/api/v1";
const baseUrl = process.env.REACT_APP_BASE_URL;

export const apiGet = (path:string) => {
  const config = {
    headers: {
      "x-merchant-token": `${localStorage.getItem("signature")}`
    },
  };

  return axios.get(`${baseUrl}${path}`, config);
};

export const apiPost = async (path:string, data:any) => {
  const config = {
    headers: {
     "x-merchant-token": `${localStorage.getItem("signature")}`
    },
  };

  console.log(baseUrl)
  return await axios.post(`${baseUrl}${path}`, data, config);
};


export const FormDataPost = async (path:string, data:any) => {
  const config = {
    headers: {
      "x-merchant-token": `${localStorage.getItem("signature")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post(`${baseUrl}${path}`, data, config);
};

export const apiPut = (path:string, data:object) => {
  const config = {
    headers: {
      "x-merchant-token": `${localStorage.getItem("signature")}`,
      "Content-Type": [ "application/json"]
    },
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const formDataPut = (path:string, data:object) => {
  const config = {
    headers: {
      "x-merchant-token": `${localStorage.getItem("signature")}`,
      "Content-Type": "multipart/form-data"
    },
  };

  return axios.put(`${baseUrl}${path}`, data, config);
};

export const apiPatch = (path:string, data:object) => {
  const config = {
    headers: {
      "x-merchant-token": `${localStorage.getItem("signature")}`,
      "Content-Type": [  "multipart/form-data", "application/json"]
    },
  };

  return axios.patch(`${baseUrl}${path}`, data, config);
};

export const apiDelete = (path:string) => {
  const config = {
    headers: {
      "x-merchant-token": `${localStorage.getItem("signature")}`
    },
  };

  return axios.delete(`${baseUrl}${path}`, config);
};