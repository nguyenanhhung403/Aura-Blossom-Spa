import React, { useState, useEffect } from "react";
import "../../../App.css";
import defaultAvatar from '../../images/TherapistImg/anhmacdinh.jpg'; // Ảnh mặc định
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaFileAlt,
  FaCamera
} from "react-icons/fa";
import api from "../../service/api";
import { getTherapistById, updateTherapist } from "../../service/therapistsApi";

const TherapistSettings = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    description: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(defaultAvatar); // Ảnh đại diện
  const [selectedFile, setSelectedFile] = useState(null); // Ảnh mới
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [therapistId, setTherapistId] = useState(null); // Lưu ID của chuyên viên

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

  // Hàm cập nhật state khi nhập mật khẩu
  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý khi chọn ảnh mới
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
    }
  };

  // Hàm gửi dữ liệu cập nhật thông tin lên API
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!therapistId) {
      setError("Không có thông tin ID chuyên viên");
      setLoading(false);
      return;
    }

    try {
      // Tạo object therapist cần cập nhật với đúng format
      const therapistData = {
        email: formData.email,
        fullname: formData.fullname,
        phone: formData.phone || "",
        description: formData.description || ""
      };
      
      console.log("Sending data:", therapistData); // Log để debug
      console.log("Therapist ID:", therapistId);
      console.log("Has thumbnail:", selectedFile ? "Yes" : "No");
      
      // Sử dụng hàm updateTherapist đã được sửa từ therapistsApi.js
      const response = await updateTherapist(therapistId, therapistData, selectedFile);
      
      if (response && response.code === 1000) {
        alert("Cập nhật thông tin thành công!");
      } else {
        throw new Error(response?.message || "Cập nhật thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      setError(error.message || "Cập nhật thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // Hàm gửi cập nhật mật khẩu
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPasswordError("");

    if (!therapistId) {
      setPasswordError("Không có thông tin ID chuyên viên");
      setLoading(false);
      return;
    }

    // Kiểm tra mật khẩu mới nếu có nhập
    if (!passwordData.currentPassword) {
      setPasswordError("Vui lòng nhập mật khẩu hiện tại");
      setLoading(false);
      return;
    }

    if (!passwordData.newPassword) {
      setPasswordError("Vui lòng nhập mật khẩu mới");
      setLoading(false);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận mật khẩu không khớp");
      setLoading(false);
      return;
    }

    try {
      // Tạo object therapist chỉ với password
      const therapistData = {
        password: passwordData.newPassword,
        oldPassword: passwordData.currentPassword // Thêm old password nếu API cần xác thực
      };
      
      console.log("Sending password update:", { therapistId, hasPassword: !!passwordData.newPassword });
      
      // Sử dụng hàm updateTherapist đã sửa
      const response = await updateTherapist(therapistId, therapistData, null);
      
      if (response && response.code === 1000) {
        alert("Cập nhật mật khẩu thành công!");
        // Reset password fields
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        throw new Error(response?.message || "Cập nhật mật khẩu thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
      setPasswordError(error.message || "Cập nhật mật khẩu thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-container">
      {/* Hiển thị thông báo loading */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Đang xử lý...</p>
        </div>
      )}
      
      {/* Thanh thông tin cá nhân */}
      <aside className="therapist-sidebar">
        <div className="profile-section">
          <div className="avatar">
            <img src={avatar} alt="therapist-avatar" />
            <label className="upload-avatar">
              <FaCamera />
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </label>
          </div>
          {formData.fullname && <h3>{formData.fullname}</h3>}
          {formData.phone && <p><FaPhone className="icon" /> {formData.phone}</p>}
          {formData.email && <p><FaEnvelope className="icon" /> {formData.email}</p>}
        </div>
      </aside>

      {/* Form cập nhật thông tin */}
      <main className="settings-form">
        <div className="form-section">
          <h2>Cập nhật thông tin</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleInfoSubmit}>
            <div className="input-group">
              <label>Họ và tên</label>
              <div className="input-icon">
                <FaUser className="input-icon-element" />
                <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-icon">
                <FaEnvelope className="input-icon-element" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Số điện thoại</label>
              <div className="input-icon">
                <FaPhone className="input-icon-element" />
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Mô tả</label>
              <div className="input-icon">
                <FaFileAlt className="input-icon-element" />
                <input type="text" name="description" value={formData.description} onChange={handleChange} />
              </div>
            </div>

            <button 
              type="submit" 
              className="update-button"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Cập nhật thông tin"}
            </button>
          </form>
        </div>

        {/* Form cập nhật mật khẩu */}
        <div className="form-section password-section">
          <h2>Đổi mật khẩu</h2>
          
          {passwordError && <div className="error-message">{passwordError}</div>}
          
          <form onSubmit={handlePasswordSubmit}>
            <div className="input-group">
              <label>Mật khẩu hiện tại</label>
              <div className="input-icon">
                <FaLock className="input-icon-element" />
                <input 
                  type="password" 
                  name="currentPassword" 
                  value={passwordData.currentPassword} 
                  onChange={handlePasswordChange} 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Mật khẩu mới</label>
              <div className="input-icon">
                <FaLock className="input-icon-element" />
                <input 
                  type="password" 
                  name="newPassword" 
                  value={passwordData.newPassword} 
                  onChange={handlePasswordChange} 
                />
              </div>
            </div>

            <div className="input-group">
              <label>Xác nhận mật khẩu mới</label>
              <div className="input-icon">
                <FaLock className="input-icon-element" />
                <input 
                  type="password" 
                  name="confirmPassword" 
                  value={passwordData.confirmPassword} 
                  onChange={handlePasswordChange} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="update-button"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TherapistSettings;
