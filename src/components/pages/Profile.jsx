import { useState, useEffect } from "react";
import { FaUser, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getMyInfor, updateUser } from "../service/userApi";
import Navbar from "./Navbar";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  const navigate = useNavigate();

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await getMyInfor();
      if (response && response.code === 1000) {
        setUserData(response.result);
        setFormData({
          fullName: response.result.fullname || '',
          phone: response.result.phone || ''
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Không thể tải dữ liệu người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate phone number nếu cần
    if (name === 'phone' && !/^\d*$/.test(value)) {
      return; // Chỉ cho phép nhập số
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser(userData.id, {
        fullName: formData.fullName,
        phone: formData.phone
      });

      if (response && response.code === 1000) {
        alert('Cập nhật thông tin thành công!');
        await fetchUserData(); // Refresh data ngay lập tức
        setIsEditing(false);
      } else {
        throw new Error(response?.message || 'Cập nhật thất bại');
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
    }
  };

  // Thêm hàm xử lý chuyển trang
  const handleHistoryClick = () => {
    navigate('/history');
  };

  return (
    <div className="bg-[#f9efe4] min-h-screen">
      <Navbar />
      <div className="h-20"></div>
      
      <div className="bg-cover bg-center relative text-gray-800 text-center py-10 font-bold text-4xl">
        TÀI KHOẢN CÁ NHÂN
      </div>

      <div className="max-w-4xl mx-auto bg-[#fbeade] mt-6 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Tài khoản</h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-400 mb-6">
          <button
            className={`flex items-center gap-2 px-6 py-2 text-lg ${
              activeTab === "personal" ? "font-bold border-b-2 border-brown-500" : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            <FaUser /> Thông tin cá nhân
          </button>
          <button 
            className={`px-6 py-2 text-lg ${
              activeTab === "history" ? "font-bold border-b-2 border-brown-500" : ""
            }`}
            onClick={handleHistoryClick}
          >
            Lịch sử
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Đang tải thông tin...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : userData && activeTab === "personal" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin tài khoản */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-4">Thông tin tài khoản</h3>
              <div className="space-y-3">
                <p className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{userData?.email}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Tên đăng nhập:</span>
                  <span>{userData?.username}</span>
                </p>
              </div>
            </div>

            {/* Thông tin cá nhân */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Thông tin cá nhân</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={20} />
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Họ và Tên:</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                      minLength={2}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Số điện thoại:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                      pattern="[0-9]*"
                      minLength={10}
                      maxLength={11}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      disabled={!formData.fullName.trim() || !formData.phone.trim()}
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          fullName: userData.fullName || '',
                          phone: userData.phone || ''
                        });
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Họ và Tên:</span>
                    <span>{userData?.fullname || 'Chưa cập nhật'}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Số điện thoại:</span>
                    <span>{userData?.phone || 'Chưa cập nhật'}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <ContactUs />
      {/* <Footer /> */}
    </div>
  );
};

export default UserProfile;