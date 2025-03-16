// src/services/userApi.js
import api, { handleError } from './api';

// Lấy danh sách người dùng
export const getAllUsers = async () => {
  try {
    const response = await api.get('/api/users');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Lấy thông tin người dùng theo ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Tạo mới người dùng
export const createUser = async (data) => {
  try {
    const response = await api.post('/api/users/create', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (userId, data) => {
  try {
    const response = await api.put(`/api/users/update/${userId}`, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Lấy thông tin cá nhân của người dùng hiện tại
export const getMyInfor = async () => {
  try {
    const response = await api.get('/api/users/myInfor');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
