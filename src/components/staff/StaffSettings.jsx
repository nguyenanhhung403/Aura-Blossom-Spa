import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaIdCard, FaUserCircle, FaCamera } from 'react-icons/fa';
import { updateStaff } from '../service/userApi';

const StaffSettings = () => {
  const [staffData, setStaffData] = useState({
    id: 0,
    username: "",
    password: "********",
    email: "",
    fullname: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    ...staffData,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchStaffData = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${userId}`);
        const data = await response.json();
        
        if (data.code === 1000 && data.result) {
          const staffInfo = data.result;
          setStaffData({
            id: staffInfo.id,
            username: staffInfo.username,
            password: "********",
            email: staffInfo.email,
            fullname: staffInfo.fullname,
            phone: staffInfo.phone
          });
          
          setFormData(prev => ({
            ...prev,
            id: staffInfo.id,
            username: staffInfo.username,
            email: staffInfo.email,
            fullname: staffInfo.fullname,
            phone: staffInfo.phone
          }));
        } else {
          setError("Không thể lấy thông tin nhân viên");
        }
      } catch (err) {
        setError("Lỗi kết nối đến server");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData(2); // Thay 2 bằng userId động nếu cần
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    try {
      const updateData = {
        email: formData.email,
        phone: formData.phone,
        fullname: formData.fullname
      };

      // Chỉ thêm password vào updateData nếu có mật khẩu mới
      if (formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      const response = await updateStaff(formData.id, updateData);
      
      if (response.code === 1000) {
        setStaffData({
          ...staffData,
          email: formData.email,
          phone: formData.phone,
          fullname: formData.fullname
        });
        
        // Reset các trường mật khẩu
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        
        alert('Cập nhật thông tin thành công!');
      } else {
        alert('Cập nhật thông tin thất bại: ' + response.message);
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật thông tin!');
      console.error(error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">Lỗi!</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );

  return (
    <div>
      {/* Tiêu đề */}
      <div className="bg-[#1e293b] p-4 rounded-lg text-xl font-bold text-gray-100 mb-6 flex justify-between items-center">
        <span className="text-white">Cài đặt tài khoản</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phần thông tin cá nhân */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-[#0f172a] flex items-center justify-center text-blue-400">
                <FaUserCircle size={80} />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <FaCamera size={14} />
              </button>
            </div>
            
            <h3 className="text-xl text-white mb-1">{staffData.fullname}</h3>
            <p className="text-gray-400 mb-3">@{staffData.username}</p>
            
            <div className="w-full bg-[#0f172a] p-4 rounded-lg mb-3">
              <div className="flex items-center text-gray-300 mb-2">
                <FaIdCard className="mr-2 text-blue-400" />
                <span className="text-gray-400 mr-2">ID:</span>
                <span>{staffData.id}</span>
              </div>
              <div className="flex items-center text-gray-300 mb-2">
                <FaEnvelope className="mr-2 text-blue-400" />
                <span className="text-gray-400 mr-2">Email:</span>
                <span>{staffData.email}</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FaPhone className="mr-2 text-blue-400" />
                <span className="text-gray-400 mr-2">SĐT:</span>
                <span>{staffData.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form cập nhật thông tin */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow-md md:col-span-2">
          <h3 className="text-lg text-white mb-4">Cập nhật thông tin</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2">ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaIdCard className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    disabled
                    className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Tên đăng nhập</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUser className="text-gray-500" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    disabled
                    className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Họ và tên</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập email"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Số điện thoại</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhone className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nhập số điện thoại"
                />
              </div>
            </div>
            
            <div className="border-t border-gray-700 pt-4 mt-6">
              <h3 className="text-lg text-white mb-4">Đổi mật khẩu</h3>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Mật khẩu hiện tại</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mật khẩu hiện tại"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Mật khẩu mới</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Xác nhận mật khẩu mới</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaLock className="text-gray-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="bg-[#0f172a] border border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Xác nhận mật khẩu mới"
                  />
                </div>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cập nhật thông tin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StaffSettings; 