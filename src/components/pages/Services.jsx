import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { getAllServices } from "../service/serviceApi";
import { getAllServiceCategories } from "../service/serviceCategoryApi";
import ContactUs from "./ContactUs";
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
  return (
    <motion.div 
      whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0,0,0,0.15)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
      <div className="relative h-56">
        <img 
          src={service.thumbnail} 
          alt={service.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex items-center justify-center">
          <h3 className="text-white text-xl text-center" style={{ fontFamily: 'Arial, sans-serif' }}>{service.name}</h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3 text-sm text-emerald-600 font-medium text-center">{service.category.name}</div>
        <p className="text-gray-600 text-base mb-4 text-center flex-grow" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>{service.description}</p>
        <div className="flex justify-center items-center flex-col gap-4">
          <span className="text-emerald-600 text-xl">{service.price} VND</span>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg w-full">
            Đặt lịch ngay
          </button>
        </div>
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
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await getAllServices();
        const categoriesResponse = await getAllServiceCategories();
        
        // Ở đây bạn có thể thêm API call để lấy dữ liệu technologies
        // const technologiesResponse = await getAllTechnologies();
        // setTechnologies(technologiesResponse.result);
        
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

  const filteredServices = selectedCategory 
    ? services.filter(service => service.category.id === selectedCategory) 
    : services;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Spa Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center">
          <div className="max-w-2xl text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl mb-4"
            >
              Tận Hưởng Trải Nghiệm Spa Đẳng Cấp
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-8"
            >
              Khám phá các dịch vụ chăm sóc da và thư giãn cao cấp với công nghệ hiện đại nhất
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center"
            >
              <a href="#services" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-full text-lg inline-block mr-4 transition-colors duration-300">
                Dịch Vụ Của Chúng Tôi
              </a>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <a href="#services" className="text-white">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>Dịch Vụ Của Chúng Tôi</h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.8' }}>
              Khám phá các dịch vụ spa cao cấp được thiết kế riêng cho nhu cầu của bạn với công nghệ tiên tiến và sản phẩm tự nhiên
            </p>
          </motion.div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-lg flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(null)}
                className={`px-5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                  selectedCategory === null 
                    ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' 
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
                  className={`px-5 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>
      
      
      
      <ContactUs/>
    </div>
  );
};

export default ServicesPage;