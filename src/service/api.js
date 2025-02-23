// src/services/api.js
import axios from 'axios';

// Cấu hình của Axios
const API_BASE_URL = 'http://localhost:8080/api'; // Thay đổi nếu bee hạy ở cổng khác

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm xử lý lỗi ~~ nhma toi chạy lõi
const handleError = (error) => {
  console.error('API Error:', error);
  throw error;
};

export default api;
export { handleError };
