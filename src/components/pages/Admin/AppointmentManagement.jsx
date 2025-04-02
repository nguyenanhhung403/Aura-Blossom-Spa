import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaTrash, 
  FaEye, 
  FaFilter, 
  FaEdit, 
  FaCheck, 
  FaTimes 
} from "react-icons/fa";
import Sidebar from "./SideBar";
import { 
  getAllAppointments, 
  updateAppointment, 
  deleteAppointment,
  cancelAppointment 
} from "../../service/appointmentApi.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");

  // Các trạng thái có thể có
  const appointmentStatusOptions = [
    "PENDING",
    "CONFIRMED",
    "COMPLETED",
    "REJECTED",
    "CANCELLED"
  ];

  const paymentStatusOptions = [
    "UNPAID",
    "PARTIALLY_PAID",
    "PAID",
    "CANCELLED"
  ];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching appointments...');
      const response = await getAllAppointments();
      console.log('Full API Response:', response);
      console.log('Sample appointment structure:', response?.result[0]);

      if (response?.result && Array.isArray(response.result)) {
        const formattedAppointments = response.result.map(appointment => ({
          ...appointment,
          fullname: appointment.fullname || 'Chưa có tên',
          phone: appointment.phone || 'Chưa có SĐT',
          email: appointment.email || 'Chưa có email',
          service: {
            name: appointment.service?.name || 'Chưa có dịch vụ',
            price: appointment.service?.price || 0
          },
          status: appointment.status || 'PENDING',
          paymentStatus: appointment.paymentStatus || 'UNPAID'
        }));
        setAppointments(formattedAppointments);
        console.log('Formatted appointments:', formattedAppointments);
      } else {
        throw new Error('Không nhận được dữ liệu từ server');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError(error.message);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý cập nhật trạng thái
  const handleStatusUpdate = async (id, appointmentStatus, paymentStatus) => {
    try {
      await updateAppointment(id, {
        appointmentStatus,
        paymentStatus
      });
      toast.success("Cập nhật trạng thái thành công");
      fetchAppointments(); // Refresh data
      setEditingId(null);
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  // Xử lý hủy lịch hẹn
  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id);
      toast.success("Hủy lịch hẹn thành công");
      fetchAppointments();
    } catch (error) {
      toast.error("Lỗi khi hủy lịch hẹn");
    }
  };

  // Xử lý xóa lịch hẹn
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch hẹn này?")) {
      try {
        await deleteAppointment(id);
        toast.success("Xóa lịch hẹn thành công");
        fetchAppointments();
      } catch (error) {
        toast.error("Lỗi khi xóa lịch hẹn");
      }
    }
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Lọc appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = 
      appointment.id.toString().includes(searchTerm) ||
      appointment.fullname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "Tất cả" || 
      appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Phân trang
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const currentItems = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 justify-center items-center">
        <div className="text-white">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-900 justify-center items-center">
        <div className="text-red-500">
          Lỗi: {error}
          <button 
            onClick={fetchAppointments}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Quản lý đặt lịch</h1>
        </div>

        {/* Thông tin tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Tổng lịch hẹn</h3>
            <p className="text-white text-2xl font-bold">{appointments.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-800 to-emerald-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Đã hoàn thành</h3>
            <p className="text-white text-2xl font-bold">
              {appointments.filter((a) => a.status === "COMPLETED").length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-800 to-amber-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Chờ xác nhận</h3>
            <p className="text-white text-2xl font-bold">
              {appointments.filter((a) => a.status === "PENDING").length}
            </p>
          </div>
        </div>

        {/* Thanh công cụ tìm kiếm và lọc */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo ID, tên, SĐT"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Tất cả">Tất cả trạng thái</option>
                  {appointmentStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-gray-300">
              <span>
                Hiển thị {currentItems.length} / {filteredAppointments.length} mục
              </span>
            </div>
          </div>
        </div>

            {/* Bảng danh sách đặt lịch */}
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-200">
                  <thead className="text-xs uppercase bg-gray-700">
                    <tr>
                      <th className="px-6 py-3">ID</th>
                      <th className="px-6 py-3">Khách hàng</th>
                      <th className="px-6 py-3">Dịch vụ</th>
                      <th className="px-6 py-3">Giá</th>
                      <th className="px-6 py-3">Lịch hẹn</th>
                      <th className="px-6 py-3">Chuyên viên</th>
                      <th className="px-6 py-3">Trạng thái</th>
                      <th className="px-6 py-3">Thanh toán</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-700">
                        <td className="px-6 py-4">#{appointment.id}</td>
                        <td className="px-6 py-4">
                          <div>{appointment.fullname}</div>
                          <div className="text-sm text-gray-400">{appointment.note || '-'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{appointment.service?.name || 'Chưa có dịch vụ'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{formatPrice(appointment.price)}</div>
                          <div className="text-sm text-gray-400">
                            Đặt cọc: {formatPrice(appointment.depositAmount)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{appointment.date || 'Chưa có ngày'}</div>
                          <div className="text-sm text-gray-400">
                            {appointment.startTime || '--:--'} - {appointment.endTime || '--:--'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>{appointment.therapist?.fullname || 'Chưa có chuyên viên'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appointment.status)}`}>
                            {appointment.status || 'PENDING'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(appointment.paymentStatus)}`}>
                            {appointment.paymentStatus || 'UNPAID'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-700 flex justify-between items-center">
              <div className="text-gray-400">
                Trang {currentPage} / {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? "bg-gray-700 text-gray-500"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  Trước
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? "bg-gray-700 text-gray-500"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function để format giá
const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN').format(price);
};

// Helper function để xác định màu sắc trạng thái
const getStatusColor = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-900/30 text-green-400';
    case 'PENDING':
      return 'bg-yellow-900/30 text-yellow-400';
    case 'REJECTED':
      return 'bg-red-900/30 text-red-400';
    case 'CANCELLED':
      return 'bg-red-900/30 text-red-400';
    case 'COMPLETED':
      return 'bg-blue-900/30 text-blue-400';
    default:
      return 'bg-gray-900/30 text-gray-400';
  }
};

const getPaymentStatusColor = (status) => {
  switch (status) {
    case 'PAID':
      return 'bg-green-900/30 text-green-400';
    case 'PARTIALLY_PAID':
      return 'bg-yellow-900/30 text-yellow-400';
    case 'UNPAID':
      return 'bg-red-900/30 text-red-400';
    default:
      return 'bg-gray-900/30 text-gray-400';
  }
};

export default AppointmentManagement;

