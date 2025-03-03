import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import imgBackground from '../images/LoginImage/AnhTemplate2.jpg';
import QR from '../images/QRBanking/QR.jpg';

const BookingProcess = () => {
  const navigate = useNavigate();

  // Quản lý bước hiện tại: 1 - Thông tin đặt lịch, 2 - Chú ý, 3 - Thanh toán
  const [currentStep, setCurrentStep] = useState(1);

  // Dữ liệu form (thông tin đặt lịch)
  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    service: "",
    staff: "",
    date: "",
    time: "",
    note: "",
  });

  // Handler khi nhập dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  // Bước 1: Khi người dùng nhấn "Tiếp tục"
  const handleGoToPayment = () => {
    if (!bookingData.fullName || !bookingData.phone) {
      alert("Vui lòng nhập đầy đủ Họ và Tên, Số điện thoại!");
      return;
    }
    setCurrentStep(2);
  };

  // Bước 2: Khi người dùng nhấn "Xác nhận"
  const handleConfirmPayment = () => {
    setCurrentStep(3);
  };

  // Bước 3: Khi người dùng nhấn "Chuyển qua trang lịch sử"
  const handleGoToHistory = () => {
    navigate("/history");
  };

  return (
    <>
      <Navbar />
      {/* Tạo khoảng trống cho navbar cố định */}
      <div className="mt-20"></div>

      {/* Hero Section */}
      <section
        className="
          relative h-64 md:h-80 flex items-center justify-center 
          bg-cover bg-center animate__animated animate__fadeInDown
          transition duration-700
        "
        style={{ backgroundImage: `url(${imgBackground})` }}
      >
        {/* Overlay mờ để làm nổi chữ */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Tiêu đề */}
        <h1
          className="
            relative text-white text-3xl md:text-5xl font-bold uppercase 
            tracking-wider 
          "
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          ĐẶT LỊCH
        </h1>
      </section>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Thanh "tab" mô phỏng 3 bước */}
        <div className="flex justify-around bg-gray-100 p-2 rounded-t-md">
          <button
            className={`
              px-4 py-2 font-semibold transition-colors duration-300 
              hover:bg-white 
              ${currentStep === 1 ? "bg-white" : "bg-transparent"}
            `}
            onClick={() => setCurrentStep(1)}
          >
            Thông tin đặt lịch
          </button>
          <button
            className={`
              px-4 py-2 font-semibold transition-colors duration-300 
              hover:bg-white
              ${currentStep === 2 ? "bg-white" : "bg-transparent"}
            `}
            onClick={() => setCurrentStep(2)}
          >
            Chú ý
          </button>
          <button
            className={`
              px-4 py-2 font-semibold transition-colors duration-300 
              hover:bg-white
              ${currentStep === 3 ? "bg-white" : "bg-transparent"}
            `}
            onClick={() => setCurrentStep(3)}
          >
            Thanh toán
          </button>
        </div>

        {/* Nội dung của từng bước */}
        <div className="border border-t-0 p-4 bg-[#FAF6F3]">
          {currentStep === 1 && (
            <div className="animate__animated animate__fadeInUp">
              {/* Bước 1: Thông tin đặt lịch */}
              <h2 className="text-2xl font-bold mb-4">Thông tin đặt lịch</h2>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium">Họ và Tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={bookingData.fullName}
                    onChange={handleInputChange}
                    className="
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                    "
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className="block font-medium">Số Điện Thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    className="
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                    "
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block font-medium">Dịch Vụ</label>
                  <select
                    name="service"
                    value={bookingData.service}
                    onChange={handleInputChange}
                    className="
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                    "
                  >
                    <option value="">Chọn dịch vụ</option>
                    <option value="Chăm sóc da cơ bản">Chăm sóc da cơ bản</option>
                    <option value="Detox da nâng cao">Detox da nâng cao</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium">Chuyên Viên</label>
                  <select
                    name="staff"
                    value={bookingData.staff}
                    onChange={handleInputChange}
                    className="
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                    "
                  >
                    <option value="">Chọn chuyên viên</option>
                    <option value="Chuyên viên A">Chuyên viên A</option>
                    <option value="Chuyên viên B">Chuyên viên B</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block font-medium">Ngày/Tháng/Năm</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      className="
                        w-full border rounded px-3 py-2 
                        focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                      "
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block font-medium">Giờ</label>
                    <input
                      type="time"
                      name="time"
                      value={bookingData.time}
                      onChange={handleInputChange}
                      className="
                        w-full border rounded px-3 py-2 
                        focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                      "
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Ghi chú</label>
                  <textarea
                    name="note"
                    value={bookingData.note}
                    onChange={handleInputChange}
                    className="
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                    "
                    placeholder="Nhập ghi chú (nếu có)"
                  />
                </div>
              </div>
              <button
                onClick={handleGoToPayment}
                className="
                  mt-6 px-6 py-2 bg-[#C8A27C] text-white font-semibold 
                  rounded hover:bg-[#AA8864] 
                  transition-transform duration-300 hover:scale-105 hover:shadow-xl
                "
              >
                Tiếp tục
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="animate__animated animate__fadeInUp">
              {/* Bước 2: Chú ý */}
              <h2 className="text-2xl font-bold mb-4">Chú ý</h2>
              <div className="bg-[#FAF1E8] p-4 rounded">
                <p className="text-red-600 font-semibold text-center">
                  ⚠ THÔNG BÁO QUAN TRỌNG VỀ ĐẶT LỊCH & CỌC TIỀN ⚠
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                  <li>
                    Để đảm bảo quyền lợi và giữ chỗ dịch vụ tốt nhất cho bạn, xin vui lòng lưu ý:
                  </li>
                  <li>1) Cọc trước 30% giá trị dịch vụ để xác nhận đặt lịch.</li>
                  <li>
                    2) Số tiền cọc sẽ được trừ trực tiếp vào tổng hóa đơn hôm sử dụng dịch vụ.
                  </li>
                  <li>3) Chính sách hủy lịch: Hủy trước 24 giờ, quý khách sẽ không bị mất cọc.</li>
                </ul>
              </div>
              <button
                onClick={handleConfirmPayment}
                className="
                  mt-6 px-6 py-2 bg-[#C8A27C] text-white font-semibold 
                  rounded hover:bg-[#AA8864] 
                  transition-transform duration-300 hover:scale-105 hover:shadow-xl
                "
              >
                Xác nhận
              </button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="animate__animated animate__fadeInUp">
              {/* Bước 3: Thanh toán (hiển thị thông tin và mã QR) */}
              <h2 className="text-2xl font-bold mb-4">Kiểm tra lại thông tin đặt lịch</h2>
              <div className="bg-[#FAF1E8] p-4 rounded space-y-3">
                <p>
                  <strong>Họ và Tên:</strong> {bookingData.fullName}
                </p>
                <p>
                  <strong>Dịch Vụ:</strong> {bookingData.service}
                </p>
                <p>
                  <strong>Thời gian:</strong> {bookingData.date} - {bookingData.time}
                </p>
                <p>
                  <strong>Số tiền :</strong> 500.000đ
                </p>
                <p>
                  <strong>Số tiền cọc (30%):</strong> 150.000đ
                </p>
                <p>
                  <strong>Còn lại thanh toán tại Spa:</strong> 350.000đ
                </p>

                <div className="flex items-center justify-center">
                  <img
                    src={QR}
                    alt="QR Code"
                    className="rounded w-40 h-40 md:w-48 md:h-48 shadow-md"
                  />
                </div>
                <p className="text-gray-700 text-center mt-2">
                  Quét mã để thanh toán cọc. Nếu không thanh toán cọc, lịch hẹn có thể bị hủy.
                </p>
              </div>
              <button
                onClick={handleGoToHistory}
                className="
                  mt-6 px-6 py-2 bg-[#C8A27C] text-white font-semibold 
                  rounded hover:bg-[#AA8864] 
                  transition-transform duration-300 hover:scale-105 hover:shadow-xl
                "
              >
                Chuyển qua trang lịch sử
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingProcess;
