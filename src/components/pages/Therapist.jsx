import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import TherapistBanner from "../images/TherapistImg/TherapistBanner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { getAllTherapists } from "../service/therapistsApi";
import "../../App.css";

const Therapist = () => {
  const [therapists, setTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await getAllTherapists();
        if (response.result) {
          setTherapists(response.result);
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="therapist-banner relative mb-8">
          <img 
            src={TherapistBanner} 
            alt="therapist-banner"
            className="w-full h-[300px] object-cover rounded-lg" 
          />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-white">
            Đội ngũ chuyên viên
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : therapists.length === 0 ? (
          <div className="text-center text-gray-500 py-8">Không có dữ liệu chuyên viên.</div>
        ) : (
          <div className="therapist-slider">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              className="rounded-lg shadow-lg"
            >
              {therapists.map((therapist) => (
                <SwiperSlide key={therapist.id}>
                  <div className="therapist-slide flex flex-col md:flex-row bg-white p-6 gap-8">
                    <div className="therapist-img md:w-1/3">
                      <img 
                        src={therapist.image || "https://via.placeholder.com/300"} 
                        alt={therapist.fullname}
                        className="w-full h-[300px] object-cover rounded-lg shadow-md" 
                      />
                      <h3 className="text-2xl font-semibold text-center mt-4">{therapist.fullname}</h3>
                    </div>
                    <div className="therapist-info md:w-2/3">
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                          Kinh nghiệm: <span className="font-normal">{therapist.experience} năm</span>
                        </h4>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-700">Email:</h4>
                        <p className="text-gray-600">{therapist.email}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-700">Số điện thoại:</h4>
                        <p className="text-gray-600">{therapist.phone}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold text-gray-700">Mô tả:</h4>
                        <p className="text-gray-600">{therapist.description || "Chưa có mô tả"}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Therapist;
