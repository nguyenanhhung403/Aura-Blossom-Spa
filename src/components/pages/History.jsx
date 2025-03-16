import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HistoryBanner from "../images/HistoryImg/history-banner.jpg";

const History = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State để lưu dữ liệu từ API
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [previousServices, setPreviousServices] = useState([]);
  const [payments, setPayments] = useState([]);

  // Gọi API khi component được render hoặc khi activeTable thay đổi
  useEffect(() => {
    if (activeTable === "upcoming") {
      axios.get("https://api.example.com/upcoming-appointments")
        .then(response => setUpcomingAppointments(response.data))
        .catch(error => console.error("Error fetching upcoming appointments:", error));
    } else if (activeTable === "previous") {
      axios.get("https://api.example.com/previous-services")
        .then(response => setPreviousServices(response.data))
        .catch(error => console.error("Error fetching previous services:", error));
    } else if (activeTable === "payment") {
      axios.get("https://api.example.com/payments")
        .then(response => setPayments(response.data))
        .catch(error => console.error("Error fetching payments:", error));
    }
  }, [activeTable]);

  const getCurrentItems = () => {
    let data = [];
    if (activeTable === "upcoming") data = upcomingAppointments;
    if (activeTable === "previous") data = previousServices;
    if (activeTable === "payment") data = payments;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = () => {
    let data = [];
    if (activeTable === "upcoming") data = upcomingAppointments;
    if (activeTable === "previous") data = previousServices;
    if (activeTable === "payment") data = payments;

    return Math.ceil(data.length / itemsPerPage);
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
          <button className="history-btn" onClick={() => { setActiveTable("upcoming"); setCurrentPage(1); }}>
            LỊCH HẸN SẮP TỚI
          </button>
          <button className="history-btn" onClick={() => { setActiveTable("previous"); setCurrentPage(1); }}>
            DỊCH VỤ TRƯỚC ĐÓ
          </button>
          <button className="history-btn" onClick={() => { setActiveTable("payment"); setCurrentPage(1); }}>
            THANH TOÁN
          </button>
        </div>

        {activeTable && (
          <div className="history-table">
            <h3 className="table-header">
              {activeTable === "upcoming"
                ? "LỊCH HẸN SẮP TỚI"
                : activeTable === "previous"
                  ? "DỊCH VỤ TRƯỚC ĐÓ"
                  : "THANH TOÁN"}
            </h3>
            <table>
              <thead>
                <tr>
                  {activeTable === "payment" ? (
                    <>
                      <th>TÊN DỊCH VỤ</th>
                      <th>NGÀY THANH TOÁN</th>
                      <th>TIỀN CẦN THANH TOÁN</th>
                      <th>PHƯƠNG THỨC THANH TOÁN</th>
                      <th>SỐ TIỀN CÒN LẠI</th>
                      <th>TRẠNG THÁI</th>
                    </>
                  ) : (
                    <>
                      <th>NGÀY / GIỜ</th>
                      <th>DỊCH VỤ</th>
                      <th>NGƯỜI PHỤ TRÁCH</th>
                      <th>GHI CHÚ</th>
                      {activeTable === "previous" && (
                        <>
                          <th>TRẠNG THÁI</th>
                          <th>ĐÁNH GIÁ</th>
                          <th>PHẢN HỒI</th>
                        </>
                      )}
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, index) => (
                  <tr key={index}>
                    {activeTable === "payment" ? (
                      <>
                        <td>{item.service}</td>
                        <td>{item.date}</td>
                        <td>{item.amount}</td>
                        <td>{item.method}</td>
                        <td>{item.balance}</td>
                        <td>{item.status}</td>
                      </>
                    ) : (
                      <>
                        <td>{item.date}</td>
                        <td>{item.service}</td>
                        <td>{item.staff}</td>
                        <td>{item.note}</td>
                        {activeTable === "previous" && (
                          <>
                            <td>{item.status}</td>
                            <td>{item.rating}</td>
                            <td>{item.feedback}</td>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
