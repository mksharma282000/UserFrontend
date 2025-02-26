import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL;
console.log({API_URL})

function getHeaders(customHeaders = {}) {
  const token = useAuthStore.getState().token;
  return {
    Accept: 'application/json',
    ...(token && { Authorization: token }),
    ...customHeaders,
  };
}

function createRequestOptions(options = {}) {
  return {
    baseURL: API_URL,
    ...options,
    headers: getHeaders(options.headers),
  };
}

function handleResponse(response) {
  if (response?.data?.status === 'SUCCESS') {
    return response.data.payload;
  }
  throw response.data; // Throwing the error if status is not SUCCESS
}

function handleError(error) {
  const statusCode = error?.response?.data?.payload?.errors?.[0]?.code || error?.response?.status;

  if (statusCode === 403) {
    sessionStorage.clear(); // Clear session on 403 Forbidden
  }

  if (error?.response?.data?.status === 'ERROR') {
    throw error.response.data?.payload?.errors?.[0] || error.response.data;
  }

  throw error.response || error; // Ensure error object is thrown
}

export const httpGet = async (url, options) => {
  try {
    const response = await axios.get(`/api/v1/${url}`, createRequestOptions(options));
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const httpPost = async (url, body, options) => {
  try {
    const response = await axios.post(`/api/v1/${url}`, body, createRequestOptions(options));
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const httpPut = async (url, body, options) => {
  try {
    const response = await axios.put(`/api/v1/${url}`, body, createRequestOptions(options));
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

export const httpDelete = async (url, options) => {
  try {
    const response = await axios.delete(`/api/v1/${url}`, createRequestOptions(options));
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
