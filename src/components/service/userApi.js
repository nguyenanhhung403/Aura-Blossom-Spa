// src/services/userApi.js
import api, { handleError } from './api';

// Lấy danh sách người dùng
export const getAllUsers = async () => {
  try {
    const response = await api.get('/api/users');
    console.log('Raw API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
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
    let requestData;
    let headers = {};

    // Kiểm tra nếu data là FormData (có file upload)
    if (data instanceof FormData) {
      requestData = data;
      headers = {
        'Content-Type': 'multipart/form-data'
      };
    } else {
      // Nếu không có file, gửi data bình thường
      requestData = {
        username: data.username,
        fullname: data.fullname,
        phone: data.phone,
        email: data.email,
        role: data.role // Gửi role dưới dạng string
      };

      if (data.password) {
        requestData.password = data.password;
      }
    }

    // Log request data để debug
    console.log("Sending update request with data:", JSON.stringify(requestData, null, 2));
    
    const response = await api.put(`/api/users/update/${userId}`, requestData);
    console.log("Update response:", response.data);
    
    if (!response.data) {
      throw new Error('Không nhận được phản hồi từ server');
    }
    
    return response.data;
  } catch (error) {
    console.error("Update user error:", error);
    if (error.response?.data) {
      console.log("Error details:", error.response.data);
      throw new Error(error.response.data.message || 'Lỗi khi cập nhật người dùng');
    }
    throw new Error('Lỗi kết nối đến server');
  }
};

// Xóa người dùng
export const deleteUser = async (userId) => {
  try {
    console.log("Sending delete request for user:", userId);
    const response = await api.delete(`/api/users/delete/${userId}`);
    console.log("Delete response:", response.data);
    
    if (!response.data) {
      throw new Error('Không nhận được phản hồi từ server');
    }
    
    return response.data;
  } catch (error) {
    console.error("Delete user error:", error);
    // Kiểm tra lỗi cụ thể từ backend
    if (error.response?.data) {
      console.log("Error details:", error.response.data);
      if (error.response.data.code === 1011) {
        throw new Error('Therapist not found');
      }
      throw new Error(error.response.data.message || 'Lỗi khi xóa người dùng');
    }
    throw new Error('Lỗi kết nối đến server');
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
