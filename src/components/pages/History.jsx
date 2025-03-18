import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HistoryBanner from "../images/HistoryImg/history-banner.jpg";

const History = () => {
  const navigate = useNavigate();

  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "/login"; 
    return null;
  }

  const [activeTable, setActiveTable] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [cancelConfirmIndex, setCancelConfirmIndex] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [previousServices, setPreviousServices] = useState([]);
  const itemsPerPage = 3;

  useEffect(() => {
    // Giả định API sẽ được gắn vào đây
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await fetch("API_URL_UPCOMING");
        const data = await response.json();
        setUpcomingAppointments(data);
      } catch (error) {
        console.error("Lỗi khi lấy lịch hẹn sắp tới:", error);
      }
    };

    const fetchPreviousServices = async () => {
      try {
        const response = await fetch("API_URL_PREVIOUS");
        const data = await response.json();
        setPreviousServices(data);
      } catch (error) {
        console.error("Lỗi khi lấy dịch vụ trước đó:", error);
      }
    };

    fetchUpcomingAppointments();
    fetchPreviousServices();
  }, []);

  const getCurrentItems = () => {
    let data = activeTable === "upcoming" ? upcomingAppointments : previousServices;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = () => {
    let data = activeTable === "upcoming" ? upcomingAppointments : previousServices;
    return Math.ceil(data.length / itemsPerPage);
  };

  const handleCancelAppointment = async (id) => {
    try {
      await fetch(`API_URL_CANCEL/${id}`, { method: "DELETE" });
      alert("Đã hủy lịch hẹn thành công!");
      setUpcomingAppointments(upcomingAppointments.filter(item => item.id !== id));
    } catch (error) {
      console.error("Lỗi khi hủy lịch hẹn:", error);
    }
    setCancelConfirmIndex(null);
  };

  const handleUpdateClick = (item) => {
    navigate("/booking", { state: { appointment: item } });
  };

  const handleReviewClick = () => {
    navigate("/rate-service");
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
                      {item.status === "ĐÃ ĐẶT LỊCH" && (
                        <button className="cancel-btn" onClick={() => handleCancelAppointment(item.id)}>
                          Hủy
                        </button>
                      )}
                    </td>
                    <td>{item.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTable === "previous" && (
          <div className="history-table">
            <h3 className="table-header">DỊCH VỤ TRƯỚC ĐÓ</h3>
            <table>
              <thead>
                <tr>
                  <th>NGÀY</th>
                  <th>GIỜ</th>
                  <th>DỊCH VỤ</th>
                  <th>NGƯỜI PHỤ TRÁCH</th>
                  <th>ĐÁNH GIÁ</th>
                  <th>PHẢN HỒI</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentItems().map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.service}</td>
                    <td>{item.staff}</td>
                    <td>
                      {item.rating ? "⭐".repeat(item.rating) : (
                        <button className="review-btn" onClick={handleReviewClick}>Đánh giá ngay</button>
                      )}
                    </td>
                    <td>{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
