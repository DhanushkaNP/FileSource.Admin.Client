import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en-US",
  },
});

const api = {
  get: async (url, params = null, token = null) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axiosInstance.get(url, { params, ...config });
    return response.data;
  },
  post: async (url, data, token = null) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axiosInstance.post(url, data, config);
    console.log(response);
    return response.data;
  },
  put: async (url, data, token = null) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  },
  patch: async (url, data) => {
    const response = await axiosInstance.patch(url, data);
    return response.data;
  },
  delete: async (url, token = null) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const response = await axiosInstance.delete(url, { ...config });
    return response.data;
  },
};

export default api;
