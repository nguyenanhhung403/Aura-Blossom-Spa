import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaEye, 
  FaFilter, 
  FaEdit, 
  FaCheck, 
  FaTimes 
} from "react-icons/fa";
import { getAllAppointments, updateAppointment } from "../service/appointmentApi";

const StaffAppointments = () => {
  // Các trạng thái có thể có
  const statusOptions = [
    "Đã hoàn thành",
    "Chờ xác nhận",
    "Đã hủy",
  ];

  // Map API status sang trạng thái hiển thị
  const mapApiStatus = (status) => {
    switch(status) {
      case "COMPLETED": return "Đã hoàn thành";
      case "PENDING": return "Chờ xác nhận";
      case "CANCELLED": return "Đã hủy";
      default: return "Chờ xác nhận";
    }
  };

  // Map trạng thái hiển thị sang API status
  const mapToApiStatus = (status) => {
    switch(status) {
      case "Đã hoàn thành": return "COMPLETED";
      case "Chờ xác nhận": return "PENDING";
      case "Đã hủy": return "CANCELLED";
      default: return "PENDING";
    }
  };

  // State cho danh sách đặt lịch
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy danh sách đặt lịch từ API
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllAppointments();
        if (data && data.result) {
          // Chuyển đổi dữ liệu từ API sang định dạng phù hợp với component
          const formattedData = data.result.map(item => ({
            id: item.id,
            name: item.therapist?.fullname || "Không có tên",
            phone: item.therapist?.phone || "",
            email: item.therapist?.email || "",
            gender: "", // API không cung cấp thông tin này
            service: item.service?.name || "Không có dịch vụ",
            dateTime: `${item.date} ${item.time}`,
            staffName: item.therapist?.fullname || "Không có tên",
            docNote: item.note || "",
            custNote: "",
            status: mapApiStatus(item.appointmentStatus),
            originalStatus: item.appointmentStatus
          }));
          setAppointments(formattedData);
        } else {
          throw new Error("Dữ liệu không hợp lệ");
        }
      } catch (err) {
        setError("Không thể tải danh sách lịch hẹn. Vui lòng thử lại sau.");
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Tìm kiếm và lọc theo trạng thái
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.phone && a.phone.includes(searchTerm));
    const matchesStatus =
      filterStatus === "Tất cả" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredAppointments.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredAppointments.length / recordsPerPage);

  // Chỉnh sửa trạng thái
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const startEditStatus = (appointment) => {
    setEditingId(appointment.id);
    setEditingStatus(appointment.status);
  };

  const saveEditStatus = async (id) => {
    setStatusUpdateLoading(true);
    try {
      const appointment = appointments.find(a => a.id === id);
      if (!appointment) throw new Error("Không tìm thấy lịch hẹn");
      
      const apiStatus = mapToApiStatus(editingStatus);
      const updatedData = await updateAppointment(id, { appointmentStatus: apiStatus });
      
      if (updatedData) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: editingStatus, originalStatus: apiStatus } : a))
        );
      }
    } catch (err) {
      console.error("Error updating appointment status:", err);
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
    } finally {
      setStatusUpdateLoading(false);
      setEditingId(null);
      setEditingStatus("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingStatus("");
  };

  // Hàm trả về màu sắc dựa theo trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã hoàn thành":
        return "text-green-400 bg-green-900/30";
      case "Chờ xác nhận":
        return "text-yellow-400 bg-yellow-900/30";
      case "Đã hủy":
        return "text-red-400 bg-red-900/30";
      default:
        return "text-gray-400 bg-gray-900/30";
    }
  };

  // Hiển thị loading
  if (loading && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  // Hiển thị lỗi
  if (error && appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Quản lý lịch hẹn</h1>
      </div>

      {/* Thông tin tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-sm">Tổng lịch hẹn</h3>
          <p className="text-white text-2xl font-bold">{appointments.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-800 to-emerald-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-sm">Đã hoàn thành</h3>
          <p className="text-white text-2xl font-bold">
            {appointments.filter((a) => a.status === "Đã hoàn thành").length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-800 to-amber-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-sm">Chờ xác nhận</h3>
          <p className="text-white text-2xl font-bold">
            {appointments.filter((a) => a.status === "Chờ xác nhận").length}
          </p>
        </div>
      </div>

      {/* Thanh công cụ tìm kiếm và lọc */}
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo ID, tên, SĐT"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-[#0f172a] border border-gray-600 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-gray-300">
            <span>
              Hiển thị {currentRecords.length} / {filteredAppointments.length} mục
            </span>
          </div>
        </div>
      </div>

      {/* Bảng danh sách đặt lịch */}
      <div className="bg-[#1e293b] rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#0f172a] text-gray-300 text-left">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Khách hàng</th>
                <th className="p-3 font-semibold">Liên hệ</th>
                <th className="p-3 font-semibold">Dịch vụ</th>
                <th className="p-3 font-semibold">Lịch hẹn</th>
                <th className="p-3 font-semibold">Chuyên viên</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {currentRecords.map((appointment, index) => (
                <tr
                  key={appointment.id}
                  className={`border-t border-gray-700 hover:bg-[#0f172a]/50 transition ${
                    index % 2 === 0 ? "bg-[#1e293b]/50" : "bg-[#1e293b]"
                  }`}
                >
                  <td className="p-3 font-medium">#{appointment.id}</td>
                  <td className="p-3">
                    <div className="font-medium">{appointment.name}</div>
                    <div className="text-xs text-gray-400">{appointment.gender}</div>
                  </td>
                  <td className="p-3">
                    <div>{appointment.phone}</div>
                    <div className="text-xs text-gray-400">{appointment.email}</div>
                  </td>
                  <td className="p-3">{appointment.service}</td>
                  <td className="p-3">
                    {appointment.dateTime && (
                      <>
                        <div className="font-medium">
                          {appointment.dateTime.split(" ")[0]}
                        </div>
                        <div className="text-xs text-gray-400">
                          {appointment.dateTime.split(" ")[1]}
                        </div>
                      </>
                    )}
                  </td>
                  <td className="p-3">{appointment.staffName}</td>
                  <td className="p-3">
                    {editingId === appointment.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value)}
                          className="bg-[#0f172a] border border-gray-600 rounded text-white py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          disabled={statusUpdateLoading}
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => saveEditStatus(appointment.id)}
                          className="text-green-400 hover:text-green-300"
                          title="Lưu"
                          disabled={statusUpdateLoading}
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-red-400 hover:text-red-300"
                          title="Hủy"
                          disabled={statusUpdateLoading}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status}
                        </span>
                        <button
                          onClick={() => startEditStatus(appointment)}
                          className="text-gray-400 hover:text-gray-300"
                          title="Chỉnh sửa trạng thái"
                        >
                          <FaEdit size={14} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex justify-center space-x-2">
                      <button
                        className="text-blue-400 hover:text-blue-300 p-1"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy mục phù hợp!
                  </td>
                </tr>
              )}
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
                    ? "bg-[#0f172a] text-gray-500"
                    : "bg-[#0f172a] text-white hover:bg-gray-600"
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
                      : "bg-[#0f172a] text-white hover:bg-gray-600"
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
                    ? "bg-[#0f172a] text-gray-500"
                    : "bg-[#0f172a] text-white hover:bg-gray-600"
                }`}
              >
                Sau
              </button>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
};

export default StaffAppointments;