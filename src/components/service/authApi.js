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

export const handleLogout = async () => {
  try {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    
    // Clear tất cả storage ngay lập tức
    localStorage.clear();
    sessionStorage.clear();
    
    // Abort tất cả các request đang pending (nếu có)
    if (window.AbortController) {
      // Abort tất cả request đang chạy
      const controller = new AbortController();
      controller.abort();
    }
    
    if (token) {
      try {
        // Gọi API logout với timeout ngắn
        await Promise.race([
          logoutUser({ token: token }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Logout timeout')), 1000)
          )
        ]);
      } catch (error) {
        console.warn('Logout API error:', error);
        // Không cần xử lý lỗi vì đã clear storage
      }
    }

    // Force reload và chuyển về trang login
    window.location.replace('/login');
    
  } catch (error) {
    console.error('Logout error:', error);
    // Đảm bảo luôn clear và redirect
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/login');
  }
};
