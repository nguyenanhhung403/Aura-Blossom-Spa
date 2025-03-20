import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClipboardList, FaComments, FaUserCog } from "react-icons/fa";
const menuItems = [
  {
    name: "Lịch làm việc cá nhân",
    path: "/staff/personalschedule",
    icon: <FaCalendarAlt />,
    count: "12"
  },
  {
    name: "Lịch hẹn",
    path: "/staff/appointments",
    icon: <FaClipboardList />,
    count: "45"
  },
  {
    name: "Đánh giá",
    path: "/staff/feedback",
    icon: <FaComments />,
    count: "28"
  },
  {
    name: "Cài đặt",
    path: "/staff/settings",
    icon: <FaUserCog />,
    count: "1"
  }
];

const TherapistDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Trang Chủ Chuyên Viên</h1>

      {/* Grid of Cards */}
      <div className="dashboard-grid">
        {menuItems.map((item, index) => (
          <div key={index} className="dashboard-card">
            <div className="dashboard-icon">{item.icon}</div>
            <p className="dashboard-count">{item.count}</p>
            <p className="dashboard-text">{item.name}</p>
            <Link to={item.path} className="dashboard-link">
              Chi tiết
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistDashboard;
