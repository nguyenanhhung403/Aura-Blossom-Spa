import React, { useState, useEffect } from "react";
import "../../../App.css";
import { FaFilter } from "react-icons/fa";

const TherapistAppointments = () => {
  const [search, setSearch] = useState({
    phone: "",
    service: "",
    dateTime: "",
    status: "",
  });

  const [appointmentsData, setAppointmentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số lịch hẹn mỗi trang

  // 🛠 Gọi API lấy danh sách lịch hẹn
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("https://your-api.com/appointments"); // Đổi thành API thực tế
        const data = await response.json();
        setAppointmentsData(data); // Cập nhật dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lịch hẹn:", error);
      }
    };

    fetchAppointments();
  }, []);

  const totalAppointments = appointmentsData.length;
  const completedAppointments = appointmentsData.filter((app) => app.status === "Hoàn thành").length;
  const ongoingAppointments = appointmentsData.filter((app) => app.status === "Đang diễn ra").length;
  const pendingAppointments = appointmentsData.filter((app) => app.status === "Đã hủy").length;

  const statusClass = (status) => {
    switch (status) {
      case "Hoàn thành":
        return "status completed";
      case "Đang diễn ra":
        return "status ongoing";
      case "Đã hủy":
        return "status cancelled";
      default:
        return "";
    }
  };

  const handleFilterChange = (field, value) => {
    setSearch((prev) => ({ ...prev, [field]: value }));
  };

  const removeVietnameseTones = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  // Lọc dữ liệu theo tìm kiếm
  const filteredAppointments = appointmentsData.filter((appointment) => {
    return (
      (search.phone === "" || appointment.phone.includes(search.phone)) &&
      (search.service === "" ||
        removeVietnameseTones(appointment.service.toLowerCase()).includes(removeVietnameseTones(search.service.toLowerCase()))) &&
      (search.dateTime === "" || appointment.dateTime.includes(search.dateTime)) &&
      (search.status === "" ||
        removeVietnameseTones(appointment.status.toLowerCase()).includes(removeVietnameseTones(search.status.toLowerCase())))
    );
  });

  // Tính toán số trang
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Xác định danh sách lịch hẹn của trang hiện tại
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">Lịch hẹn</h1>
      <div className="appointment-summary">
        <div className="summary-card purple">
          <p>Tổng lịch hẹn</p>
          <h2>{totalAppointments}</h2>
        </div>
        <div className="summary-card green">
          <p>Đã hoàn thành</p>
          <h2>{completedAppointments}</h2>
        </div>
        <div className="summary-card blue">
          <p>Đang diễn ra</p>
          <h2>{ongoingAppointments}</h2>
        </div>
        <div className="summary-card brown">
          <p>Đã hủy</p>
          <h2>{pendingAppointments}</h2>
        </div>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Số điện thoại"
            value={search.phone}
            onChange={(e) => handleFilterChange("phone", e.target.value)}
            className="filter-input"
          />
          <FaFilter className="filter-icon" />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Dịch vụ"
            value={search.service}
            onChange={(e) => handleFilterChange("service", e.target.value)}
            className="filter-input"
          />
          <FaFilter className="filter-icon" />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Ngày/Giờ"
            value={search.dateTime}
            onChange={(e) => handleFilterChange("dateTime", e.target.value)}
            className="filter-input"
          />
          <FaFilter className="filter-icon" />
        </div>
        <div className="filter-group">
          <input
            type="text"
            placeholder="Trạng thái"
            value={search.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="filter-input"
          />
          <FaFilter className="filter-icon" />
        </div>
      </div>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Giới tính</th>
            <th>Tên dịch vụ</th>
            <th>Ngày/Giờ</th>
            <th>Trạng thái</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAppointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.name}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.service}</td>
              <td>{appointment.dateTime}</td>
              <td>
                <span className={statusClass(appointment.status)}>
                  {appointment.status}
                </span>
              </td>
              <td>{appointment.note}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default TherapistAppointments;
