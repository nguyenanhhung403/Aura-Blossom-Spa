import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TherapistBanner from "../images/TherapistImg/TherapistBanner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";
import "../../App.css";

const Therapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://your-api-endpoint.com/api/therapists") // 🔹 Thay bằng API thật từ backend
      .then((response) => {
        setTherapists(response.data); // 🔹 Gán dữ liệu từ API vào state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải danh sách bác sĩ");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {/* 🔹 Giữ nguyên phần banner */}
        <div className="therapist-banner">
          <img src={TherapistBanner} alt="therapist-banner" />
          <h1>Bác sĩ điều trị</h1>
        </div>

        {/* 🔹 Xử lý trạng thái tải dữ liệu */}
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p>{error}</p>
        ) : therapists.length === 0 ? (
          <p>Không có dữ liệu bác sĩ.</p>
        ) : (
          <div className="therapist-slider">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              {therapists.map(
                (
                  {
                    img,
                    name,
                    experience,
                    workplace,
                    specialties,
                    achievements,
                    philosophy,
                  },
                  index
                ) => (
                  <SwiperSlide key={index}>
                    <div className="therapist-slide">
                      <div className="therapist-img">
                        <img src={img} alt={name} />
                        <h3>{name}</h3>
                      </div>
                      <div className="therapist-info">
                        <h4>
                          Kinh nghiệm: <span>{experience}</span>
                        </h4>
                        <h4>Nơi công tác:</h4>
                        <ul>
                          {workplace?.map((place, i) => (
                            <li key={i}>{place}</li>
                          ))}
                        </ul>
                        <h4>Chuyên môn:</h4>
                        <ul>
                          {specialties?.map((specialty, i) => (
                            <li key={i}>{specialty}</li>
                          ))}
                        </ul>
                        <h4>Thành tựu:</h4>
                        <ul>
                          {achievements?.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                        <h4>Phương châm:</h4>
                        <p>{philosophy}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Therapist;
