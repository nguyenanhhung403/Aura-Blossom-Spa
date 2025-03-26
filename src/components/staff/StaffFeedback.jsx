import React, { useState, useEffect } from "react";
import { FaSearch, FaStar, FaCheck, FaTimes, FaFilter, FaSort, FaComments, FaUser, FaUserMd, FaClipboardList, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const StaffFeedback = () => {
  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // State sắp xếp theo đánh giá
  const [sortByRating, setSortByRating] = useState("all"); // "all", "high", "low"
  // State hiển thị chi tiết
  const [expandedId, setExpandedId] = useState(null);
  // State lưu trữ dữ liệu từ API
  const [feedbacks, setFeedbacks] = useState([]);
  // State loading
  const [loading, setLoading] = useState(true);
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const feedbacksPerPage = 6;

  // Hàm fetch dữ liệu từ API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ratings/all");
        if (response.data.code === 1000) {
          setFeedbacks(response.data.result);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error); 
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Hàm lọc và sắp xếp feedback
  const getFilteredFeedbacks = () => {
    // Lọc theo từ khóa tìm kiếm
    let result = feedbacks.filter((fb) => {
      return fb.feedback.toLowerCase().includes(searchTerm.toLowerCase()) || 
             (fb.userFullname && fb.userFullname.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (fb.therapist && fb.therapist.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (fb.service && fb.service.toLowerCase().includes(searchTerm.toLowerCase()));
    });

    // Sắp xếp theo đánh giá
    if (sortByRating === "high") {
      result = result.sort((a, b) => b.stars - a.stars);
    } else if (sortByRating === "low") {
      result = result.sort((a, b) => a.stars - b.stars);
    }

    return result;
  };

  const filteredFeedbacks = getFilteredFeedbacks();
  
  // Phân trang
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);

  // Hàm thay đổi trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Hàm chuyển đến trang trước
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  // Hàm chuyển đến trang sau
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Hàm render sao
  const renderStars = (count) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        className={star <= count ? "text-yellow-400" : "text-gray-400"}
        size={18}
      />
    ));
  };

  // Hàm toggle xem chi tiết
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Hàm lấy màu background dựa trên đánh giá
  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-[#1e293b] border-green-700";
    if (rating === 3) return "bg-[#1e293b] border-blue-700";
    return "bg-[#1e293b] border-red-700";
  };

  // Hàm format ngày tháng
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Tiêu đề */}
      <div className="bg-[#1e293b] p-4 rounded-lg text-xl font-bold text-gray-100 mb-6 flex justify-between items-center">
        <span>Đánh giá từ khách hàng</span>
        <span className="text-sm font-normal text-gray-400">Tổng số: {feedbacks.length}</span>
      </div>

      {/* Thanh công cụ */}
      <div className="bg-[#1e293b] p-4 rounded-lg flex flex-col md:flex-row gap-4 mb-6">
        {/* Tìm kiếm */}
        <div className="relative flex-grow">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-[#0f172a] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tìm kiếm theo nội dung, tên khách hàng, nhà trị liệu hoặc dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sắp xếp theo đánh giá */}
        <div className="relative">
          <select
            className="appearance-none bg-[#0f172a] border border-gray-600 text-white pl-10 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortByRating}
            onChange={(e) => setSortByRating(e.target.value)}
          >
            <option value="all">Tất cả đánh giá</option>
            <option value="high">Đánh giá cao nhất</option>
            <option value="low">Đánh giá thấp nhất</option>
          </select>
          <FaSort className="absolute top-3 left-3 text-gray-400" />
        </div>
      </div>

      {/* Danh sách feedback */}
      <div className="space-y-4">
        {currentFeedbacks.map((fb) => (
          <div
            key={fb.id}
            className={`bg-[#1e293b] border rounded-lg overflow-hidden hover:shadow-lg transition-all ${getRatingColor(fb.stars)}`}
          >
            {/* Phần header */}
            <div 
              className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              onClick={() => toggleExpand(fb.id)}
            >
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <span className="text-gray-400 text-sm">
                    {formatDate(fb.createdAt)}
                  </span>
                  {fb.userFullname && (
                    <span className="text-white font-medium">
                      <FaUser className="inline mr-1 text-blue-400" size={14} />
                      {fb.userFullname}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center">
                  <div className="flex mr-2">{renderStars(fb.stars)}</div>
                  <span className="text-sm text-gray-300">
                    {fb.stars}/5
                  </span>
                </div>
              </div>

              <div className="flex items-center">
                {expandedId === fb.id ? (
                  <FaTimes className="text-gray-400" />
                ) : (
                  <FaCheck className="text-gray-400" />
                )}
              </div>
            </div>

            {/* Phần mở rộng */}
            {expandedId === fb.id && (
              <div className="p-4 pt-0 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  {fb.therapist && (
                    <div className="bg-[#0f172a] p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FaUserMd className="text-green-400" />
                        <div className="text-gray-400 text-xs">Chuyên viên</div>
                      </div>
                      <div className="text-white">{fb.therapist}</div>
                    </div>
                  )}
                  
                  {fb.service && (
                    <div className="bg-[#0f172a] p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <FaClipboardList className="text-purple-400" />
                        <div className="text-gray-400 text-xs">Dịch vụ</div>
                      </div>
                      <div className="text-white">{fb.service}</div>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FaComments className="text-yellow-400" />
                    <div className="text-gray-400 text-xs">Nhận xét</div>
                  </div>
                  <div className="bg-[#0f172a] p-3 rounded-lg text-white">
                    "{fb.feedback}"
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredFeedbacks.length === 0 && (
          <div className="text-center bg-[#1e293b] p-8 rounded-lg border border-gray-700">
            <div className="text-5xl text-gray-600 mb-3">
              <FaSearch className="mx-auto" />
            </div>
            <div className="text-lg font-semibold text-gray-400 mb-2">
              Không tìm thấy đánh giá
            </div>
            <div className="text-sm text-gray-500">
              Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </div>
          </div>
        )}
        
        {/* Phân trang */}
        {filteredFeedbacks.length > 0 && (
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#0f172a] text-white hover:bg-blue-600"
              }`}
            >
              <FaChevronLeft />
            </button>
            
            <div className="flex gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`w-8 h-8 rounded-lg ${
                    currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-[#0f172a] text-white hover:bg-blue-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#0f172a] text-white hover:bg-blue-600"
              }`}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffFeedback; 