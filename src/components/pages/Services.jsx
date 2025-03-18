import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import bannerserImg from "../images/SevivceImg/BannerServices.jpg";
import Tech1Img from "../images/SevivceImg/tech1.jpg";
import Tech2Img from "../images/SevivceImg/tech2.jpg";
import Tech3Img from "../images/SevivceImg/tech3.png";
import Tech4Img from "../images/SevivceImg/tech4.jpg";
import Navbar from "./Navbar";
import axios from "axios";
import "../../App.css";
import { getAllServices } from "../service/serviceApi";
import { getAllServiceCategories } from "../service/serviceCategoryApi";

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [technologies, setTechnologies] = useState([
    {
      title: "CÔNG NGHỆ HYDRAFACIAL",
      description:
        "Thanh lọc sâu, giảm mụn, kiểm dầu. Sạch thoáng làn da , sạch mát tinh thần",
      image: Tech1Img,
      color: "white",
    },
    {
      title: "ÁNH SÁNG SINH HỌC BIO LED",
      description:
        "Làm dịu, giảm viêm, mờ thâm. Phục hồi vẻ tươi sáng cho làng da ",
      image: Tech2Img,
      color: "#white",
    },
    {
      title: "CÔNG NGHỆ HIGH PRESSURE MESO THERAPY",
      description:
        "Dịu lành, an toàn, không đau. Không kim, không xâm lấn, không cần nghỉ dưỡng",
      image: Tech3Img,
      color: "#white",
    },
    {
      title: "CÔNG NGHỆ RADIO FREQUENCY LIFTING & EMS",
      description:
        "Săn chắc da, chống lão hóa. Tăng sinh collagen, tăng độ đàn hồi. Giảm nhăn, giảm quần thâm mắt",
      image: Tech4Img,
      color: "white",
    },
  ]);
  // Gọi API để lấy danh sách dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      const response = await getAllServices();
      // Giới hạn chỉ lấy 4 dịch vụ đầu tiên
      setServices(response.result.slice(0, 4));
    };
    const fetchCategories = async () => {
      const response = await getAllServiceCategories();
      setCategories(response.result);
    };
    fetchCategories();
    fetchServices();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

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
  return (
    <>
      <Navbar />
      <div className="mt-20"></div>
      <section className="relative w-full">
        <div className="BannerServices-img">
          <img
            src={bannerserImg}
            alt="Banner Services"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="text-white text-3xl md:text-5xl font-bold uppercase tracking-wider text-center"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Dịch vụ của chúng tôi
          </h1>
        </div>
      </section>
      <table className="services-table">
        <thead>
          <tr>
            <th>Dịch vụ</th>
            <th>Mô tả</th>
            <th>Ảnh minh họa</th>
            <th>Giá dịch vụ (VND)</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td
                    colSpan="4"
                    className="category"
                    onClick={() => toggleCategory(category.id)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {category.name}
                  </td>
                </tr>
                {selectedCategory === category.id &&
                  services
                    .filter((service) => service.category?.id === category.id)
                    .map((service, idx) => (
                      <tr
                        key={`${category.id}-${service.id}`}
                        className="service-details"
                      >
                        <td>{service.name}</td>
                        <td style={{ fontSize: "14px" }}>
                          <ul>{service.description}</ul>
                        </td>
                        <td>
                          {service.thumbnail && (
                            <img
                              src={service.thumbnail}
                              alt={service.name}
                              className="thumbnail"
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </td>
                        <td className="price">{service.price}</td>
                      </tr>
                    ))}
              </React.Fragment>
            ))}
        </tbody>
      </table>
      <div className="technology-container">
        <h2 className="text-center text-2xl font-bold my-5">Công Nghệ Spa</h2>
        <div className="technology-list">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            style={{ cursor: "pointer", padding: "10px", borderRadius: "5px" }}
          >
            ❮
          </button>
          {technologies
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((tech, i) => (
              <div key={i} className="tech-card">
                <div className="tech-image image">
                  <img src={tech.image} alt={tech.title} />
                </div>
                <h3 style={{ marginTop: "10px", fontWeight: "bold" }}>
                  {tech.title}
                </h3>
                <p style={{ fontSize: "14px", marginTop: "5px" }}>
                  {tech.description}
                </p>
              </div>
            ))}
          <button
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= technologies.length}
            style={{ cursor: "pointer", padding: "10px", borderRadius: "5px" }}
          >
            ❯
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServicesTable;
