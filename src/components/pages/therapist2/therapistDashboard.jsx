import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaUserCog } from "react-icons/fa";

const TherapistDashboard = () => {
  const [menuItems, setMenuItems] = useState([
    { name: "Lịch làm việc cá nhân", path: "/therapist2/schedule", icon: <FaCalendarAlt />, count: 0 },
   // { name: "Lịch hẹn", path: "/therapist2/appointments", icon: <FaClipboardList />, count: 0 },
    { name: "Cài đặt", path: "/therapist2/settings", icon: <FaUserCog />, count: 0 },
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
          //  if (item.name === "Lịch hẹn") return { ...item, count: data.appointmentCount };
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
    <div className="dashboard-container">
      <h1 className="dashboard-title">Trang Chủ Chuyên Viên</h1>
      <div className="dashboard-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="dashboard-card">
            <div className="dashboard-icon">{item.icon}</div>
            <p className="dashboard-count">{item.count}</p>
            <p className="dashboard-text">{item.name}</p>
            <Link to={item.path} className="dashboard-link">Chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistDashboard;
