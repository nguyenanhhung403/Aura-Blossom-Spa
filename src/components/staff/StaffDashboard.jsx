import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaCalendarAlt, 
  FaHistory, 
  FaComments, 
  FaChartLine, 
  FaMoneyBillWave,
  FaStar, 
  FaUsers,
  FaClock
} from "react-icons/fa";
import { getAllAppointments } from "../service/appointmentApi";
import axios from "axios";

const SpaDashboard = () => {
  // State cho dữ liệu tổng quan
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Lấy dữ liệu cuộc hẹn
        const appointmentsData = await getAllAppointments();
        if (appointmentsData && appointmentsData.result) {
          setAppointments(appointmentsData.result);
        }

        // Lấy dữ liệu đánh giá
        const feedbackResponse = await axios.get("http://localhost:8080/api/ratings/all");
        if (feedbackResponse.data.code === 1000) {
          setFeedbacks(feedbackResponse.data.result);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Tính toán các chỉ số thống kê từ dữ liệu
  const statistics = {
    totalAppointments: appointments.length,
    approvedAppointments: appointments.filter(a => a.appointmentStatus === "APPROVED").length,
    pendingAppointments: appointments.filter(a => a.appointmentStatus === "PENDING").length,
    totalRevenue: appointments.reduce((sum, a) => sum + (a.price || 0), 0),
    paidAppointments: appointments.filter(a => a.paymentStatus === "PAID").length,
    averageRating: feedbacks.length > 0 
      ? (feedbacks.reduce((sum, f) => sum + f.stars, 0) / feedbacks.length).toFixed(1) 
      : 0,
    totalFeedbacks: feedbacks.length,
    highRatingFeedbacks: feedbacks.filter(f => f.stars >= 4).length,
  };

  // Lấy 5 cuộc hẹn gần nhất
  const recentAppointments = [...appointments]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  // Lấy 3 đánh giá gần nhất
  const recentFeedbacks = [...feedbacks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Card items cho phần thống kê
  const statCards = [
    {
      name: "Lịch hẹn",
      value: statistics.totalAppointments,
      subValue: `${statistics.approvedAppointments} đã duyệt`,
      icon: <FaCalendarAlt className="text-3xl mb-2" />,
      path: "/staff/appointments",
      color: "from-blue-800 to-indigo-800"
    },
    {
      name: "Doanh thu",
      value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(statistics.totalRevenue),
      subValue: `${statistics.paidAppointments} giao dịch`,
      icon: <FaMoneyBillWave className="text-3xl mb-2" />,
      path: "/staff/history",
      color: "from-green-800 to-emerald-800"
    },
    {
      name: "Đánh giá",
      value: statistics.averageRating,
      subValue: `${statistics.totalFeedbacks} đánh giá`,
      icon: <FaStar className="text-3xl mb-2" />,
      path: "/staff/feedback",
      color: "from-yellow-800 to-amber-800"
    },
    {
      name: "Chờ xác nhận",
      value: statistics.pendingAppointments,
      subValue: "Cần duyệt",
      icon: <FaClock className="text-3xl mb-2" />,
      path: "/staff/appointments",
      color: "from-purple-800 to-pink-800"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 bg-[#1e293b] p-4 rounded shadow text-white">
        Tổng Quan Spa
      </h1>

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${card.color} p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="text-center">
              <div className="text-white mb-2">{card.icon}</div>
              <p className="text-3xl font-bold text-white">{card.value}</p>
              <p className="mt-1 text-gray-200 text-sm">{card.subValue}</p>
              <p className="mt-2 text-gray-300">{card.name}</p>
              <Link
                to={card.path}
                className="mt-4 inline-block bg-[#0f172a] text-white px-4 py-2 rounded text-sm hover:bg-[#1e293b] transition"
              >
                Chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cuộc hẹn gần đây */}
        <div className="lg:col-span-2 bg-[#1e293b] rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-semibold">Cuộc hẹn gần đây</h2>
            <Link to="/staff/appointments" className="text-blue-400 hover:text-blue-300 text-sm">
              Xem tất cả
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-400 text-sm">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Khách hàng</th>
                  <th className="py-2 px-3">Dịch vụ</th>
                  <th className="py-2 px-3">Ngày</th>
                  <th className="py-2 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b border-gray-700">
                    <td className="py-3 px-3 text-gray-300">{appointment.id}</td>
                    <td className="py-3 px-3 text-white">{appointment.fullname || "Không có tên"}</td>
                    <td className="py-3 px-3 text-gray-300">{appointment.service?.name || "Không có dịch vụ"}</td>
                    <td className="py-3 px-3 text-gray-300">{appointment.date} {appointment.time}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        appointment.appointmentStatus === "APPROVED" ? "bg-green-900/30 text-green-400" :
                        appointment.appointmentStatus === "PENDING" ? "bg-yellow-900/30 text-yellow-400" :
                        "bg-red-900/30 text-red-400"
                      }`}>
                        {appointment.appointmentStatus === "APPROVED" ? "Đã duyệt" :
                         appointment.appointmentStatus === "PENDING" ? "Chờ xác nhận" : 
                         "Đã từ chối"}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentAppointments.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-400">
                      Không có cuộc hẹn nào gần đây
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Đánh giá gần đây */}
        <div className="bg-[#1e293b] rounded-lg shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-semibold">Đánh giá gần đây</h2>
            <Link to="/staff/feedback" className="text-blue-400 hover:text-blue-300 text-sm">
              Xem tất cả
            </Link>
          </div>

          <div className="space-y-4">
            {recentFeedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-[#0f172a] p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white font-medium">{feedback.userFullname || "Khách hàng"}</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar 
                        key={star} 
                        className={star <= feedback.stars ? "text-yellow-400" : "text-gray-600"} 
                        size={14} 
                      />
                    ))}
                  </div>
                </div>
                <div className="text-gray-400 text-sm mb-2">
                  {feedback.service || "Dịch vụ"}
                </div>
                <div className="text-gray-300 text-sm italic">
                  "{feedback.feedback.length > 100 
                    ? `${feedback.feedback.substring(0, 100)}...` 
                    : feedback.feedback}"
                </div>
              </div>
            ))}
            {recentFeedbacks.length === 0 && (
              <div className="py-4 text-center text-gray-400">
                Không có đánh giá nào gần đây
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaDashboard; 