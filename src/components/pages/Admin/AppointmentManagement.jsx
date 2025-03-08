import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import Sidebar from "./SideBar";

const Appointments = () => {
  // Dữ liệu ban đầu (Read)
  const initialAppointments = [
    {
      id: 1,
      customerName: "Nguyễn Văn A",
      phoneNumber: "0123456789",
      service: "Dịch vụ A",
      staff: "Chuyên viên 1",
      dateTime: "2023-11-10 09:30",
      status: "Chờ xử lý",
    },
    {
      id: 2,
      customerName: "Trần Thị B",
      phoneNumber: "0987654321",
      service: "Dịch vụ B",
      staff: "Chuyên viên 2",
      dateTime: "2023-11-11 14:00",
      status: "Chờ xử lý",
    },
  ];

  // State quản lý danh sách lịch hẹn
  const [appointments, setAppointments] = useState(initialAppointments);

  // State cho chế độ chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  // Lưu đối tượng lịch hẹn đang chỉnh sửa (chỉ thay đổi "status")
  const [editedStatus, setEditedStatus] = useState("");
  // Lỗi cho chỉnh sửa (nếu có)
  const [editError, setEditError] = useState("");

  // State tìm kiếm (searchTerm)
  const [searchTerm, setSearchTerm] = useState("");

  // Xóa (Delete)
  const handleDeleteAppointment = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch hẹn này?")) {
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    }
  };

  // Bắt đầu chỉnh sửa (chỉ cho phép đổi status)
  const handleStartEdit = (appt) => {
    setEditingId(appt.id);
    setEditedStatus(appt.status); // Lấy status hiện tại
    setEditError("");
  };

  // Lưu thay đổi (chỉ cập nhật status)
  const handleSaveEdit = (id) => {
    if (!editedStatus.trim()) {
      setEditError("Trạng thái không được để trống");
      return;
    }
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: editedStatus } : appt
      )
    );
    setEditingId(null);
    setEditedStatus("");
    setEditError("");
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedStatus("");
    setEditError("");
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm (theo ID hoặc Tên khách hàng)
  const filteredAppointments = appointments.filter(
    (appt) =>
      appt.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      appt.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1">
        <div className="bg-gray-800 p-4 shadow-md">
          <h1 className="text-2xl font-bold text-white">Quản lý Lịch hẹn</h1>
        </div>

        {/* Thanh công cụ */}
        <div className="bg-gray-800 p-4 shadow-md flex flex-wrap items-center justify-between gap-4">
          {/* Ở đây không còn nút thêm lịch hẹn */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-5 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tìm theo ID hoặc tên khách hàng"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes className="text-gray-400 hover:text-gray-200" />
              </button>
            )}
          </div>
        </div>

        {/* Danh sách lịch hẹn */}
        <div className="m-4">
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {filteredAppointments.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4 text-lg">
                  Không có lịch hẹn nào được tìm thấy
                </div>
                {searchTerm && (
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => setSearchTerm("")}
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Tên khách hàng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Số điện thoại
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Dịch vụ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Chuyên viên
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ngày giờ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Trạng thái
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredAppointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-gray-700">
                        {editingId === appt.id ? (
                          // Editing mode (chỉ đổi status)
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs bg-gray-600 rounded-full text-gray-300">
                                {appt.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-100">
                              {appt.customerName}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.service}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.staff}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.dateTime}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              <select
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-100"
                                value={editedStatus}
                                onChange={(e) => setEditedStatus(e.target.value)}
                              >
                                <option value="Chờ xử lý">Chờ xử lý</option>
                                <option value="Đã hủy">Đã hủy</option>
                                <option value="Hoàn thành">Hoàn thành</option>
                              </select>
                              {editError && (
                                <p className="text-red-400 text-xs mt-1">
                                  {editError}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center space-x-2">
                                <button
                                  className="p-1 bg-green-600 text-white rounded-full hover:bg-green-500"
                                  onClick={() => handleSaveEdit(appt.id)}
                                  title="Lưu"
                                >
                                  <FaSave size={16} />
                                </button>
                                <button
                                  className="p-1 bg-red-600 text-white rounded-full hover:bg-red-500"
                                  onClick={handleCancelEdit}
                                  title="Hủy"
                                >
                                  <FaTimes size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          // View mode row
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs bg-gray-600 rounded-full text-gray-300">
                                {appt.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-gray-100">
                              {appt.customerName}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.phoneNumber}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.service}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.staff}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.dateTime}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {appt.status}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center space-x-2">
                                <button
                                  className="p-1 bg-blue-600 text-white rounded-full hover:bg-blue-500"
                                  onClick={() => handleStartEdit(appt)}
                                  title="Chỉnh sửa trạng thái"
                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                  className="p-1 bg-red-600 text-white rounded-full hover:bg-red-500"
                                  onClick={() => handleDeleteAppointment(appt.id)}
                                  title="Xóa"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
