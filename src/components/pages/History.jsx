import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import HistoryBanner from "../images/HistoryImg/history-banner.jpg";

const History = () => {
  const [activeTable, setActiveTable] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const upcomingAppointments = [
    { date: "15/02/2025", service: "MASSAGE THƯ GIÃN", staff: "NV. Nguyễn Thị A", note: "" },
    { date: "01/02/2025", service: "CHĂM SÓC DA MẶT", staff: "NV. Phạm Ngọc & BS. Nguyễn Minh Anh", note: "KHÁCH DỊ ỨNG VỚI VITAMIN C" },
    { date: "20/01/2025", service: "TRIỆT LÔNG", staff: "NV. LÊ QUANG V", note: "" },
    { date: "10/01/2025", service: "TẨY TẾ BÀO CHẾT", staff: "NV. Trần Hoàng B", note: "KHÁCH CÓ DA NHẠY CẢM" },
    { date: "05/01/2025", service: "GỘI ĐẦU THƯ GIÃN", staff: "NV. Nguyễn Thanh", note: "" },
    { date: "01/01/2025", service: "XÔNG HƠI", staff: "NV. Lê Văn C", note: "KHÁCH YÊU CẦU DỊCH VỤ VIP" }
  ];

  const previousServices = [
    { date: "15/02/2025", service: "MASSAGE THƯ GIÃN", staff: "NV. Nguyễn Thị A", note: "KHÁCH HÀI LÒNG", status: "HOÀN THÀNH", rating: "⭐⭐⭐⭐⭐", feedback: "RẤT THƯ GIÃN, NHÂN VIÊN CHUYÊN NGHIỆP." },
    { date: "01/02/2025", service: "CHĂM SÓC DA MẶT", staff: "NV. Phạm Ngọc & BS. Nguyễn Minh Anh", note: "KHÁCH CẦN THĂM KHÁM THƯỜNG XUYÊN", status: "HOÀN THÀNH", rating: "⭐⭐⭐⭐⭐", feedback: "DA ĐƯỢC CẢI THIỆN SAU 3 NGÀY ĐIỀU TRỊ." },
    { date: "20/01/2025", service: "TRIỆT LÔNG", staff: "NV. LÊ QUANG V", note: "KHÁCH BÁO BẬN", status: "ĐÃ HỦY", rating: "", feedback: "" }
  ];

  const payments = [
    { service: "MASSAGE THƯ GIÃN", date: "15/02/2025", amount: "500,000 VND", method: "Chuyển khoản", balance: "0 VND", status: "Đã thanh toán" },
    { service: "CHĂM SÓC DA MẶT", date: "01/02/2025", amount: "800,000 VND", method: "Tiền mặt", balance: "300,000 VND", status: "Chưa hoàn tất" }
  ];

  const getCurrentItems = (data) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = (data) => Math.ceil(data.length / itemsPerPage);

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
              {activeTable === "upcoming" ? "LỊCH HẸN SẮP TỚI" : activeTable === "previous" ? "DỊCH VỤ TRƯỚC ĐÓ" : "THANH TOÁN"}
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
                {getCurrentItems(activeTable === "upcoming" ? upcomingAppointments : activeTable === "previous" ? previousServices : payments).map((item, index) => (
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
            {totalPages(getCurrentItems(activeTable === "upcoming" ? upcomingAppointments : activeTable === "previous" ? previousServices : payments)) > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setCurrentPage(currentPage - 1)} 
                  disabled={currentPage === 1}>
                  ❮ Trước
                </button>
                <span>Trang {currentPage} / {totalPages(getCurrentItems(activeTable === "upcoming" ? upcomingAppointments : activeTable === "previous" ? previousServices : payments))}</span>
                <button 
                  onClick={() => setCurrentPage(currentPage + 1)} 
                  disabled={currentPage === totalPages(getCurrentItems(activeTable === "upcoming" ? upcomingAppointments : activeTable === "previous" ? previousServices : payments))}>
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
