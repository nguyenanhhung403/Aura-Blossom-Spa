import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-300"}`} 
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

  const handleDetailClick = () => {
    navigate(`/service-detail/${service.id}`);
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg flex flex-col h-full group hover:shadow-xl hover:shadow-emerald-100/40"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={service.thumbnail} 
          alt={service.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <span className="inline-block px-3 py-1 bg-emerald-500/90 text-white text-xs rounded-full backdrop-blur-sm font-medium shadow-lg">
            {service.category.name}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"/>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-col items-center text-center mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
          <span className="text-emerald-600 font-semibold">{service.price.toLocaleString('vi-VN')} VNĐ</span>
        </div>
        
        <div className="flex items-center justify-center mb-3 gap-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.duration}
          </span>
          <StarRating rating={4} />
        </div>
        
        <p className="text-gray-600 text-sm mb-5 text-center flex-grow leading-relaxed line-clamp-3">
          {service.description}
        </p>
        
        <div className="mt-auto flex gap-2">
          <button 
            onClick={handleDetailClick}
            className="flex-1 bg-white border-2 border-emerald-500 text-emerald-500 px-4 py-2 rounded-lg font-medium transform transition-all duration-300 hover:bg-emerald-50 flex items-center justify-center gap-2 group"
          >
            <span>Chi tiết</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          
          <button 
            onClick={handleBookingClick}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-200/50 flex items-center justify-center gap-2 group"
          >
            <span>Đặt lịch</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
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
  const [searchQuery, setSearchQuery] = useState("");
  const servicesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await getAllServices();
        const categoriesResponse = await getAllServiceCategories();
        
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

  // Reset to first page when category or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredServices = services
    .filter(service => selectedCategory ? service.category.id === selectedCategory : true)
    .filter(service => service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      service.description.toLowerCase().includes(searchQuery.toLowerCase()));

  // Calculate pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-teal-50 to-teal-100/30 min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Spa Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="max-w-2xl text-white text-center">
            <motion.span 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-emerald-500/90 text-white text-sm uppercase tracking-wider px-6 py-2 rounded-full mb-8 backdrop-blur-sm"
            >
              Tận hưởng khoảnh khắc thư giãn
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-8 leading-tight"
            >
              Trải Nghiệm<br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Spa Đẳng Cấp</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-10 text-gray-200 leading-relaxed mx-auto"
            >
              Khám phá các dịch vụ chăm sóc da và thư giãn cao cấp với công nghệ hiện đại, mang đến cho bạn khoảnh khắc thư giãn hoàn hảo.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <a 
                href="#services" 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-2 transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/30 hover:translate-y-[-2px]"
              >
                Khám Phá Dịch Vụ
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-emerald-100 text-emerald-600 text-sm uppercase tracking-wider px-4 py-1 rounded-full mb-4">Dịch vụ của chúng tôi</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Chăm Sóc <span className="text-emerald-500">Toàn Diện</span>
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Khám phá các dịch vụ spa cao cấp được thiết kế riêng cho nhu cầu của bạn với công nghệ tiên tiến và sản phẩm tự nhiên
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <div className="mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {/* Search */}
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Tìm kiếm dịch vụ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    />
                  </div>
                </div>
                
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === null 
                        ? 'bg-emerald-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tất Cả
                  </motion.button>
                  
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id 
                          ? 'bg-emerald-500 text-white shadow-md' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-t-4 border-b-4 border-emerald-500 animate-spin"></div>
                <div className="h-20 w-20 rounded-full border-r-4 border-l-4 border-teal-300 animate-spin absolute top-0 left-0" style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center p-12 rounded-2xl bg-red-50 text-red-500 max-w-3xl mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Đã xảy ra lỗi</h3>
              <p>{error}</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-16 max-w-3xl mx-auto">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png" 
                alt="No results" 
                className="w-32 h-32 mx-auto mb-6 opacity-50"
              />
              <h3 className="text-2xl font-medium text-gray-700 mb-3">Không tìm thấy dịch vụ</h3>
              <p className="text-gray-500 mb-8">Không có dịch vụ nào phù hợp với tìm kiếm của bạn</p>
              <button 
                onClick={() => {setSelectedCategory(null); setSearchQuery("");}}
                className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors"
              >
                Xem tất cả dịch vụ
              </button>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedCategory + searchQuery + currentPage}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {currentServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </motion.div>
              </AnimatePresence>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-16">
                  <div className="flex items-center bg-white shadow-md rounded-full overflow-hidden">
                    {/* Previous Page Button */}
                    <button
                      onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-3 transition-colors duration-300 ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, index) => {
                      // Show limited page numbers with ellipsis for better UX
                      if (
                        index === 0 ||
                        index === totalPages - 1 ||
                        (index >= currentPage - 2 && index <= currentPage + 2)
                      ) {
                        return (
                          <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`w-10 h-10 flex items-center justify-center transition-all duration-300 ${
                              currentPage === index + 1
                                ? 'bg-emerald-500 text-white font-medium'
                                : 'text-gray-700 hover:bg-emerald-50'
                            }`}
                          >
                            {index + 1}
                          </button>
                        );
                      } else if (
                        (index === currentPage - 3 && currentPage > 3) ||
                        (index === currentPage + 3 && currentPage < totalPages - 3)
                      ) {
                        return (
                          <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                    
                    {/* Next Page Button */}
                    <button
                      onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-3 transition-colors duration-300 ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-emerald-50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Benefit Section */}
      <section className="py-20 bg-gradient-to-b from-teal-50 to-teal-100/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block bg-emerald-100 text-emerald-600 text-sm uppercase tracking-wider px-4 py-1 rounded-full mb-4">Tại sao chọn chúng tôi</span>
            <h2 className="text-4xl font-bold mb-6 text-gray-800">Trải Nghiệm <span className="text-emerald-500">Đẳng Cấp</span></h2>
            <div className="w-20 h-1 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Chúng tôi cam kết mang đến cho bạn những dịch vụ chất lượng cao với đội ngũ chuyên gia hàng đầu
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
                title: "Công Nghệ Hiện Đại",
                description: "Ứng dụng các công nghệ spa tiên tiến nhất trên thế giới để mang lại hiệu quả tối ưu."
              },
              {
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                title: "Chuyên Gia Hàng Đầu",
                description: "Đội ngũ nhân viên được đào tạo chuyên sâu với nhiều năm kinh nghiệm trong ngành."
              },
              {
                icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
                title: "Sản Phẩm Tự Nhiên",
                description: "Chỉ sử dụng các sản phẩm có nguồn gốc tự nhiên, an toàn và thân thiện với môi trường."
              },
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Tiết Kiệm Thời Gian",
                description: "Quy trình chuyên nghiệp, hiệu quả giúp bạn tiết kiệm thời gian tối đa."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactUs />
    </div>
  );
};

export default ServicesPage;