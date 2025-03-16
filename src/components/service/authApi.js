import api, { handleError } from './api';

// Đăng ký
export const registerUser = async (data) => {
  try {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    const errorObj = errorMsg ? new Error(errorMsg) : error;
    handleError(errorObj);
  }
};

// Đăng nhập
export const loginUser = async (data) => {
  try {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    const errorObj = errorMsg ? new Error(errorMsg) : error;
    handleError(errorObj);
  }
};

// Đăng xuất
export const logoutUser = async (data) => {
  try {
    const response = await api.post('/api/auth/logout', data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    const errorObj = errorMsg ? new Error(errorMsg) : error;
    handleError(errorObj);
  }
};

// Kiểm tra token
export const introspectToken = async (data) => {
  try {
    const response = await api.post('/api/auth/introspect', data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message;
    const errorObj = errorMsg ? new Error(errorMsg) : error;
    handleError(errorObj);
  }
};