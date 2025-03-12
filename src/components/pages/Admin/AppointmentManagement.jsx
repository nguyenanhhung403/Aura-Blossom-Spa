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

const CustomerList = () => {
  // Các trạng thái có thể có
  const statusOptions = [
    "Đã hoàn thành",
    "Đang điều trị",
    "Đã đặt lịch",
    "Chưa xác nhận"
  ];

  // Mảng khách hàng mẫu
  const [customers, setCustomers] = useState([
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
      status: "Đang điều trị",
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
      status: "Đã đặt lịch",
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
      status: "Chưa xác nhận",
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

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  
  // Quản lý chỉnh sửa trạng thái
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState("");
  
  // Lọc khách hàng
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    const matchesStatus = filterStatus === "Tất cả" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  
  // Tính toán phân trang
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCustomers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage);

  // Xóa khách hàng
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa khách hàng này?")) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };
  
  // Bắt đầu chỉnh sửa trạng thái
  const startEditStatus = (customer) => {
    setEditingId(customer.id);
    setEditingStatus(customer.status);
  };
  
  // Lưu trạng thái đã chỉnh sửa
  const saveEditStatus = (id) => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === id ? { ...cust, status: editingStatus } : cust
      )
    );
    setEditingId(null);
  };
  
  // Hủy chỉnh sửa
  const cancelEdit = () => {
    setEditingId(null);
  };

  // Đổi màu hiển thị cho từng trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Đã hoàn thành":
        return "text-green-400 bg-green-900/30";
      case "Đang điều trị":
        return "text-blue-400 bg-blue-900/30";
      case "Đã đặt lịch":
        return "text-yellow-400 bg-yellow-900/30";
      case "Chưa xác nhận":
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
          <h1 className="text-2xl font-bold text-white">Quản lý khách hàng</h1>
          {/* Đã xóa các nút Thêm khách hàng, Print, Download */}
        </div>

        {/* Thông tin tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-800 to-indigo-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Tổng khách hàng</h3>
            <p className="text-white text-2xl font-bold">{customers.length}</p>
          </div>
          <div className="bg-gradient-to-r from-green-800 to-emerald-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Đã hoàn thành</h3>
            <p className="text-white text-2xl font-bold">
              {customers.filter((c) => c.status === "Đã hoàn thành").length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-800 to-sky-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Đang điều trị</h3>
            <p className="text-white text-2xl font-bold">
              {customers.filter((c) => c.status === "Đang điều trị").length}
            </p>
          </div>
          <div className="bg-gradient-to-r from-yellow-800 to-amber-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-gray-300 text-sm">Chờ xác nhận</h3>
            <p className="text-white text-2xl font-bold">
              {
                customers.filter(
                  (c) => c.status === "Chưa xác nhận" || c.status === "Đã đặt lịch"
                ).length
              }
            </p>
          </div>
        </div>

        {/* Thanh công cụ tìm kiếm */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Tìm theo ID, tên, SĐT"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  className="bg-gray-700 border border-gray-600 rounded-lg text-white py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="Tất cả">Tất cả trạng thái</option>
                  <option value="Đã hoàn thành">Đã hoàn thành</option>
                  <option value="Đang điều trị">Đang điều trị</option>
                  <option value="Đã đặt lịch">Đã đặt lịch</option>
                  <option value="Chưa xác nhận">Chưa xác nhận</option>
                </select>
              </div>
            </div>
            <div className="text-gray-300">
              <span>
                Hiển thị {currentRecords.length} / {filteredCustomers.length} khách hàng
              </span>
            </div>
          </div>
        </div>

        {/* Bảng khách hàng */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-700 text-gray-300 text-left">
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
                {currentRecords.map((cust, index) => (
                  <tr
                    key={cust.id}
                    className={`border-t border-gray-700 hover:bg-gray-700/50 transition ${
                      index % 2 === 0 ? "bg-gray-800/50" : "bg-gray-800"
                    }`}
                  >
                    <td className="p-3 font-medium">#{cust.id}</td>
                    <td className="p-3">
                      <div className="font-medium">{cust.name}</div>
                      <div className="text-xs text-gray-400">{cust.gender}</div>
                    </td>
                    <td className="p-3">
                      <div>{cust.phone}</div>
                      <div className="text-xs text-gray-400">{cust.email}</div>
                    </td>
                    <td className="p-3">{cust.service}</td>
                    <td className="p-3">
                      <div className="font-medium">
                        {cust.dateTime.split(" ")[0]}
                      </div>
                      <div className="text-xs text-gray-400">
                        {cust.dateTime.split(" ")[1]}
                      </div>
                    </td>
                    <td className="p-3">{cust.staffName}</td>
                    <td className="p-3">
                      {editingId === cust.id ? (
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
                            onClick={() => saveEditStatus(cust.id)}
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
                              cust.status
                            )}`}
                          >
                            {cust.status}
                          </span>
                          <button
                            onClick={() => startEditStatus(cust)}
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
                          title="Xóa khách hàng"
                          onClick={() => handleDelete(cust.id)}
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
                      Không tìm thấy khách hàng phù hợp!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Phân trang */}
          {filteredCustomers.length > 0 && (
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
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

export default CustomerList;
