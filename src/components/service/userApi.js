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
    // Sử dụng data được truyền vào thay vì userData
    const requestData = {
      id: userId,
      username: data.username,
      fullname: data.fullName,
      phone: data.phone,
      email: data.email,
      role: data.role
    };

    console.log("Sending update request:", requestData);

    const response = await api.put(`/api/users/update/${userId}`, requestData);

    console.log("Update response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    console.log("Error details:", error.response?.data);
    throw error;
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

export const updateStaff = async (staffId, updateData) => {
  try {
    const response = await fetch(`http://localhost:8080/api/users/update/${staffId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};
