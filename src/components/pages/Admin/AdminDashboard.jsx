import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { getAllAppointments } from "../../service/appointmentApi";
import { getAllServices } from "../../service/serviceApi";
import { getAllTherapists } from "../../service/therapistsApi";
import { getAllBlogs } from "../../service/blogApi";
import { FaCalendarAlt, FaServicestack, FaUserMd, FaBlog } from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    appointments: 0,
    services: 0,
    therapists: 0,
    blogs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from APIs
        const [appointmentsData, servicesData, therapistsData, blogsData] = await Promise.all([
          getAllAppointments(),
          getAllServices(),
          getAllTherapists(),
          getAllBlogs()
        ]);
        
        // Update stats with counts
        setStats({
          appointments: appointmentsData?.result?.length || 0,
          services: servicesData?.result?.length || 0,
          therapists: therapistsData?.result?.length || 0,
          blogs: blogsData?.result?.length || 0,
        });
        
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Danh sách các thẻ thống kê chính
  const statCards = [
    {
      title: "Lịch hẹn",
      count: stats.appointments,
      path: "/admin/appointments",
      color: "from-blue-500 to-blue-700",
      icon: <FaCalendarAlt className="text-white text-3xl" />
    },
    {
      title: "Dịch vụ",
      count: stats.services,
      path: "/admin/services",
      color: "from-purple-500 to-purple-700",
      icon: <FaServicestack className="text-white text-3xl" />
    },
    {
      title: "Nhân viên",
      count: stats.therapists,
      path: "/admin/therapists",
      color: "from-green-500 to-green-700",
      icon: <FaUserMd className="text-white text-3xl" />
    },
    {
      title: "Blogs",
      count: stats.blogs,
      path: "/admin/blogs",
      color: "from-yellow-500 to-yellow-700",
      icon: <FaBlog className="text-white text-3xl" />
    }
  ];

  // Danh sách các menu khác
  const otherMenuItems = [
    { name: "Khách hàng", path: "/admin/customers" },
    { name: "Lịch làm việc", path: "/admin/schedules" },
    { name: "Quiz", path: "/admin/quizlist" },
    { name: "Feedback", path: "/admin/feedback" },
    { name: "Báo cáo", path: "/admin/dashboard" },
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="text-white text-xl">Đang tải dữ liệu...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="flex justify-center items-center h-full">
            <div className="text-red-400 text-xl">{error}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-white">
            Trang Chủ Admin
          </h1>
        </div>

        {/* Thống kê chính */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${card.color} p-6 rounded-lg shadow-lg`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white text-sm opacity-80">{card.title}</p>
                  <p className="text-white text-3xl font-bold mt-1">{card.count}</p>
                  <Link
                    to={card.path}
                    className="mt-4 inline-block bg-white/20 px-4 py-2 rounded text-sm text-white hover:bg-white/30 transition"
                  >
                    Chi tiết
                  </Link>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Các menu khác */}
        <h2 className="text-xl font-medium text-white mb-4">Quản lý khác</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {otherMenuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="bg-gray-800 hover:bg-gray-700 text-white p-6 rounded-lg text-center shadow-md transition"
            >
              <p className="mt-2 font-medium">{item.name}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
