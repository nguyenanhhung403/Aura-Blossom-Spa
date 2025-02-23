// src/services/authApi.js
import api, { handleError } from './api';

// Đăng ký
export const registerUser = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Đăng nhập
export const loginUser = async (data) => {
  try {
    const response = await api.post('/auth/login', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Đăng xuất
export const logoutUser = async (data) => {
  try {
    const response = await api.post('/auth/logout', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
