import React, { useState } from "react";
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

const AppointmentList = () => {
  // Các trạng thái có thể có
  const statusOptions = [
    "Đã hoàn thành",
    "Chờ xác nhận",
    "Đã hủy",
  ];

  // Dữ liệu mẫu cho danh sách đặt lịch
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@gmail.com",
      gender: "Nam",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      staffName: "Chuyên viên Minh",
      docNote: "Kiểm tra da, đề xuất liệu trình 3 tháng",
      custNote: "Muốn tư vấn thêm về sản phẩm dưỡng da",
      status: "Đã hoàn thành",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@gmail.com",
      gender: "Nữ",
      service: "Trị mụn chuyên sâu",
      dateTime: "2023-12-02 09:30",
      staffName: "Chuyên viên Hương",
      docNote: "Xem xét dị ứng, đề xuất sản phẩm phù hợp",
      custNote: "Có tiền sử dị ứng với benzoyl peroxide",
      status: "Chờ xác nhận",
    },
    {
      id: 3,
      name: "Lê Văn C",
      phone: "0909123456",
      email: "levanc@gmail.com",
      gender: "Nam",
      service: "Điều trị sẹo",
      dateTime: "2023-12-05 15:30",
      staffName: "Chuyên viên Thanh",
      docNote: "Sẹo lõm, cần liệu trình laser kết hợp lăn kim",
      custNote: "Quan tâm đến chi phí và thời gian phục hồi",
      status: "Đã hoàn thành",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      phone: "0978123654",
      email: "phamthid@gmail.com",
      gender: "Nữ",
      service: "Tắm trắng cao cấp",
      dateTime: "2023-12-07 10:00",
      staffName: "Chuyên viên Lan",
      docNote: "Da sạm màu do tiếp xúc ánh nắng nhiều",
      custNote: "Muốn làm trắng trước kỳ nghỉ lễ",
      status: "Đã hủy",
    },
    {
      id: 5,
      name: "Hoàng Minh E",
      phone: "0912987654",
      email: "hoangminhe@gmail.com",
      gender: "Nam",
      service: "Trị rụng tóc",
      dateTime: "2023-12-10 13:45",
      staffName: "Chuyên viên Tùng",
      docNote: "Rụng tóc theo mùa, cần bổ sung dinh dưỡng",
      custNote: "Lo lắng về tác dụng phụ của thuốc mọc tóc",
      status: "Đã hoàn thành",
    },
  ]);

  // Tìm kiếm và lọc theo trạng thái
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      a.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm);
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

  const startEditStatus = (appointment) => {
    setEditingId(appointment.id);
    setEditingStatus(appointment.status);
  };

  const saveEditStatus = (id) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: editingStatus } : a))
    );
    setEditingId(null);
    setEditingStatus("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingStatus("");
  };

  // Xóa đặt lịch
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa mục này?")) {
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    }
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
            <h3 className="text-gray-300 text-sm">Tổng khách hàng</h3>
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
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-700 text-gray-300 text-left">
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
                    className={`border-t border-gray-700 hover:bg-gray-700/50 transition ${
                      index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"
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
                      <div className="font-medium">
                        {appointment.dateTime.split(" ")[0]}
                      </div>
                      <div className="text-xs text-gray-400">
                        {appointment.dateTime.split(" ")[1]}
                      </div>
                    </td>
                    <td className="p-3">{appointment.staffName}</td>
                    <td className="p-3">
                      {editingId === appointment.id ? (
                        <div className="flex items-center space-x-2">
                          <select
                            value={editingStatus}
                            onChange={(e) => setEditingStatus(e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded text-white py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-red-400 hover:text-red-300"
                            title="Hủy"
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
                        <button
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Xóa"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <FaTrash />
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

export default AppointmentList;
