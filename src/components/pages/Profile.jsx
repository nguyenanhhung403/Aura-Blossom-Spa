import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import Navbar from "../pages/Navbar";
import ContactUs from "../pages/ContactUs";
import Footer from "../pages/Footer";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://api.example.com/user"); // Replace with your API endpoint
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-[#f9efe4] min-h-screen">
      <Navbar />
      {/* Header */}
      <div
        className="bg-cover bg-center relative text-white text-center py-10 font-bold text-4xl"
        style={{ backgroundImage: "url('/path-to-your-background.jpg')" }}
      >
        TÀI KHOẢN CÁ NHÂN
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto bg-[#fbeade] mt-6 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Tài khoản</h2>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-400">
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
            onClick={() => setActiveTab("history")}
          >
            Lịch sử
          </button>
        </div>

        {/* Loading & Error */}
        {loading && <p className="text-center text-gray-500 mt-4">Đang tải dữ liệu...</p>}
        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {/* Hiển thị thông tin từ API */}
        {!loading && !error && userData && (
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="bg-[#f5d5d5] p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">Thông tin tài khoản</h3>
              <p>Email: {userData.email}</p>
            </div>

            <div className="bg-[#f5d5d5] p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">Thông tin cá nhân</h3>
              <p>Họ và Tên: {userData.fullName}</p>
              <p>Số Điện Thoại: {userData.phone}</p>
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