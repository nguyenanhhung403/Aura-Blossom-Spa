import React from "react";

const CustomerFavorites = () => {
  return (
    <section className="py-16 px-6 md:px-12" style={{ backgroundColor: 'rgb(142, 163, 150)' }}>
      {/* Tiêu đề & mô tả */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2F4F4F]">
          "Hàng trăm khách hàng đã chọn và yêu thích!"
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
          Dùng bộ lọc cơ hội trải nghiệm dịch vụ tốt nhất tại spa của chúng tôi – nơi mang đến cho bạn
          làn da khỏe mạnh, căng bóng và tràn đầy sức sống. Đặt lịch ngay hôm nay để sẵn sàng khác biệt
          và tận hưởng phút giây tuyệt vời!
        </p>
      </div>

      {/* 3 thẻ dịch vụ */}
      <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center relative">
          {/* Số thứ tự */}
          <span className="text-5xl font-extrabold text-pink-500 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            1
          </span>
          {/* Ảnh minh hoạ (placeholder) */}
          <div
            className="mt-10 w-full h-40 bg-cover bg-center rounded-md"
            style={{ backgroundImage: "url('https://via.placeholder.com/300x200')" }}
          ></div>
          {/* Tiêu đề */}
          <p className="mt-4 text-xl md:text-2xl font-semibold text-[#2F4F4F]">
            Detox làn da
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Sạch sâu & Khỏe đẹp
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center relative">
          <span className="text-5xl font-extrabold text-blue-500 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            2
          </span>
          <div
            className="mt-10 w-full h-40 bg-cover bg-center rounded-md"
            style={{ backgroundImage: "url('https://via.placeholder.com/300x200')" }}
          ></div>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-[#2F4F4F]">
            Detox làn da
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Sạch sâu & Khỏe đẹp
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center relative">
          <span className="text-5xl font-extrabold text-yellow-500 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            3
          </span>
          <div
            className="mt-10 w-full h-40 bg-cover bg-center rounded-md"
            style={{ backgroundImage: "url('https://via.placeholder.com/300x200')" }}
          ></div>
          <p className="mt-4 text-xl md:text-2xl font-semibold text-[#2F4F4F]">
            Detox làn da
          </p>
          <p className="text-base md:text-lg text-gray-600">
            Sạch sâu & Khỏe đẹp
          </p>
        </div>
      </div>
    </section>
  );
};

export default CustomerFavorites;