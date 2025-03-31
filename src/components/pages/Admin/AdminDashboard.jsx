import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";

const menuItems = [
  { name: "Dịch vụ", path: "/admin/services" },
  { name: "Lịch hẹn", path: "/admin/appointments" },
  { name: "Nhân viên", path: "/admin/therapists" },
  { name: "Khách hàng", path: "/admin/customers" },
  { name: "Lịch làm việc", path: "/admin/schedules" },
  { name: "Quiz", path: "/admin/quizlist" },
  { name: "Blogs", path: "/admin/blogs" },
  { name: "Feedback", path: "/admin/feedback" },
  { name: "Báo cáo", path: "/admin/dashboard" },
];

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Trang Chủ
          </h1>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 text-white p-6 rounded-lg text-center shadow-md"
            >
              <p className="text-3xl font-bold">50</p>
              <p className="mt-2">{item.name}</p>
              <Link
                to={item.path}
                className="mt-4 inline-block bg-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-600 transition"
              >
                Chi tiết
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
