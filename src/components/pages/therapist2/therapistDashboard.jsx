import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaUserCog } from "react-icons/fa";
import { handleLogout } from '../../service/authApi';

const TherapistDashboard = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    { name: "Lịch làm việc cá nhân", path: "/therapist2/schedule", icon: <FaCalendarAlt />, count: 0 },
    { name: "Cài đặt", path: "/therapist2/settings", icon: <FaUserCog />, count: 0 }
  ]);

  // Gọi API lấy dữ liệu từ backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://your-api.com/therapist-dashboard"); // Đổi thành API thực tế
        const data = await response.json();

        // Giả sử dữ liệu từ API có dạng { scheduleCount: 12, appointmentCount: 45, settingsCount: 1 }
        setMenuItems((prevItems) =>
          prevItems.map((item) => {
            if (item.name === "Lịch làm việc cá nhân") return { ...item, count: data.scheduleCount };
            if (item.name === "Cài đặt") return { ...item, count: data.settingsCount };
            return item;
          })
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Trang Chủ Chuyên Viên</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Lịch làm việc */}
          <div className="bg-blue-900 rounded-lg p-6 text-center">
            <h2 className="text-xl text-white mb-4">Lịch làm việc cá nhân</h2>
            <div className="text-3xl font-bold text-white mb-4">{menuItems[0].count}</div>
            <Link 
              to={menuItems[0].path}
              className="inline-block bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-white"
            >
              Chi tiết
            </Link>
          </div>

          {/* Card Cài đặt */}
          <div className="bg-purple-900 rounded-lg p-6 text-center">
            <h2 className="text-xl text-white mb-4">Cài đặt tài khoản</h2>
            <div className="text-3xl font-bold text-white mb-4">{menuItems[1].count}</div>
            <Link 
              to={menuItems[1].path}
              className="inline-block bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded text-white"
            >
              Chi tiết
            </Link>
          </div>
        </div>

        {/* Chỉ giữ một nút đăng xuất ở dưới */}
        <div className="mt-8">
          
        </div>
      </div>
    </div>
  );
};

export default TherapistDashboard;
