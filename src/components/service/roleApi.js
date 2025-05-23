// src/services/roleApi.js
import api, { handleError } from './api';

// Lấy danh sách vai trò
export const getAllRoles = async () => {
  try {
    const response = await api.get('/api/roles');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Tạo vai trò mới
export const createRole = async (data) => {
  try {
    const response = await api.post('/api/roles/create', data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Xóa vai trò
export const deleteRole = async (roleId) => {
  try {
    const response = await api.delete(`/api/roles/delete/${roleId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
