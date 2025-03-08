import React, { useState } from "react";
import { FaSearch, FaTrash, FaStar, FaCheck, FaTimes, FaFilter, FaSort, FaUserCircle, FaPhone, FaComments } from "react-icons/fa";
import Sidebar from "./SideBar";

const FeedbackList = () => {
  // Mảng dịch vụ
  const services = ["Dịch vụ A", "Dịch vụ B", "Dịch vụ C", "Nặn mụn", "Tư vấn da", "Chăm sóc da"];

  // State chọn dịch vụ
  const [selectedService, setSelectedService] = useState("");
  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // State sắp xếp theo đánh giá
  const [sortByRating, setSortByRating] = useState("all"); // "all", "high", "low"
  // State hiển thị chi tiết
  const [expandedId, setExpandedId] = useState(null);

  // Mảng feedback mẫu với nhiều người dùng hơn
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      service: "Dịch vụ A",
      customerName: "Nguyễn Văn A",
      phone: "0123456789",
      rating: 4,
      comment: "Tôi rất hài lòng với dịch vụ, nhân viên nhiệt tình và chu đáo. Sẽ quay lại lần sau.",
      date: "01/03/2025",
      staffName: "Bác sĩ A"
    },
    {
      id: 2,
      service: "Dịch vụ A",
      customerName: "Trần Thị B",
      phone: "0987654321",
      rating: 5,
      comment: "Dịch vụ tuyệt vời, kết quả vượt ngoài mong đợi. Đã giới thiệu cho bạn bè.",
      date: "02/03/2025",
      staffName: "Bác sĩ B"
    },
    {
      id: 3,
      service: "Dịch vụ B",
      customerName: "Lê Văn C",
      phone: "0911222333",
      rating: 3,
      comment: "Dịch vụ ổn, tuy nhiên thời gian chờ đợi hơi lâu. Cần cải thiện thêm.",
      date: "03/03/2025",
      staffName: "Bác sĩ C"
    },
    {
      id: 4,
      service: "Nặn mụn",
      customerName: "Phạm Thị D",
      phone: "0977888999",
      rating: 5,
      comment: "Nặn mụn rất nhẹ nhàng, không đau. Da sạch và không bị thâm. Rất hài lòng!",
      date: "04/03/2025",
      staffName: "Bác sĩ D"
    },
    {
      id: 5,
      service: "Tư vấn da",
      customerName: "Hoàng Văn E",
      phone: "0866777888",
      rating: 2,
      comment: "Buổi tư vấn hơi ngắn, cảm thấy chưa được giải đáp hết thắc mắc. Cần dành nhiều thời gian hơn cho khách hàng.",
      date: "05/03/2025",
      staffName: "Bác sĩ A"
    },
    {
      id: 6,
      service: "Chăm sóc da",
      customerName: "Ngô Thị F",
      phone: "0933444555",
      rating: 4,
      comment: "Massage thư giãn và đắp mặt nạ rất tốt. Da căng mịn ngay sau khi dùng dịch vụ.",
      date: "06/03/2025",
      staffName: "Bác sĩ B"
    },
    {
      id: 7,
      service: "Dịch vụ C",
      customerName: "Vũ Văn G",
      phone: "0944555666",
      rating: 5,
      comment: "Tuyệt vời, không có gì để phàn nàn. Đội ngũ chuyên nghiệp, chu đáo.",
      date: "07/03/2025",
      staffName: "Bác sĩ E"
    }
  ]);

  // Hàm lọc và sắp xếp feedback
  const getFilteredFeedbacks = () => {
    // Lọc theo dịch vụ và từ khóa tìm kiếm
    let result = feedbacks.filter((fb) => {
      const matchService = selectedService === "" || fb.service === selectedService;
      const matchSearch = 
        fb.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.service.toLowerCase().includes(searchTerm.toLowerCase());
      return matchService && matchSearch;
    });

    // Sắp xếp theo đánh giá
    if (sortByRating === "high") {
      result = result.sort((a, b) => b.rating - a.rating);
    } else if (sortByRating === "low") {
      result = result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  };

  const filteredFeedbacks = getFilteredFeedbacks();

  // Hàm xóa feedback
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa feedback này?")) {
      setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
    }
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
    if (rating >= 4) return "bg-green-900 border-green-700";
    if (rating === 3) return "bg-blue-900 border-blue-700";
    return "bg-red-900 border-red-700";
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 p-4">
        {/* Tiêu đề */}
        <div className="bg-gray-800 p-4 rounded-lg text-xl font-bold text-gray-100 mb-6 flex justify-between items-center">
          <span>Phản hồi khách hàng</span>
          <span className="text-sm font-normal text-gray-400">Tổng số: {feedbacks.length}</span>
        </div>

        {/* Thanh công cụ */}
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row gap-4 mb-6">
          {/* Tìm kiếm */}
          <div className="relative flex-grow">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tìm kiếm theo tên khách hàng, số điện thoại hoặc nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Bộ lọc */}
          <div className="flex gap-2">
            {/* Lọc theo dịch vụ */}
            <div className="relative">
              <select
                className="appearance-none bg-gray-700 border border-gray-600 text-white pl-10 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Tất cả dịch vụ</option>
                {services.map((srv, idx) => (
                  <option key={idx} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
              <FaFilter className="absolute top-3 left-3 text-gray-400" />
            </div>

            {/* Sắp xếp theo đánh giá */}
            <div className="relative">
              <select
                className="appearance-none bg-gray-700 border border-gray-600 text-white pl-10 pr-8 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        </div>

        {/* Danh sách feedback */}
        <div className="space-y-4">
          {filteredFeedbacks.map((fb) => (
            <div
              key={fb.id}
              className={`bg-gray-800 border rounded-lg overflow-hidden hover:shadow-lg transition-all ${getRatingColor(fb.rating)}`}
            >
              {/* Phần header */}
              <div 
                className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                onClick={() => toggleExpand(fb.id)}
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-white font-semibold">{fb.customerName}</span>
                    <span className="text-gray-400 text-sm">
                      {fb.service} | {fb.date}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex mr-2">{renderStars(fb.rating)}</div>
                    <span className="text-sm text-gray-300">
                      {fb.rating}/5
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(fb.id);
                    }}
                    className="text-red-400 hover:text-red-300 bg-gray-700 hover:bg-gray-600 p-2 rounded-full transition-colors"
                  >
                    <FaTrash size={14} />
                  </button>
                  
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-blue-400" />
                      <div>
                        <div className="text-gray-400 text-xs">Khách hàng</div>
                        <div className="text-white">{fb.customerName}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-green-400" />
                      <div>
                        <div className="text-gray-400 text-xs">Số điện thoại</div>
                        <div className="text-white">{fb.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <FaUserCircle className="text-purple-400" />
                      <div>
                        <div className="text-gray-400 text-xs">Nhân viên phục vụ</div>
                        <div className="text-white">{fb.staffName}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FaComments className="text-yellow-400" />
                      <div className="text-gray-400 text-xs">Nhận xét</div>
                    </div>
                    <div className="bg-gray-700 p-3 rounded-lg text-white">
                      "{fb.comment}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {filteredFeedbacks.length === 0 && (
            <div className="text-center bg-gray-800 p-8 rounded-lg border border-gray-700">
              <div className="text-5xl text-gray-600 mb-3">
                <FaSearch className="mx-auto" />
              </div>
              <div className="text-lg font-semibold text-gray-400 mb-2">
                Không tìm thấy phản hồi
              </div>
              <div className="text-sm text-gray-500">
                Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;