import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import imgBackground from "../images/LoginImage/AnhTemplate2.jpg";
import QR from "../images/QRBanking/QR.jpg";
import ContactUs from "./ContactUs";
import { getAllTherapists } from "../service/therapistsApi";
import { getAllServices } from "../service/serviceApi";
import { getAvailableSlotsByDate, getSlotsByDateAndTherapist } from "../service/slotApi";
import { createAppointment } from "../service/appointmentApi";
import { createVnPayPayment } from "../service/paymentApi";

const BookingProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});

  // Quản lý bước hiện tại: 1 - Thông tin đặt lịch, 2 - Chú ý, 3 - Thanh toán
  const [currentStep, setCurrentStep] = useState(1);

  // Dữ liệu form (thông tin đặt lịch)
  const [bookingData, setBookingData] = useState({
    fullName: "",
    phone: "",
    serviceId: "",
    service: "",
    price: "",
    therapistId: "",
    therapist: "",
    time: "",
    date: "",
    slotId: "",
    note: "",
  });

  // State để quản lý lỗi
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [therapists, setTherapists] = useState([]);
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await getAllTherapists();
        setTherapists(response.result);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      }
    };
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.result);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    const fetchMyInfo = async () => {
      if (
        !localStorage.getItem("access_token") ||
        !localStorage.getItem("user")
      ) {
        navigate("/login");
        return;
      }
      setUser(JSON.parse(localStorage.getItem("user")));
      setBookingData((prev) => ({
        ...prev,
        fullName: JSON.parse(localStorage.getItem("user")).fullname,
        phone: JSON.parse(localStorage.getItem("user")).phone,
      }));
    };
    fetchMyInfo();
    fetchServices();
    fetchTherapists();
  }, []);

  // Xử lý khi có dữ liệu dịch vụ được truyền từ trang dịch vụ
  useEffect(() => {
    if (location.state && location.state.serviceId && services.length > 0) {
      const { serviceId, serviceName, servicePrice } = location.state;
      setBookingData(prev => ({
        ...prev,
        serviceId: serviceId.toString(),
        service: serviceName,
        price: servicePrice,
      }));
    }
  }, [location.state, services]);

  // Xử lý khi có dữ liệu therapist được truyền từ trang therapist
  useEffect(() => {
    if (location.state && location.state.therapistId && therapists.length > 0) {
      const { therapistId, therapistName } = location.state;
      setBookingData(prev => ({
        ...prev,
        therapistId: therapistId.toString(),
        therapist: therapistName,
      }));
    }
  }, [location.state, therapists]);

  useEffect(() => {
    const fetchSlots = async () => {
      if (bookingData.date && bookingData.therapistId !== "") {
        try {
          const response = await getSlotsByDateAndTherapist(
            bookingData.date,
            bookingData.therapistId
          );
          const unsortedSlots = response.result || [];
          if (unsortedSlots.length > 0) {
            unsortedSlots.sort((a, b) => {
              let timeA = new Date(`1970-01-01T${a.time}`);
              let timeB = new Date(`1970-01-01T${b.time}`);
              return timeA - timeB;
            });
          }
          setSlots(unsortedSlots);
        } catch (error) {
          console.error("Error fetching slots:", error);
          setSlots([]);
        }
      } else if (bookingData.therapistId === "") {
        try {
          const response = await getAvailableSlotsByDate(
            bookingData.date
          );
          const unsortedSlots = response.result || [];
          if (unsortedSlots.length > 0) {
            unsortedSlots.sort((a, b) => {
              let timeA = new Date(`1970-01-01T${a.time}`);
              let timeB = new Date(`1970-01-01T${b.time}`);
              return timeA - timeB;
            });
          }
          setSlots(unsortedSlots);
        } catch (error) {
          console.error("Error fetching slots:", error);
          setSlots([]);
        }
      }else{
        setSlots([]);
      }
    };
    fetchSlots();
  }, [bookingData.date, bookingData.therapistId]);

  // Quản lý phương thức thanh toán: "qr" hoặc "counter"
  const [paymentMethod, setPaymentMethod] = useState("qr");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      // Kiểm tra nếu ngày được chọn là ngày trong quá khứ
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time về 00:00:00

      if (selectedDate < today) {
        alert('Không thể chọn ngày trong quá khứ');
        return;
      }
    }

    // Xóa lỗi của trường đang nhập khi người dùng thay đổi giá trị
    setFormErrors({
      ...formErrors,
      [name]: undefined
    });

    if (name === "serviceId") {
      const selectedService = services.find((service) => service.id == value);
      setBookingData((prev) => ({
        ...prev,
        [name]: value,
        service: selectedService ? selectedService.name : "",
        price: selectedService ? selectedService.price : "",
      }));
    } else if (name === "therapistId") {
      const selectedTherapist = therapists.find(
        (therapist) => therapist.id == value
      );
      setBookingData((prev) => ({
        ...prev,
        [name]: value,
        therapist: selectedTherapist ? selectedTherapist.fullname : "",
      }));
    } else {
      setBookingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectSlot = (slotId) => {
    const selectedSlot = slots.find((slot) => slot.id === slotId);
    if (selectedSlot?.therapists[0].status === "AVAILABLE") {
      setBookingData((prev) => ({
        ...prev,
        slotId: slotId,
        time: selectedSlot.time || "",
      }));
      
      // Xóa lỗi của trường khung giờ
      setFormErrors({
        ...formErrors,
        slotId: undefined
      });
    } else {
      console.warn("Cannot select an unavailable slot");
    }
  };

  // Hàm kiểm tra dữ liệu form
  const validateForm = () => {
    const errors = {};
    
    if (!bookingData.serviceId) {
      errors.serviceId = "Vui lòng chọn dịch vụ";
    }
    
    if (!bookingData.therapistId) {
      errors.therapistId = "Vui lòng chọn chuyên viên";
    }
    
    if (!bookingData.date) {
      errors.date = "Vui lòng chọn ngày";
    }
    
    if (!bookingData.slotId) {
      errors.slotId = "Vui lòng chọn khung giờ";
    }
    
    return errors;
  };

  // Bước 1: Khi người dùng nhấn "Tiếp tục"
  const handleGoToPayment = () => {
    const errors = validateForm();
    setFormErrors(errors);
    
    // Nếu có lỗi, hiển thị thông báo lỗi và không chuyển bước
    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }
    
    // Nếu không có lỗi, chuyển sang bước tiếp theo
    setCurrentStep(2);
  };

  // Bước 2: Khi người dùng nhấn "Xác nhận"
  const handleConfirmPayment = () => {
    setCurrentStep(3);
  };

  // Bước 3: Khi người dùng nhấn "Xác nhận thanh toán"
  const handleConfirmPaymentFinal = async () => {
    const appointmentResponse = await createAppointment(bookingData);
    const paymentRequest = {
      amount: bookingData.price * 0.3,
      appointmentId: appointmentResponse.result.id,
    };
    const paymentResponse = await createVnPayPayment(paymentRequest);
    window.location.href = paymentResponse.result.paymentUrl;
  };

  // Thêm hàm để lấy ngày hiện tại dạng YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
          style={{ fontFamily: "Roboto, sans-serif" }}
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
                    value={user.fullname}
                    disabled
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
                    value={user.phone}
                    disabled
                    onChange={handleInputChange}
                    className="
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                    "
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block font-medium">Dịch Vụ <span className="text-red-500">*</span></label>
                  <select
                    name="serviceId"
                    value={bookingData.serviceId}
                    onChange={handleInputChange}
                    className={`
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                      ${formErrors.serviceId ? 'border-red-500' : ''}
                    `}
                  >
                    <option value="">Chọn dịch vụ</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.serviceId && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.serviceId}</p>
                  )}
                </div>
                <div>
                  <label className="block font-medium">Chuyên Viên <span className="text-red-500">*</span></label>
                  <select
                    name="therapistId"
                    value={bookingData.therapistId}
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                    className={`
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                      ${formErrors.therapistId ? 'border-red-500' : ''}
                    `}
                  >
                    <option value="">Chọn chuyên viên</option>
                    {therapists.map((therapist) => (
                      <option key={therapist.id} value={therapist.id}>
                        {therapist.fullname}
                      </option>
                    ))}
                  </select>
                  {formErrors.therapistId && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.therapistId}</p>
                  )}
                </div>
                <div className="">
                  <label className="block font-medium">Ngày/Tháng/Năm <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    min={getCurrentDate()}
                    className={`
                      w-full border rounded px-3 py-2 
                      focus:outline-none focus:ring-2 focus:ring-[#C8A27C]
                      ${formErrors.date ? 'border-red-500' : ''}
                    `}
                  />
                  {formErrors.date && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                  )}
                </div>
                <div className="pb-3">
                  <label className="block font-medium">Giờ <span className="text-red-500">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {slots.length > 0 ? (
                      slots.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => handleSelectSlot(slot.id)}
                          disabled={slot.therapists[0].status === "UNAVAILABLE"}
                          className={`
                      px-4 py-3 border rounded transition-all duration-200
                      ${
                        slot.therapists[0].status === "AVAILABLE"
                          ? "bg-white text-black hover:bg-gray-200 hover:shadow-md"
                          : "bg-gray-300 text-gray-500 opacity-50 cursor-not-allowed"
                      }
                      ${
                        bookingData.slotId === slot.id
                          ? "bg-[#C8A27C] text-white border-2 border-[#A67B5B] shadow-lg"
                          : "border-gray-300"
                      }
                    `}
                        >
                          {slot.time}
                          {slot.therapists[0].status === "UNAVAILABLE" && (
                            <span className="ml-2 text-red-500">Hết chỗ</span>
                          )}
                        </button>
                      ))
                    ) : bookingData.date && bookingData.therapistId ? (
                      <p className="text-gray-500">
                        Hiện tại chưa có khung giờ phù hợp
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        Vui lòng chọn ngày và chuyên viên để xem khung giờ
                      </p>
                    )}
                  </div>
                  {formErrors.slotId && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.slotId}</p>
                  )}
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
              {/* Hiển thị thông báo lỗi nếu có */}
              {Object.keys(formErrors).length > 0 && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  <p className="font-medium">Vui lòng kiểm tra lại thông tin:</p>
                  <ul className="list-disc list-inside">
                    {Object.values(formErrors).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
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
                  ⚠ THÔNG BÁO QUAN TRỌNG VỀ ĐẶT LỊCH ⚠
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-gray-700">
                  <li>Vui lòng đảm bảo thông tin đặt lịch chính xác.</li>
                  <li>Nếu cần hỗ trợ, hãy liên hệ trực tiếp với Spa.</li>
                  <li>
                    Lưu ý: Khi thanh toán trực tiếp tại quầy, vui lòng mang theo
                    CMND hoặc giấy tờ tùy thân.
                  </li>
                  <li>
                    Một số dịch vụ có thể yêu cầu xác nhận qua điện thoại.
                  </li>
                  <li>
                    <strong>Đặt cọc 30%:</strong> Để xác nhận lịch hẹn, quý
                    khách vui lòng đặt cọc trước 30% giá trị dịch vụ.
                  </li>
                  <li>
                    Số tiền cọc sẽ được khấu trừ vào tổng hóa đơn khi quý khách
                    sử dụng dịch vụ.
                  </li>
                  <li className="text-red-500 font-semibold">
                    <strong>Lưu ý quan trọng:</strong> Trong trường hợp quý
                    khách hủy lịch, số tiền cọc sẽ không được hoàn trả.
                  </li>
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
              {/* Bước 3: Thanh toán */}
              <h2 className="text-2xl font-bold mb-4">
                Kiểm tra lại thông tin đặt lịch
              </h2>

              <div className="bg-[#FAF1E8] p-4 rounded space-y-3">
                <p>
                  <strong>Họ và Tên:</strong> {bookingData.fullName}
                </p>
                <p>
                  <strong>Số Điện Thoại:</strong> {bookingData.phone}
                </p>
                <p>
                  <strong>Dịch Vụ:</strong> {bookingData.service}
                </p>
                <p>
                  <strong>Chuyên Viên:</strong> {bookingData.therapist}
                </p>
                <p>
                  <strong>Thời gian:</strong> {bookingData.date} -{" "}
                  {bookingData.time}
                </p>
                <p>
                  <strong>Phí dịch vụ:</strong> {bookingData.price}
                </p>
                <p>
                  <strong>Số tiền cọc cần thanh toán (30%):</strong>{" "}
                  {bookingData.price * 0.3}
                </p>
                <div className="flex flex-col items-center mt-4">
                  <div className="mt-4 text-center text-gray-700">
                    <p>Vui lòng thanh toán qua VNPay để hoàn tất đặt lịch</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleConfirmPaymentFinal}
                className="
                  mt-6 px-6 py-2 bg-[#C8A27C] text-white font-semibold 
                  rounded hover:bg-[#AA8864] 
                  transition-transform duration-300 hover:scale-105 hover:shadow-xl
                "
              >
                Xác nhận thanh toán
              </button>
            </div>
          )}
        </div>
      </div>
      <ContactUs />
    </>
  );
};

export default BookingProcess;
