// src/services/api.js
import axios from 'axios';

// Cấu hình của Axios
const API_BASE_URL = 'http://localhost:8080/'; // Thay đổi nếu bee hạy ở cổng khác
export const ACCESS_TOKEN = 'access_token';

const isClient = typeof window !== 'undefined';

const api = axios.create({
  baseURL: API_BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

api.interceptors.request.use((req) => {
  const accessToken = isClient ? localStorage.getItem(ACCESS_TOKEN) : null;
  if (accessToken && accessToken !== "undefined") {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }

  return req;
});

api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Để trình duyệt tự thêm Content-Type: multipart/form-data
    delete config.headers['Content-Type'];
  }
  return config;
});

// Hàm xử lý lỗi 
const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

export default api;
export { handleError };
