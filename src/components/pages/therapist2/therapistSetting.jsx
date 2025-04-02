import React, { useState, useEffect } from "react";
import "../../../App.css";
import defaultAvatar from '../../images/TherapistImg/anhmacdinh.jpg'; // Ảnh mặc định
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaFileAlt,
  FaCamera,
  FaBriefcase,
  FaSave,
  FaExclamationTriangle
} from "react-icons/fa";
import api from "../../service/api";
import { getTherapistById, updateTherapist } from "../../service/therapistsApi";

const TherapistSettings = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    description: "",
    username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    experience: "",
  });

  const [avatar, setAvatar] = useState(defaultAvatar); // Ảnh đại diện
  const [selectedFile, setSelectedFile] = useState(null); // Ảnh mới
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [therapistId, setTherapistId] = useState(null); // Lưu ID của chuyên viên
  const [activeTab, setActiveTab] = useState("profile"); // Tab đang active: profile hoặc password

  // Lấy dữ liệu từ API khi component render lần đầu
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Gọi API lấy thông tin người dùng đang đăng nhập
        const response = await api.get("/api/users/myInfor");
        console.log("My info response:", response.data);
        
        if (response.data.code === 1000 && response.data.result) {
          const userData = response.data.result;
          setTherapistId(userData.id);
          
          // Sau khi có ID, gọi API lấy thông tin chi tiết
          try {
            const therapistResponse = await api.get(`/api/therapists/${userData.id}`);
            console.log("Therapist response:", therapistResponse.data);
            
            if (therapistResponse.data.code === 1000 && therapistResponse.data.result) {
              const therapistData = therapistResponse.data.result;
              
              setFormData({
                fullname: therapistData.fullname || "",
                email: therapistData.email || "",
                phone: therapistData.phone || "",
                description: therapistData.description || "",
                username: therapistData.username || "",
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
                experience: therapistData.experience || "",
              });
              
              if (therapistData.image) {
                setAvatar(therapistData.image);
              }
            }
          } catch (therapistError) {
            console.error("Lỗi khi lấy thông tin chi tiết:", therapistError);
            
            // Sử dụng thông tin cơ bản từ myInfor nếu không lấy được chi tiết
            setFormData({
              fullname: userData.fullname || "",
              email: userData.email || "",
              phone: "",
              description: "",
              username: userData.username || "",
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
              experience: userData.experience || "",
            });
            
            if (userData.image) {
              setAvatar(userData.image);
            }
          }
        } else {
          throw new Error("Không thể lấy thông tin người dùng");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setError("Không thể lấy thông tin người dùng. Vui lòng đăng nhập lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Hàm cập nhật state khi nhập liệu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý khi chọn ảnh mới
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Hàm gửi dữ liệu cập nhật thông tin lên API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!therapistId) {
      setError("Không có thông tin ID chuyên viên");
      setLoading(false);
      return;
    }

    try {
      // Lọc các trường cần thiết để cập nhật thông tin cơ bản
      const therapistData = {
        email: formData.email,
        fullname: formData.fullname,
        phone: formData.phone || "",
        description: formData.description || "",
        username: formData.username || "",
        experience: formData.experience || "",
      };
      
      // Kiểm tra và xử lý mật khẩu riêng biệt
      const hasPasswordChange = formData.currentPassword && formData.newPassword;
      
      if (hasPasswordChange) {
        if (formData.newPassword !== formData.confirmPassword) {
          setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
          setLoading(false);
          return;
        }
        
        // Thêm mật khẩu vào dữ liệu cập nhật
        therapistData.oldPassword = formData.currentPassword;
        therapistData.password = formData.newPassword;
      }
      
      console.log("Sending data:", therapistData);
      console.log("Therapist ID:", therapistId);
      console.log("Has thumbnail:", selectedFile ? "Yes" : "No");
      
      // Gọi API cập nhật thông tin
      const response = await updateTherapist(therapistId, therapistData, selectedFile);
      
      if (response && response.code === 1000) {
        setSuccess("Cập nhật thông tin thành công!");
        
        // Nếu đổi mật khẩu thành công, xóa trường mật khẩu
        if (hasPasswordChange) {
          setFormData({
            ...formData,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
          });
        }
      } else {
        throw new Error(response?.message || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      setError(error.response?.data?.message || error.message || "Cập nhật thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-8 px-4">
      {/* Container chính */}
      <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar chuyên viên */}
          <div className="w-full md:w-1/3 bg-gradient-to-b from-gray-800 to-gray-700 text-white p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="h-36 w-36 rounded-full overflow-hidden border-4 border-gray-700 shadow-lg">
                  <img 
                    src={avatar} 
                    alt="Ảnh đại diện" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 h-10 w-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-600 transition duration-200">
                  <FaCamera className="text-white" />
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              
              <h2 className="text-2xl font-bold mb-2 text-white">{formData.fullname || "Chuyên viên"}</h2>
              
              <div className="w-full space-y-3 mt-4">
                {formData.username && (
                  <div className="flex items-center justify-center space-x-2">
                    <FaUser className="text-gray-400" />
                    <span className="text-white">{formData.username}</span>
                  </div>
                )}
                
                {formData.email && (
                  <div className="flex items-center justify-center space-x-2">
                    <FaEnvelope className="text-gray-400" />
                    <span className="text-white">{formData.email}</span>
                  </div>
                )}
                
                {formData.phone && (
                  <div className="flex items-center justify-center space-x-2">
                    <FaPhone className="text-gray-400" />
                    <span className="text-white">{formData.phone}</span>
                  </div>
                )}
                
                {formData.experience && (
                  <div className="flex items-center justify-center space-x-2">
                    <FaBriefcase className="text-gray-400" />
                    <span className="text-white">{formData.experience} năm kinh nghiệm</span>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-4 bg-gray-800 bg-opacity-10 rounded-lg text-left">
                <h3 className="font-semibold mb-2 flex items-center text-white">
                  <FaFileAlt className="mr-2" /> Mô tả chuyên môn
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {formData.description || "Chưa có thông tin mô tả."}
                </p>
              </div>
            </div>
          </div>
          
          {/* Phần form cập nhật */}
          <div className="w-full md:w-2/3 p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Cài đặt tài khoản</h1>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-600 mb-6">
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'profile' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('profile')}
              >
                Thông tin cá nhân
              </button>
              <button 
                className={`px-4 py-2 font-medium ${activeTab === 'password' ? 'text-white border-b-2 border-white' : 'text-gray-400 hover:text-gray-300'}`}
                onClick={() => setActiveTab('password')}
              >
                Đổi mật khẩu
              </button>
            </div>
            
            {/* Hiển thị thông báo */}
            {error && (
              <div className="mb-4 p-3 bg-red-900 border-l-4 border-red-700 text-red-300 flex items-start">
                <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {success && (
              <div className="mb-4 p-3 bg-green-900 border-l-4 border-green-700 text-green-300">
                {success}
              </div>
            )}
            
            {/* Loading overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-5 rounded-lg shadow-lg flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-300">Đang xử lý...</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              {/* Tab thông tin cá nhân */}
              {activeTab === 'profile' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Họ và tên</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="fullname"
                          value={formData.fullname}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                          placeholder="Nhập họ và tên"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                          placeholder="Nhập email"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Số điện thoại</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                          placeholder="Nhập số điện thoại"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Số năm kinh nghiệm</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaBriefcase className="text-gray-500" />
                        </div>
                        <input
                          type="number"
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          min="0"
                          className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                          placeholder="Nhập số năm kinh nghiệm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Mô tả</label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 pointer-events-none">
                        <FaFileAlt className="text-gray-500" />
                      </div>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                        placeholder="Nhập mô tả chuyên môn của bạn"
                      ></textarea>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Tab đổi mật khẩu */}
              {activeTab === 'password' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu hiện tại</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Mật khẩu mới</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Xác nhận mật khẩu mới</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-500" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-white focus:border-white bg-gray-700 text-white"
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Nút cập nhật */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-lg hover:from-gray-600 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-300"
                >
                  <FaSave className="mr-2" /> {loading ? "Đang xử lý..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapistSettings;
