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

const TherapistSettings = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    description: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(defaultAvatar); // Ảnh đại diện
  const [selectedFile, setSelectedFile] = useState(null); // Ảnh mới

  // Lấy dữ liệu từ API khi component render lần đầu
  useEffect(() => {
    fetch("https://your-api.com/therapist-profile")
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          phone: data.phone || "",
          description: data.description || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setAvatar(data.avatar || defaultAvatar); // Gán ảnh từ API hoặc ảnh mặc định
      })
      .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
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
      setAvatar(URL.createObjectURL(file)); // Hiển thị ảnh xem trước
    }
  };

  // Hàm gửi dữ liệu cập nhật lên API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("description", formData.description);

    if (selectedFile) {
      formDataToSend.append("avatar", selectedFile); // Gửi ảnh nếu có
    }

    try {
      const response = await fetch("https://your-api.com/therapist-profile/update", {
        method: "PUT",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Cập nhật thành công!");
      } else {
        alert("Cập nhật thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  return (
    <div className="settings-container">
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
        </div>
      </aside>

      {/* Form cập nhật thông tin */}
      <main className="settings-form">
        <h2>Cập nhật thông tin</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Họ và tên</label>
            <div className="input-icon">
              <FaUser className="input-icon-element" />
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
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

          <h3>Đổi mật khẩu</h3>
          <div className="input-group">
            <label>Mật khẩu hiện tại</label>
            <div className="input-icon">
              <FaLock className="input-icon-element" />
              <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group">
            <label>Mật khẩu mới</label>
            <div className="input-icon">
              <FaLock className="input-icon-element" />
              <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            </div>
          </div>

          <div className="input-group">
            <label>Xác nhận mật khẩu mới</label>
            <div className="input-icon">
              <FaLock className="input-icon-element" />
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="update-button">Cập nhật thông tin</button>
        </form>
      </main>
    </div>
  );
};

export default TherapistSettings;
