import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HistoryBanner from "../images/HistoryImg/history-banner.jpg";
import {
  getAllAppointments,
  getMyHistoricalAppointments,
  getMyUpcomingAppointments,
} from "../service/appointmentApi";

const History = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("access_token") &&
      !localStorage.getItem("user")
    ) {
      window.location.href = "/login";
      return null;
    }
  }, []);

  const [activeTable, setActiveTable] = useState("upcoming");
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
        const response = await getMyUpcomingAppointments();
        setUpcomingAppointments(response.result || []);
        console.log(response.result);
      } catch (error) {
        console.error("Lỗi khi lấy lịch hẹn sắp tới:", error);
      }
    };

    const fetchPreviousServices = async () => {
      try {
        const response = await getMyHistoricalAppointments();
        setPreviousServices(response.result || []);
        console.log(response.result);
      } catch (error) {
        console.error("Lỗi khi lấy dịch vụ trước đó:", error);
      }
    };
    fetchUpcomingAppointments();
    fetchPreviousServices();
  }, []);

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

  const handleCancelAppointment = async (id) => {
    try {
      await fetch(`API_URL_CANCEL/${id}`, { method: "DELETE" });
      alert("Đã hủy lịch hẹn thành công!");
      setUpcomingAppointments(
        upcomingAppointments.filter((item) => item.id !== id)
      );
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
                {upcomingAppointments.length > 0 &&
                  upcomingAppointments.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.service.name}</td>
                      <td>{item.therapist.fullname}</td>
                      <td>{item.price}</td>
                      <td>{item.depositAmount}</td>
                      <td>{item.paymentMethod || "VNPAY"}</td>
                      <td>{item.price - item.depositAmount}</td>
                      <td>
                        {(item.appointmentStatus === "PENDING" ||
                          item.appointmentStatus === "APPROVED") && (
                            <>
                            <div style={{textAlign: "center"}}>Đã đặt lịch</div>
                          <button
                            className="cancel-btn"
                            onClick={() => handleCancelAppointment(item.id)}
                          >
                            Hủy
                          </button>
                          <button
                            className="settime-btn"
                            onClick={() => handleCancelAppointment(item.id)}
                          >
                            Dời lịch
                          </button>
                          </>
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
                  <th>GHI CHÚ</th>
                </tr>
              </thead>
              <tbody>
                {previousServices.length > 0 &&
                  previousServices.map((item, index) => (
                    <tr key={index}>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>{item.service.name}</td>
                      <td>{item.therapist.fullname}</td>
                      <td>
                        {item.rating ? (
                          "⭐".repeat(item.rating)
                        ) : (
                          <button
                            className="review-btn"
                            onClick={handleReviewClick}
                          >
                            Đánh giá ngay
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
      </div>
      <Footer />
    </>
  );
};

export default History;
