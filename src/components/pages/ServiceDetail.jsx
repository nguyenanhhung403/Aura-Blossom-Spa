import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import axios from 'axios';
import ContactUs from "./ContactUs";
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/services/withRatings/${id}`);
        if (!response.data.result) {
          throw new Error('Không tìm thấy dịch vụ');
        }
        setService(response.data.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBookingClick = () => {
    navigate('/booking', {
      state: {
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100/30">
        <Navbar />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-emerald-500 animate-spin"></div>
            <div className="h-20 w-20 rounded-full border-r-4 border-l-4 border-teal-300 animate-spin absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100/30">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center p-12 rounded-2xl bg-red-50 text-red-500 max-w-3xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Đã xảy ra lỗi</h3>
            <p>{error}</p>
            <button
              onClick={() => navigate('/services')}
              className="mt-6 px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
            >
              Quay lại trang dịch vụ
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!service) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100/30">
      <Navbar />
      
      {/* Spacer div để tạo khoảng trống đủ lớn cho navbar fixed */}
      <div className="h-36"></div>
      
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <button onClick={() => navigate('/services')} className="hover:text-emerald-600">
              Dịch vụ
            </button>
            <span>/</span>
            <span className="text-emerald-600">{service.name}</span>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Section */}
              <div className="relative h-96 lg:h-full min-h-[400px]">
                <img
                  src={service.thumbnail}
                  alt={service.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-4 py-2 bg-emerald-500/90 text-white text-sm rounded-full backdrop-blur-sm font-medium shadow-lg">
                    {service.category.name}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-2xl font-semibold text-emerald-600">{service.price.toLocaleString('vi-VN')} VNĐ</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {service.duration} phút
                  </span>
                </div>

                <div className="prose prose-emerald max-w-none mb-8">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{service.description}</p>
                </div>

                {/* Features/Benefits */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  {[
                    {
                      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                      text: "Chuyên gia kinh nghiệm"
                    },
                    {
                      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                      text: "Sản phẩm tự nhiên"
                    },
                    {
                      icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                      text: "Công nghệ hiện đại"
                    },
                    {
                      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                      text: "Tiết kiệm thời gian"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBookingClick}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-medium transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50 flex items-center justify-center gap-2 group"
                  >
                    <span>Đặt lịch ngay</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            {service.ratings && service.ratings.length > 0 && (
              <div className="border-t border-gray-100 p-8 lg:p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Đánh giá từ khách hàng</h2>
                <div className="grid gap-6">
                  {service.ratings.map((rating) => (
                    <div key={rating.id} className="bg-gray-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-800">{rating.userFullname}</h3>
                          <p className="text-sm text-gray-500">Chuyên viên: {rating.therapist}</p>
                        </div>
                        <StarRating rating={rating.stars} />
                      </div>
                      <p className="text-gray-600">{rating.feedback}</p>
                      {rating.createdAt && (
                        <p className="text-sm text-gray-400 mt-2">
                          {new Date(rating.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
            )}
          </div>
        </motion.div>
        
      </div>
      
      <ContactUs />
    </div>
    
  );
};

export default ServiceDetail; 