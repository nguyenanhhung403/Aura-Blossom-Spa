import React, { useEffect, useState } from "react";
import { getFavoriteServices } from "../../service/serviceApi";

const CustomerFavorites = () => {

  const [favoriteServices, setFavoriteServices] = useState([])
  useEffect(()=> {
    const fetchFavoriteServices = async () => {
      const res = await getFavoriteServices();
      setFavoriteServices(res.result.slice(0,3))
    }
    fetchFavoriteServices();
  }, [])

  return (
    <section className="py-16 px-6 md:px-12" style={{ backgroundColor: 'rgb(142, 163, 150)' }}>
      {/* Tiêu đề & mô tả */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4F4F]">
          "Hàng trăm khách hàng đã chọn và yêu thích!"
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
          Trải nghiệm dịch vụ tốt nhất tại spa của chúng tôi – nơi mang đến cho bạn
          làn da khỏe mạnh, căng bóng và tràn đầy sức sống. Đặt lịch ngay hôm nay để sẵn sàng khác biệt
          và tận hưởng phút giây tuyệt vời!
        </p>
      </div>

      {/* 3 thẻ dịch vụ */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {favoriteServices.length>0 && favoriteServices.map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center relative">
          {/* Số thứ tự */}
          <span className="text-5xl font-extrabold text-pink-500 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {index+1}
          </span>
          {/* Ảnh minh hoạ (placeholder) */}
          <div
            className="mt-10 w-full h-40 bg-cover bg-center rounded-md"
            style={{ backgroundImage: `url(${service.thumbnail})` }}
          ></div>
          {/* Tiêu đề */}
          <p className="mt-4 text-xl md:text-2xl font-semibold text-[#2F4F4F]">
            {service.name}
          </p>
          <p className="text-base md:text-lg text-gray-600">
            {service.category.name}
          </p>
        </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerFavorites;