import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaFilter 
} from "react-icons/fa";
import { getAllAppointments } from "../service/appointmentApi";

const StaffAppointments = () => {
  // Các trạng thái có thể có
  const statusOptions = [
    "Đã xong dịch vụ",
    "Đang thực hiện",
    "Đã thực hiện",
  ];

  // Map API status sang trạng thái hiển thị
  const mapApiStatus = (status) => {
    switch(status) {
      case "APPROVED": return "Đã xong dịch vụ";
      case "PENDING": return "Đang thực hiện";
      case "REJECTED": return "Đã thực hiện";
      default: return "Đang thực hiện";
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
          const formattedData = data.result.map(item => ({
            id: item.id,
            name: item.fullname || "Không có tên",
            service: item.service?.name || "Không có dịch vụ",
            category: item.service?.category?.name || "",
            dateTime: `${item.date} ${item.time}`,
            staffName: item.therapist?.fullname || "Không có tên",
            docNote: item.note || "",
            status: mapApiStatus(item.appointmentStatus),
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
      a.name.toLowerCase().includes(searchTerm.toLowerCase());
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

      {/* Thanh công cụ tìm kiếm và lọc */}
      <div className="bg-[#1e293b] p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo ID, tên"
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
                <th className="p-3 font-semibold">Dịch vụ</th>
                <th className="p-3 font-semibold">Lịch hẹn</th>
                <th className="p-3 font-semibold">Chuyên viên</th>
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
                  </td>
                  <td className="p-3">
                    <div>{appointment.service}</div>
                    <div className="text-xs text-gray-400">{appointment.category}</div>
                  </td>
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
                </tr>
              ))}
              {currentRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
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