import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaHistory, FaComments, FaUserCog } from "react-icons/fa";

const menuItems = [
  {
    name: "Lịch hẹn",
    path: "/staff/appointments",
    icon: <FaCalendarAlt className="text-3xl mb-2" />,
    count: "12"
  },
  {
    name: "Lịch sử",
    path: "/staff/history",
    icon: <FaHistory className="text-3xl mb-2" />,
    count: "45"
  },
  {
    name: "Đánh giá",
    path: "/staff/feedback",
    icon: <FaComments className="text-3xl mb-2" />,
    count: "28"
  },
  {
    name: "Cài đặt",
    path: "/staff/settings",
    icon: <FaUserCog className="text-3xl mb-2" />,
    count: "1"
  }
];

const StaffDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 bg-[#1e293b] p-4 rounded shadow text-white">
        Trang Chủ Nhân Viên
      </h1>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#1e293b] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-center">
              <div className="text-[#60a5fa] mb-2">{item.icon}</div>
              <p className="text-3xl font-bold text-white">{item.count}</p>
              <p className="mt-2 text-gray-300">{item.name}</p>
              <Link
                to={item.path}
                className="mt-4 inline-block bg-[#2563eb] text-white px-4 py-2 rounded text-sm hover:bg-[#1d4ed8] transition"
              >
                Chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffDashboard; 