import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import bannerserImg from "../images/SevivceImg/BannerServices.jpg";
import Tech1Img from "../images/SevivceImg/tech1.jpg";
import Tech2Img from "../images/SevivceImg/tech2.jpg";
import Tech3Img from "../images/SevivceImg/tech3.png";
import Tech4Img from "../images/SevivceImg/tech4.jpg";
import Navbar from "./Navbar";
import "../../App.css";
import { getAllServices } from "../service/serviceApi";
import { getAllServiceCategories } from "../service/serviceCategoryApi";
import ServicesCarousel from "../Carousle";
import { motion } from "framer-motion";

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [technologies, setTechnologies] = useState([
    {
      title: "CÔNG NGHỆ HYDRAFACIAL",
      description:
        "Thanh lọc sâu, giảm mụn, kiểm dầu. Sạch thoáng làn da, sạch mát tinh thần",
      image: Tech1Img,
      color: "#F3E9DC",
    },
    {
      title: "ÁNH SÁNG SINH HỌC BIO LED",
      description:
        "Làm dịu, giảm viêm, mờ thâm. Phục hồi vẻ tươi sáng cho làn da",
      image: Tech2Img,
      color: "#E2D6C5",
    },
    {
      title: "CÔNG NGHỆ HIGH PRESSURE MESO THERAPY",
      description:
        "Dịu lành, an toàn, không đau. Không kim, không xâm lấn, không cần nghỉ dưỡng",
      image: Tech3Img,
      color: "#D0C3AE",
    },
    {
      title: "CÔNG NGHỆ RADIO FREQUENCY LIFTING & EMS",
      description:
        "Săn chắc da, chống lão hóa. Tăng sinh collagen, tăng độ đàn hồi. Giảm nhăn, giảm quần thâm mắt",
      image: Tech4Img,
      color: "#BEB197",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await getAllServices();
        const categoriesResponse = await getAllServiceCategories();
        
        setServices(servicesResponse.result);
        setCategories(categoriesResponse.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < technologies.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleCategory = (index) => {
    setSelectedCategory(selectedCategory === index ? null : index);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex justify-center items-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Đã xảy ra lỗi: {error}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-20 bg-[#f5f0e8]">
        {/* Banner Section */}
        <section className="relative w-full h-[50vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={bannerserImg}
              alt="Banner Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wider mb-4">
              Dịch Vụ Của Chúng Tôi
            </h1>
            <p className="text-white/90 text-base md:text-xl max-w-2xl">
              Khám phá các dịch vụ chăm sóc da cao cấp được thiết kế riêng để mang lại trải nghiệm thư giãn và làn da khỏe mạnh
            </p>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Danh Mục Dịch Vụ</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp các dịch vụ chăm sóc spa cao cấp được thiết kế để làm đẹp và trẻ hóa làn da của bạn
            </p>
          </motion.div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-16">
            {categories.length > 0 && categories.map((category, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="mb-4"
              >
                <div
                  onClick={() => toggleCategory(category.id)}
                  className={`cursor-pointer transition-all duration-300 p-4 ${
                    selectedCategory === category.id 
                      ? "bg-teal-700 text-white" 
                      : "bg-teal-50 hover:bg-teal-100 text-teal-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <svg 
                      className={`w-6 h-6 transition-transform duration-300 ${selectedCategory === category.id ? "rotate-180" : ""}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {services
                        .filter((service) => service.category?.id === category.id)
                        .map((service, idx) => (
                          <div
                            key={`${category.id}-${service.id}`}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            <div className="relative h-48 overflow-hidden">
                              {service.thumbnail ? (
                                <img
                                  src={service.thumbnail}
                                  alt={service.name}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                              ) : (
                                <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                                  <span className="text-teal-700">Chưa có hình ảnh</span>
                                </div>
                              )}
                            </div>
                            <div className="p-4">
                              <h4 className="text-lg font-semibold text-teal-800 mb-2">{service.name}</h4>
                              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                              <div className="flex justify-between items-center">
                                <span className="text-teal-700 font-bold">{service.price} VND</span>
                                <button className="bg-teal-600 hover:bg-teal-700 text-white py-1 px-3 rounded-full text-sm transition duration-300">
                                  Đặt lịch
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 bg-[#f0e6d8]">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Công Nghệ Spa Hiện Đại</h2>
              <div className="w-20 h-1 bg-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chúng tôi sử dụng những công nghệ tiên tiến nhất để mang lại kết quả tốt nhất cho khách hàng
              </p>
            </motion.div>

            <div className="relative">
              <div className="flex justify-center items-center">
                <button
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="absolute left-0 z-10 bg-white/80 hover:bg-white text-teal-700 w-10 h-10 rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-10">
                  {technologies
                    .slice(currentIndex, currentIndex + itemsPerPage)
                    .map((tech, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="relative bg-white rounded-lg shadow-lg overflow-hidden"
                        style={{ backgroundColor: tech.color }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full p-1 shadow-lg overflow-hidden border-4 border-teal-50">
                          <img 
                            src={tech.image} 
                            alt={tech.title} 
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="pt-14 p-6">
                          <h3 className="text-center text-teal-800 font-bold mb-3 text-base">{tech.title}</h3>
                          <p className="text-center text-gray-600 text-sm">{tech.description}</p>
                          <div className="mt-4 text-center">
                            <button className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-full text-sm transition duration-300">
                              Tìm hiểu thêm
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  disabled={currentIndex + itemsPerPage >= technologies.length}
                  className="absolute right-0 z-10 bg-white/80 hover:bg-white text-teal-700 w-10 h-10 rounded-full flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="flex justify-center mt-8">
                {technologies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${
                      i >= currentIndex && i < currentIndex + itemsPerPage 
                        ? "bg-teal-600" 
                        : "bg-teal-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Carousel */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Khám Phá Thêm</h2>
              <div className="w-20 h-1 bg-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Đa dạng dịch vụ spa để bạn có thể lựa chọn trải nghiệm phù hợp nhất
              </p>
            </motion.div>
            
            <div className="service-carousel-container">
              <ServicesCarousel />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-teal-700 text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn Sàng Để Trải Nghiệm?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Đặt lịch ngay hôm nay để có trải nghiệm spa tuyệt vời và nhận ưu đãi đặc biệt cho lần đầu trải nghiệm
              </p>
              <button className="bg-white text-teal-700 hover:bg-teal-50 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
                Đặt Lịch Ngay
              </button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default ServicesTable;
