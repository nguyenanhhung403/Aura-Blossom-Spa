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
      className="py-20 px-4"
      style={{ backgroundColor: "rgb(142, 163, 150)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
            Dịch vụ của chúng tôi
            <span className="block h-1 w-24 bg-white mx-auto mt-2"></span>
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto mt-6 text-lg">
            Mang trong mình sứ mệnh tôn vinh vẻ đẹp tự nhiên, Aura Blossom Spa
            cung cấp các liệu trình chăm sóc da và trị liệu toàn diện.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.length > 0 &&
            services.slice(0, 4).map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={service.thumbnail}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <span className="text-white text-sm font-medium px-4 py-2">Xem chi tiết</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#446E6A] mb-3 group-hover:text-[#2A4C48] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description.substring(0, 120)}...
                  </p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={handleServiceClick}
            className="px-8 py-3 bg-white text-[#2F4F4F] border-2 border-[#2F4F4F] font-semibold rounded-full mr-5 hover:bg-[#2F4F4F] hover:text-white transition-colors duration-300"
          >
            Xem bảng giá
          </button>
          <button
            onClick={handleBookingClick}
            className="px-8 py-3 bg-[#446E6A] text-white font-semibold rounded-full hover:bg-[#2F4F4F] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Đặt lịch ngay
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
