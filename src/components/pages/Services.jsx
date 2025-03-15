import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import bannerserImg from "../images/SevivceImg/BannerServices.jpg";
import Tech1Img from "../images/SevivceImg/tech1.jpg";
import Tech2Img from "../images/SevivceImg/tech2.jpg";
import Tech3Img from "../images/SevivceImg/tech3.png";
import Tech4Img from "../images/SevivceImg/tech4.jpg";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

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
      color: "white",
    },
    {
      title: "CÔNG NGHỆ HIGH PRESSURE MESO THERAPY",
      description:
        "Dịu lành, an toàn, không đau. Không kim, không xâm lấn, không cần nghỉ dưỡng",
      image: Tech3Img,
      color: "white",
    },
    {
      title: "CÔNG NGHỆ RADIO FREQUENCY LIFTING & EMS",
      description:
        "Săn chắc da, chống lão hóa. Tăng sinh collagen, tăng độ đàn hồi. Giảm nhăn, giảm quần thâm mắt",
      image: Tech4Img,
      color: "white",
    },
  ]);

  useEffect(() => {
    axios
      .get("https://your-api-endpoint.com/api/services")
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải danh sách dịch vụ");
        setLoading(false);
      });
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
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <tr>
                <td
                  colSpan="4"
                  className="category"
                  onClick={() => toggleCategory(index)}
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                >
                  {service.category}
                </td>
              </tr>
              {selectedCategory === index &&
                service.items.map((item, idx) => (
                  <tr key={idx} className="service-details">
                    <td>{item.title}</td>
                    <td style={{ fontSize: "14px" }}>
                      <ul>
                        {item.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="thumbnail"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      )}
                    </td>
                    <td className="price">{item.price}</td>
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
      <div className="text-center my-5" style={{ backgroundColor: "#f7f1e8", width: "100vw", margin: "0", padding: "20px 0", textAlign: "center" }}>
        <button
          onClick={() => navigate("/booking")}
          className="px-6 py-3 bg-[#446E6A] text-white rounded-full font-semibold hover:bg-[#375955] transition"
        >
          Đặt Lịch Ngay
        </button>
      </div>
      <Footer />
    </>
  );
};

export default ServicesTable;
