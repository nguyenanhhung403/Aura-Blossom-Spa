import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HistoryBanner from "../images/HistoryImg/history-banner.jpg";

const History = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [cancelConfirmIndex, setCancelConfirmIndex] = useState(null);
  const itemsPerPage = 3;

  const upcomingAppointments = [
    {
      date: "15/02/2025",
      time: "10:00 AM",
      service: "MASSAGE THƯ GIÃN",
      staff: "NV. Nguyễn Thị A",
      price: "500,000 VND",
      deposit: "200,000 VND",
      paymentMethod: "Tiền mặt",
      remaining: "300,000 VND",
      status: "ĐÃ ĐẶT LỊCH",
      note: "",
    },
  ];

  const previousServices = [
    {
      date: "01/02/2025",
      time: "10:00 AM",
      service: "CHĂM SÓC DA MẶT",
      staff: "NV. Phạm Ngọc & BS. Nguyễn Minh Anh",
      rating: "⭐⭐⭐⭐⭐",
      feedback: "DA ĐƯỢC CẢI THIỆN SAU 3 NGÀY ĐIỀU TRỊ.",
    },
  ];

  const getCurrentItems = () => {
    let data =
      activeTable === "upcoming" ? upcomingAppointments : previousServices;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = () => {
    let data =
      activeTable === "upcoming" ? upcomingAppointments : previousServices;
    return Math.ceil(data.length / itemsPerPage);
  };

  const handleCancelAppointment = (index) => {
    alert("Đã hủy lịch hẹn thành công!");
    setCancelConfirmIndex(null); // Đóng box xác nhận
  };
  const navigate = useNavigate(); // Hook điều hướng

  const handleUpdateClick = (item) => {
    navigate("/booking", { state: { appointment: item } }); // Chuyển trang kèm dữ liệu
  };

  return (
    <>
      <Navbar />
      <div className="history-container">
        <div className="history-banner">
          <img src={HistoryBanner} alt="history-banner" />
          <h1 className="history-header">LỊCH SỬ CỦA TÔI</h1>
        </div>

        <div className="history-buttons">
          <button
            className="history-btn"
            onClick={() => {
              setActiveTable("upcoming");
              setCurrentPage(1);
            }}
          >
            LỊCH HẸN SẮP TỚI
          </button>
          <button
            className="history-btn"
            onClick={() => {
              setActiveTable("previous");
              setCurrentPage(1);
            }}
          >
            DỊCH VỤ TRƯỚC ĐÓ
          </button>
        </div>

        {activeTable === "upcoming" && (
          <div className="history-table">
            <h3 className="table-header">LỊCH HẸN SẮP TỚI</h3>
            <table>
              <thead>
                <tr>
                  <th>NGÀY</th>
                  <th>GIỜ</th>
                  <th>DỊCH VỤ</th>
                  <th>NGƯỜI PHỤ TRÁCH</th>
                  <th>GIÁ DỊCH VỤ</th>
                  <th>TIỀN ĐÃ CỌC</th>
                  <th>PHƯƠNG THỨC THANH TOÁN</th>
                  <th>TIỀN CÒN LẠI</th>
                  <th>TRẠNG THÁI</th>
                  <th>GHI CHÚ</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.service}</td>
                    <td>{item.staff}</td>
                    <td>{item.price}</td>
                    <td>{item.deposit}</td>
                    <td>{item.paymentMethod}</td>
                    <td>{item.remaining}</td>
                    <td>
                      <div className="dropdown-container">
                        <span>{item.status}</span>
                        {item.status === "ĐÃ ĐẶT LỊCH" && (
                          <>
                            <button
                              className="dropdown-btn"
                              onClick={() =>
                                setDropdownIndex(
                                  dropdownIndex === index ? null : index
                                )
                              }
                            >
                              ▼
                            </button>
                            {dropdownIndex === index && (
                              <div className="dropdown-menu">
                                <button
                                  className="cancel-btn"
                                  onClick={() => {
                                    setCancelConfirmIndex(index);
                                    setDropdownIndex(null);
                                  }}
                                >
                                  Hủy
                                </button>
                                <button
                                  className="update-btn"
                                  onClick={() => handleUpdateClick(item)}
                                >
                                  Cập nhật
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {cancelConfirmIndex === index && (
                        <div className="cancel-confirm-box">
                          <p>Bạn có chắc muốn hủy lịch hẹn?</p>
                          <button
                            className="confirm-btn"
                            onClick={() => handleCancelAppointment(index)}
                          >
                            Xác nhận
                          </button>
                          <button
                            className="cancel-btn"
                            onClick={() => setCancelConfirmIndex(null)}
                          >
                            Hủy bỏ
                          </button>
                        </div>
                      )}
                    </td>
                    <td>{item.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPages() > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ❮ Trước
            </button>
            <span>
              Trang {currentPage} / {totalPages()}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages()}
            >
              Tiếp ❯
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;