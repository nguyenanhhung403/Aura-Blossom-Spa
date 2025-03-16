import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import detox from "../../images/SevivceImg/Detox.png";
import ChuyenSau from "../../images/SevivceImg/ChuyenSau.jpg";
import Body from "../../images/SevivceImg/Body.png";
import TrietLong from "../../images/SevivceImg/TrietLong.jpg";
import { getAllServices } from "../../service/serviceApi";

const ServicesSection = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const handleBookingClick = () => {
    navigate("/booking");
  };

  const handleServiceClick = () => {
    navigate("/services");
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.result);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="py-16 px-4 animate__animated animate__fadeInUp animate__delay-0.5s text-center"
      style={{ backgroundColor: "rgb(142, 163, 150)" }}
    >
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-4">
          Dịch vụ của chúng tôi
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Mang trong mình sứ mệnh tôn vinh vẻ đẹp tự nhiên, Aura Blossom Spa
          cung cấp các liệu trình chăm sóc da và trị liệu toàn diện.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {services.length > 0 &&
          services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow hover:shadow-xl transition animate__animated animate__zoomIn"
            >
              <img
                src={service.thumbnail}
                alt="Detox Lăn Da"
                className="rounded mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold text-[#446E6A] mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600">
                {service.description.substring(0, 100)}...
              </p>
            </div>
          ))}
      </div>
      <button
      onClick={handleServiceClick}
      className="mt-4 px-5 py-2 bg-white text-[#2F4F4F] border border-[#2F4F4F] font-semibold rounded-full mr-4 hover:bg-[#2F4F4F] hover:text-white transition">
        Bảng giá
      </button>
      <button
        className="px-5 py-2 bg-white text-[#2F4F4F] border border-[#2F4F4F] font-semibold rounded-full hover:bg-[#2F4F4F] hover:text-white transition"
        onClick={handleBookingClick}
      >
        Đặt lịch
      </button>
    </section>
  );
};

export default ServicesSection;
