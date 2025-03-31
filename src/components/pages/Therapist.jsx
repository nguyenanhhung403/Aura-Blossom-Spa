import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TherapistBanner from "../images/TherapistImg/TherapistBanner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import { getAllTherapists } from "../service/therapistsApi";
import "../../App.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaUserMd, FaStar, FaClock, FaQuoteLeft, FaChevronDown } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { BiClinic } from "react-icons/bi";
import ContactUs from "./ContactUs";
import { useNavigate } from "react-router-dom";

const placeholderImageUrl = "https://via.placeholder.com/400?text=Aura+Blossom+Spa";

const Therapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [expandedBio, setExpandedBio] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await getAllTherapists();
        if (response.result) {
          setTherapists(response.result);
          if (response.result.length > 0) {
            setSelectedTherapist(response.result[0]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải danh sách chuyên viên");
        setLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const handleBookAppointment = (therapist) => {
    navigate('/booking', {
      state: {
        therapistId: therapist.id,
        therapistName: therapist.fullname
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-50 pt-32 md:pt-36">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-green-300 to-lime-300 mt-2">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10"></div>
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto text-green-900"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">Đội Ngũ Chuyên Viên</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Khám phá đội ngũ chuyên viên tài năng của chúng tôi - nơi kết hợp giữa chuyên môn, 
                kinh nghiệm và sự tận tâm để mang đến trải nghiệm spa đẳng cấp nhất.
              </p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="animate-bounce mt-12"
              >
                <FaChevronDown className="mx-auto text-2xl text-green-700" />
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-8 md:px-16 py-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-green-700 font-medium">Đang tải thông tin chuyên viên...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-50 rounded-xl shadow-sm">
              <div className="text-red-500 text-5xl mb-4">⚠️</div>
              <h3 className="text-xl text-red-600 font-semibold mb-2">{error}</h3>
              <p className="text-red-500">Vui lòng thử lại sau</p>
            </div>
          ) : therapists.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl shadow-sm">
              <div className="text-gray-400 text-5xl mb-4">🔍</div>
              <h3 className="text-xl text-gray-600 font-semibold">Không có dữ liệu chuyên viên</h3>
            </div>
          ) : (
            <div className="therapist-content">
              {/* Featured Therapist */}
              {selectedTherapist && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="mb-20"
                >
                  <div className="flex flex-col md:flex-row gap-8 bg-white rounded-3xl overflow-hidden p-6 shadow-lg">
                    <div className="md:w-1/3 relative">
                      <div className="relative z-10">
                        <div className="rounded-2xl overflow-hidden shadow-xl h-[350px] relative">
                          <img 
                            src={selectedTherapist.image || placeholderImageUrl}
                            alt={selectedTherapist.fullname}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = placeholderImageUrl;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 w-full p-4">
                            <div className="flex items-center gap-2 text-white">
                              <div className="bg-green-500 p-1.5 rounded-full">
                                <FaStar className="text-white" />
                              </div>
                              <span className="font-medium">{selectedTherapist.experience} năm kinh nghiệm</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white rounded-2xl shadow-lg py-3 px-4 mt-3">
                          <h2 className="text-xl font-bold text-green-700">{selectedTherapist.fullname}</h2>
                          <p className="text-green-600 font-medium text-sm">Chuyên viên cao cấp</p>
                        </div>
                      </div>
                      
                      <div className="absolute top-0 right-1/2 w-[250px] h-[250px] bg-green-100 rounded-full blur-3xl -z-10 opacity-40"></div>
                    </div>
                    
                    <div className="md:w-2/3 flex flex-col">
                      <div className="mb-6 bg-green-50 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                          <FaQuoteLeft className="text-green-400 mr-3" /> Giới thiệu
                        </h3>
                        <div className={`text-gray-600 text-sm relative ${!expandedBio && 'max-h-20 overflow-hidden'}`}>
                          <p>{selectedTherapist.description || "Chưa có mô tả"}</p>
                          {!expandedBio && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-green-50 to-transparent"></div>
                          )}
                        </div>
                        {selectedTherapist.description && selectedTherapist.description.length > 100 && (
                          <button 
                            onClick={() => setExpandedBio(!expandedBio)}
                            className="text-green-600 font-medium mt-2 text-xs hover:underline flex items-center"
                          >
                            {expandedBio ? 'Thu gọn' : 'Xem thêm'} 
                            <FaChevronDown className={`ml-1 transition-transform ${expandedBio ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        <div className="bg-white border border-green-100 rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                          <div className="bg-lime-100 p-2.5 rounded-full">
                            <BiClinic className="text-lime-600 text-lg" />
                          </div>
                          <div>
                            <h4 className="text-gray-500 text-xs">Chuyên ngành</h4>
                            <p className="font-medium text-gray-900 text-sm">Massage trị liệu</p>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-green-100 rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                          <div className="bg-green-100 p-2.5 rounded-full">
                            <TbCertificate className="text-green-600 text-lg" />
                          </div>
                          <div>
                            <h4 className="text-gray-500 text-xs">Chứng chỉ</h4>
                            <p className="font-medium text-gray-900 text-sm">Chuyên viên Spa cao cấp</p>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-green-100 rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                          <div className="bg-lime-100 p-2.5 rounded-full">
                            <FaEnvelope className="text-lime-600 text-lg" />
                          </div>
                          <div>
                            <h4 className="text-gray-500 text-xs">Email</h4>
                            <p className="font-medium text-gray-900 text-sm truncate">{selectedTherapist.email}</p>
                          </div>
                        </div>
                        
                        <div className="bg-white border border-green-100 rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                          <div className="bg-green-100 p-2.5 rounded-full">
                            <FaPhone className="text-green-600 text-lg" />
                          </div>
                          <div>
                            <h4 className="text-gray-500 text-xs">Điện thoại</h4>
                            <p className="font-medium text-gray-900 text-sm">{selectedTherapist.phone}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto">
                        <button 
                          className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center"
                          onClick={() => handleBookAppointment(selectedTherapist)}
                        >
                          <FaClock className="mr-2" /> Đặt lịch với {selectedTherapist.fullname}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Team Grid */}
              <div className="mt-16">
                <div className="text-center mb-12">
                  <div className="inline-block bg-gradient-to-r from-green-400/30 to-lime-400/30 backdrop-blur-sm px-4 py-1.5 rounded-lg text-sm font-medium text-green-800 mb-4 border border-white/20 shadow-sm">
                    ✦ Chuyên Viên Cao Cấp ✦
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-lime-500 mb-3">
                    Đội Ngũ Chuyên Nghiệp
                  </h2>
                  <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Trải nghiệm dịch vụ đẳng cấp cùng đội ngũ chuyên viên tận tâm và giàu kinh nghiệm của chúng tôi
                  </p>
                </div>
                
                {/* Glassmorphism Background */}
                <div className="relative overflow-hidden rounded-3xl p-1 mb-24">
                  {/* Background Elements */}
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                  <div className="absolute top-0 -right-20 w-64 h-64 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                  <div className="absolute -bottom-20 left-20 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                  
                  {/* Glass container */}
                  <div className="relative backdrop-blur-sm bg-white/30 rounded-3xl border border-white/20 shadow-xl p-8 md:p-12 overflow-hidden">
                    {/* Hexagon Pattern */}
                    <div className="absolute inset-0 -z-10 opacity-5">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(5)">
                            <path d="M25 0 L50 0 L62.5 21.7 L50 43.4 L25 43.4 L12.5 21.7 Z" fill="none" stroke="currentColor" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#hexagons)" />
                      </svg>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex flex-col items-center">
                      <div className="w-full max-w-7xl">
                        <div className="relative">
                          <div className="flex flex-wrap justify-center">
                            {therapists.map((therapist, index) => (
                              <motion.div
                                key={therapist.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 md:p-4`}
                              >
                                <div
                                  className={`relative h-full group cursor-pointer backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 ${
                                    selectedTherapist?.id === therapist.id
                                      ? "border-2 border-green-400 shadow-lg shadow-green-200/50"
                                      : "border border-white/40 hover:border-green-300 shadow-md hover:shadow-green-100/30"
                                  }`}
                                  onClick={() => {
                                    setSelectedTherapist(therapist);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                  }}
                                >
                                  {/* Card Content */}
                                  <div className="flex flex-col h-full bg-white/60">
                                    {/* Image Section */}
                                    <div className="relative pt-[90%] overflow-hidden">
                                      <img
                                        src={therapist.image || placeholderImageUrl}
                                        alt={therapist.fullname}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                          e.target.src = placeholderImageUrl;
                                        }}
                                        loading="lazy"
                                      />
                                      
                                      {/* Image Overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80"></div>
                                      
                                      {/* Badge */}
                                      {selectedTherapist?.id === therapist.id && (
                                        <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-green-200 backdrop-blur-sm">
                                          Đang xem
                                        </div>
                                      )}
                                      
                                      {/* Experience badge */}
                                      <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                                        <FaStar className="text-yellow-400 text-xs" />
                                        <span className="text-white text-xs font-medium">
                                          {therapist.experience} năm KN
                                        </span>
                                      </div>
                                      
                                      {/* Quick action buttons that appear on hover */}
                                      <div className="absolute top-4 left-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <a
                                          href={`mailto:${therapist.email}`}
                                          onClick={(e) => e.stopPropagation()}
                                          className="bg-white/20 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors border border-white/30"
                                        >
                                          <FaEnvelope className="text-white text-xs" />
                                        </a>
                                        <a
                                          href={`tel:${therapist.phone}`}
                                          onClick={(e) => e.stopPropagation()}
                                          className="bg-white/20 backdrop-blur-sm w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 transition-colors border border-white/30"
                                        >
                                          <FaPhone className="text-white text-xs" />
                                        </a>
                                      </div>
                                    </div>
                                    
                                    {/* Info Section */}
                                    <div className="relative flex-1 p-6 flex flex-col">
                                      <div>
                                        <div className="flex items-center justify-between">
                                          <h3 className="font-bold text-green-800 tracking-tight text-lg">
                                            {therapist.fullname}
                                          </h3>
                                          <div className="h-6 w-6 rounded-full flex items-center justify-center bg-green-50 border border-green-100">
                                            <TbCertificate className="text-green-500 text-sm" />
                                          </div>
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-4">
                                          {therapist.description || "Chuyên viên massage và spa với nhiều năm kinh nghiệm"}
                                        </p>
                                      </div>
                                      
                                      <div className="mt-auto">
                                        <div className="relative overflow-hidden h-[5px] rounded bg-gray-100">
                                          <div className="absolute top-0 left-0 h-full w-full rounded bg-gradient-to-r from-green-400 to-lime-400"></div>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-4">
                                          <div className="text-xs text-green-700 font-medium">
                                            Chuyên viên cao cấp
                                          </div>
                                          <button
                                            className="text-green-600 text-xs font-medium flex items-center gap-1 group-hover:underline"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setSelectedTherapist(therapist);
                                              window.scrollTo({ top: 0, behavior: "smooth" });
                                            }}
                                          >
                                            Xem chi tiết
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                            </svg>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional Call to Action */}
                <div className="text-center pb-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="inline-flex rounded-2xl overflow-hidden"
                  >
                    <button 
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-lime-500 text-white font-medium relative overflow-hidden group"
                      onClick={() => {
                        if (selectedTherapist) {
                          handleBookAppointment(selectedTherapist);
                        } else {
                          navigate('/booking');
                        }
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <FaClock className="text-white" /> 
                        Đặt Lịch Hẹn Ngay
                      </span>
                      <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-lime-500 to-green-600"></span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ContactUs />
    </>
  );
};

export default Therapist;
