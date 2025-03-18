import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import { getAllBlogs } from "../service/blogApi.js"; // Import hàm getAllBlogs từ blogApi.js

// Dữ liệu mẫu để sử dụng khi API lỗi
const SAMPLE_BLOGS = [
  {
    id: 1,
    title: "Bí quyết chăm sóc da mùa đông",
    content: "Mùa đông làn da thường khô và thiếu nước. Hãy sử dụng kem dưỡng ẩm đậm đặc và uống nhiều nước...",
    thumbnail: "https://placehold.co/600x400?text=Skin+Care"
  },
  {
    id: 2,
    title: "Cách chọn son môi phù hợp với tông da",
    content: "Để chọn được màu son phù hợp, bạn cần xác định tông da của mình là nóng hay lạnh...",
    thumbnail: "https://placehold.co/600x400?text=Lipstick"
  },
  {
    id: 3,
    title: "Bí quyết trang điểm tự nhiên cho công sở",
    content: "Trang điểm nhẹ nhàng, tự nhiên là xu hướng được nhiều cô gái văn phòng yêu thích...",
    thumbnail: "https://placehold.co/600x400?text=Office+Makeup"
  }
];

const BeautyTips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);
  const [blogs, setBlogs] = useState([]); // Thay thế beautyTips bằng blogs

  // Lấy dữ liệu blog từ API
  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogs();
      // Kiểm tra dữ liệu trước khi đặt vào state
      if (Array.isArray(data)) {
        setBlogs(data);
      } else if (data && Array.isArray(data.result)) {
        setBlogs(data.result);
      } else {
        console.error("Dữ liệu không đúng định dạng:", data);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu blog:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    // Xóa dòng sử dụng dữ liệu mẫu
    // setBlogs(SAMPLE_BLOGS);
    
    // Gọi API để lấy dữ liệu thật
    fetchBlogs();
  }, []);

  // Nếu có nhiều hơn 6 blog thì chia trang, ngược lại hiển thị tất cả
  const itemsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const paginatedBlogs = blogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  
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
        </div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => setSelectedTip(blog)}
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">{blog.title}</h2>
                  <p className="mt-2 text-gray-600">{blog.content.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p>Không có dữ liệu blog nào để hiển thị.</p>
          </div>
        )}

        {/* Pagination chỉ hiển thị nếu số lượng blog > 6 */}
        {blogs.length > itemsPerPage && (
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
                src={selectedTip.thumbnail}
                alt={selectedTip.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {selectedTip.title}
              </h2>
              <p className="mt-2 text-gray-600">{selectedTip.content}</p>
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