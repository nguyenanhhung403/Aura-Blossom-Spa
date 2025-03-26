import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { getAllServices } from "../service/serviceApi";
import { getAllServiceCategories } from "../service/serviceCategoryApi";
import ContactUs from "./ContactUs";
import { useNavigate } from "react-router-dom";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking', { 
      state: { 
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price
      } 
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 15px 20px rgba(0,0,0,0.1)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full group"
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={service.thumbnail} 
          alt={service.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            transition: 'transform 0.7s',
            borderRadius: '0',
            maxHeight: 'none'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <span className="inline-block px-2 py-1 bg-emerald-500/80 text-white text-xs rounded-full">
              {service.category.name}
            </span>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 flex flex-col flex-grow relative" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
        <div className="absolute -top-5 left-0 right-0 text-center">
          <span className="inline-block bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {service.price} VNĐ
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 mt-4 text-center">{service.name}</h3>
        <div className="flex justify-center items-center mb-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {service.duration}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 text-center flex-grow leading-relaxed line-clamp-3">
          {service.description}
        </p>
        <button 
          onClick={handleBookingClick}
          className="mt-auto bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg 
          text-sm font-medium transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200 w-full flex items-center justify-center gap-1">
          <span>Đặt lịch ngay</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

const TechnologyCard = ({ tech }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden h-96 group shadow-xl"
    >
      <img 
        src={tech.image} 
        alt={tech.title}
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end items-center text-center p-8">
        <h3 className="text-white text-2xl mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>{tech.title}</h3>
        <p className="text-gray-200 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
          {tech.description}
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          className="mt-6 bg-white text-emerald-600 px-8 py-3 rounded-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-lg hover:shadow-xl w-3/4"
        >
          Tìm hiểu thêm
        </motion.button>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name} 
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>
      <p className="text-gray-600 italic">"{testimonial.comment}"</p>
    </motion.div>
  );
};

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await getAllServices();
        console.log('Raw services response:', servicesResponse);
        const categoriesResponse = await getAllServiceCategories();
        console.log('Raw categories response:', categoriesResponse);
        
        if (!servicesResponse.result || !categoriesResponse.result) {
          throw new Error('Data is missing from response');
        }
        setServices(servicesResponse.result);
        setCategories(categoriesResponse.result);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredServices = services
    .filter(service => selectedCategory ? service.category.id === selectedCategory : true);

  // Calculate pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-[#f8f9fb] min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[85vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Spa Banner"
              className="w-full h-full object-cover"
            />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl text-white">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-emerald-500/90 text-white text-sm uppercase tracking-wider px-4 py-1 rounded-full mb-6"
            >
              Chăm sóc sức khỏe và sắc đẹp
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Tận Hưởng Trải Nghiệm<br /> 
              <span className="text-emerald-400">Spa Đẳng Cấp</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-10 text-gray-200 leading-relaxed max-w-2xl mx-auto"
            >
              Khám phá các dịch vụ chăm sóc da và thư giãn cao cấp với công nghệ hiện đại nhất, mang đến cho bạn trải nghiệm thư giãn hoàn hảo.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <a 
                href="#services" 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-medium inline-block transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Khám Phá Dịch Vụ
              </a>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <a href="#services" className="text-white opacity-80 hover:opacity-100 transition-opacity">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
        </section>

        {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-emerald-100 text-emerald-600 text-sm uppercase tracking-wider px-4 py-1 rounded-full mb-4">Dịch vụ của chúng tôi</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Chăm Sóc Toàn Diện</h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-base leading-relaxed">
              Khám phá các dịch vụ spa cao cấp được thiết kế riêng cho nhu cầu của bạn với công nghệ tiên tiến và sản phẩm tự nhiên
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="mb-10">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-2 flex flex-wrap justify-center">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1 m-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedCategory === null 
                      ? 'bg-emerald-500 text-white shadow-sm' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Tất Cả
                </motion.button>
                
                {categories.map(category => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 m-1 rounded-lg text-xs font-medium transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'bg-emerald-500 text-white shadow-sm' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </motion.button>
                ))}
                              </div>
                            </div>
                          </div>
          
          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p>Có lỗi xảy ra: {error}</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14a7 7 0 110-14 7 7 0 010 14z" />
              </svg>
              <h3 className="text-2xl font-medium text-gray-700 mb-2">Không tìm thấy dịch vụ</h3>
              <p className="text-gray-500">Vui lòng chọn danh mục khác</p>
                    </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {currentServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
            ))}
          </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-1">
                    {/* Previous Page Button */}
                <button
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          currentPage === index + 1
                            ? 'bg-emerald-500 text-white shadow-sm font-medium'
                            : 'text-gray-700 hover:bg-emerald-100'
                        }`}
                      >
                        {index + 1}
                            </button>
                    ))}
                
                    {/* Next Page Button */}
                <button
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-emerald-100'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              </div>
              )}
            </>
          )}
          </div>
        </section>

      {loading && (
        <div className="text-center py-10">
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-500">
          <p>Có lỗi xảy ra: {error}</p>
            </div>
      )}

      {!loading && !error && filteredServices.length === 0 && (
        <div className="text-center py-10">
          <p>Không có dịch vụ nào</p>
          </div>
      )}

      <ContactUs />
      {/* <Footer /> */}
      </div>
  );
};

export default ServicesPage;