import React, { useState } from "react";
import { 
  FaSearch, 
  FaEye, 
  FaFilter,
  FaEdit,
  FaCheck,
  FaTimes
} from "react-icons/fa";

const StaffHistory = () => {
  // Các trạng thái có thể có
  const statusOptions = [
    "Đã thanh toán",
    "Chưa thanh toán",
    "Đã hủy"
  ];

  // Dữ liệu mẫu cho lịch sử thanh toán
  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "nguyenvana@gmail.com",
      service: "Dịch vụ chăm sóc da",
      dateTime: "2023-12-01 14:00",
      amount: 1200000,
      status: "Đã thanh toán",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      email: "tranthib@gmail.com",
      service: "Trị mụn chuyên sâu",
      dateTime: "2023-12-02 09:30",
      amount: 1500000,
      status: "Đã thanh toán",
    },
    {
      id: 3,
      name: "Lê Văn C",
      phone: "0909123456",
      email: "levanc@gmail.com",
      service: "Điều trị sẹo",
      dateTime: "2023-12-05 15:30",
      amount: 2500000,
      status: "Đã thanh toán",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      phone: "0978123654",
      email: "phamthid@gmail.com",
      service: "Tắm trắng cao cấp",
      dateTime: "2023-12-07 10:00",
      amount: 3000000,
      status: "Đã hủy",
    },
    {
      id: 5,
      name: "Hoàng Minh E",
      phone: "0912987654",
      email: "hoangminhe@gmail.com",
      service: "Trị rụng tóc",
      dateTime: "2023-12-10 13:45",
      amount: 1800000,
      status: "Chưa thanh toán",
    },
  ]);

  // Tìm kiếm và lọc theo trạng thái
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  const filteredHistory = paymentHistory.filter((payment) => {
    const matchesSearch =
      payment.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.phone.includes(searchTerm);
    const matchesStatus =
      filterStatus === "Tất cả" || payment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredHistory.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredHistory.length / recordsPerPage);

  // Chỉnh sửa trạng thái
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");

  const startEditStatus = (payment) => {
    setEditingId(payment.id);
    setEditingStatus(payment.status);
  };

  const saveEditStatus = (id) => {
    setPaymentHistory((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: editingStatus } : p))
    );
    setEditingId(null);
    setEditingStatus("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingStatus("");
  };

  // Hàm trả về màu sắc dựa theo trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã thanh toán":
        return "text-green-400 bg-green-900/30";
      case "Chưa thanh toán":
        return "text-yellow-400 bg-yellow-900/30";
      case "Đã hủy":
        return "text-red-400 bg-red-900/30";
      default:
        return "text-gray-400 bg-gray-900/30";
    }
  };

  // Hàm định dạng số tiền
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Lịch sử thanh toán</h1>
      </div>

      {/* Thông tin tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-sm">Tổng giao dịch</h3>
          <p className="text-white text-2xl font-bold">{paymentHistory.length}</p>
        </div>
        <div className="bg-gradient-to-r from-green-800 to-emerald-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-sm">Đã thanh toán</h3>
          <p className="text-white text-2xl font-bold">
            {paymentHistory.filter((p) => p.status === "Đã thanh toán").length}
          </p>
        </div>
        <div className="bg-gradient-to-r from-yellow-800 to-amber-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-gray-300 text-sm">Chưa thanh toán</h3>
          <p className="text-white text-2xl font-bold">
            {paymentHistory.filter((p) => p.status === "Chưa thanh toán").length}
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
              Hiển thị {currentRecords.length} / {filteredHistory.length} mục
            </span>
          </div>
        </div>
      </div>

      {/* Bảng lịch sử thanh toán */}
      <div className="bg-[#1e293b] rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#0f172a] text-gray-300 text-left">
              <tr>
                <th className="p-3 font-semibold">ID</th>
                <th className="p-3 font-semibold">Khách hàng</th>
                <th className="p-3 font-semibold">Dịch vụ</th>
                <th className="p-3 font-semibold">Ngày giờ</th>
                <th className="p-3 font-semibold">Số tiền</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {currentRecords.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`border-t border-gray-700 hover:bg-[#0f172a]/50 transition ${
                    index % 2 === 0 ? "bg-[#1e293b]/50" : "bg-[#1e293b]"
                  }`}
                >
                  <td className="p-3 font-medium">#{payment.id}</td>
                  <td className="p-3">
                    <div className="font-medium">{payment.name}</div>
                    <div className="text-xs text-gray-400">{payment.phone}</div>
                  </td>
                  <td className="p-3">{payment.service}</td>
                  <td className="p-3">
                    <div className="font-medium">
                      {payment.dateTime.split(" ")[0]}
                    </div>
                    <div className="text-xs text-gray-400">
                      {payment.dateTime.split(" ")[1]}
                    </div>
                  </td>
                  <td className="p-3 font-medium">{formatCurrency(payment.amount)}</td>
                  <td className="p-3">
                    {editingId === payment.id ? (
                      <div className="flex items-center space-x-2">
                        <select
                          value={editingStatus}
                          onChange={(e) => setEditingStatus(e.target.value)}
                          className="bg-[#0f172a] border border-gray-600 rounded text-white py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        >
                          {statusOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => saveEditStatus(payment.id)}
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
                            payment.status
                          )}`}
                        >
                          {payment.status}
                        </span>
                        <button
                          onClick={() => startEditStatus(payment)}
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
                    colSpan="7"
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

export default StaffHistory; 