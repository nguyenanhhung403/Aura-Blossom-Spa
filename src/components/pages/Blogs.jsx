import { useState } from "react";
import Navbar from "./Navbar";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const BeautyTips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);
  
  // Danh sách các tip, ví dụ có 6 tip hoặc nhiều hơn.
  const beautyTips = [
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 1",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 1.",
      steps: ["Bước 1: Chuẩn bị da", "Bước 2: Thoa sản phẩm", "Bước 3: Massage nhẹ nhàng"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 2",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 2.",
      steps: ["Bước 1: Làm sạch da", "Bước 2: Dưỡng ẩm sâu", "Bước 3: Bảo vệ với kem chống nắng"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 3",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 3.",
      steps: ["Bước 1: Tẩy tế bào chết", "Bước 2: Dưỡng trắng da", "Bước 3: Se khít lỗ chân lông"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 4",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 4.",
      steps: ["Bước 1: Dưỡng ẩm", "Bước 2: Chống lão hóa", "Bước 3: Phục hồi da ban đêm"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 5",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 5.",
      steps: ["Bước 1: Tẩy trang cẩn thận", "Bước 2: Dưỡng da", "Bước 3: Sử dụng serum"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 6",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 6.",
      steps: ["Bước 1: Chăm sóc vùng mắt", "Bước 2: Dưỡng da vùng mắt", "Bước 3: Massage vùng mắt"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Beauty Tip 7",
      description: "Mô tả ngắn gọn về bí quyết làm đẹp số 7.",
      steps: ["Bước 1: Chăm sóc vùng mắt", "Bước 2: Dưỡng da vùng mắt", "Bước 3: Massage vùng mắt"]
    }
  ];

  // Nếu có nhiều hơn 6 tip thì chia trang, ngược lại hiển thị tất cả
  const itemsPerPage = 6;
  const totalPages = Math.ceil(beautyTips.length / itemsPerPage);
  const paginatedTips = beautyTips.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-gray-50 min-h-screen ">
      <Navbar />
      <div className="h-20"></div>
      <div className="pt-24 px-4 ">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-800">
            Bí kíp Làm Đẹp
          </h1>
          <p className="text-gray-600 mt-2">
            Khám phá những mẹo làm đẹp hiệu quả từ chuyên gia
          </p>
          {/* <div className="mt-6 flex justify-center">
            <input
              type="text"
              className="w-72 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Tìm kiếm bí quyết..."
            />
          </div> */}
        </div>

        {/* Beauty Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paginatedTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
              onClick={() => setSelectedTip(tip)}
            >
              <img
                src={tip.image}
                alt={tip.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{tip.title}</h2>
                <p className="mt-2 text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination chỉ hiển thị nếu số lượng tip > 6 */}
        {beautyTips.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Modal Detail View */}
        {selectedTip && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedTip(null)}
              >
                &times;
              </button>
              <img
                src={selectedTip.image}
                alt={selectedTip.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {selectedTip.title}
              </h2>
              <p className="mt-2 text-gray-600">{selectedTip.description}</p>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Các bước thực hiện:
              </h3>
              <ul className="list-decimal list-inside mt-2 text-gray-600">
                {selectedTip.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
              <div className="mt-6 text-right">
                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                  onClick={() => setSelectedTip(null)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* <Footer /> */}
      </div>
      <ContactUs />

    </div>
  );
};

export default BeautyTips;
