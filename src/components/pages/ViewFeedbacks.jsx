import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactUs from './ContactUs';
const dummyFeedbacks = [
    {
        id: 1,
        customerName: "Nguyễn Văn A",
        service: "Dịch vụ A",
        rating: 5,
        comment: "Tôi rất hài lòng với dịch vụ tại spa. Các chuyên viên rất chuyên nghiệp và tận tâm. Sau khi sử dụng dịch vụ chăm sóc da mặt, làn da của tôi trở nên sáng mịn và căng bóng. Tôi nhất định sẽ quay lại và giới thiệu cho bạn bè.",
        date: "10/05/2023",
        therapist: "Chuyên viên X"
    },
    {
        id: 2,
        customerName: "Trần Thị B",
        service: "Dịch vụ B",
        rating: 4,
        comment: "Spa có không gian rất thư giãn và dễ chịu. Các dịch vụ tẩy lông ở đây không đau, hiệu quả rõ rệt ngay từ lần đầu tiên. Tôi cảm thấy rất thoải mái và tự tin hơn với làn da mịn màng sau khi tẩy lông. Chắc chắn tôi sẽ trở thành khách hàng thường xuyên.",
        date: "08/05/2023",
        therapist: "Chuyên viên Y"
    },
    {
        id: 3,
        customerName: "Lê Văn C",
        service: "Dịch vụ C",
        rating: 4,
        comment: "Tôi đã thử liệu trình massage toàn thân tại spa, cảm giác thư giãn tuyệt vời. Các chuyên viên rất chu đáo, luôn hỏi tôi cảm thấy như thế nào trong suốt quá trình điều trị. Đặc biệt, tôi rất thích không gian ấm cúng và yên tĩnh ở đây.",
        date: "05/05/2023",
        therapist: "Chuyên viên Z"
    },
    {
        id: 4,
        customerName: "Phạm Thị D",
        service: "Nặn mụn",
        rating: 5,
        comment: "Nặn mụn rất nhẹ nhàng, không đau. Da sạch và không bị thâm. Rất hài lòng!",
        date: "01/05/2023",
        therapist: "Chuyên viên A"
    },
    {
        id: 5,
        customerName: "Hoàng Văn E",
        service: "Tư vấn da",
        rating: 3,
        comment: "Buổi tư vấn hơi ngắn, cảm thấy chưa được giải đáp hết thắc mắc. Cần dành nhiều thời gian hơn cho khách hàng.",
        date: "28/04/2023",
        therapist: "Chuyên viên B"
    },
    {
        id: 6,
        customerName: "Ngô Thị F",
        service: "Chăm sóc da",
        rating: 4,
        comment: "Massage thư giãn và đắp mặt nạ rất tốt. Da căng mịn ngay sau khi dùng dịch vụ.",
        date: "25/04/2023",
        therapist: "Chuyên viên C"
    },
    {
        id: 7,
        customerName: "Vũ Văn G",
        service: "Dịch vụ C",
        rating: 5,
        comment: "Tuyệt vời, không có gì để phàn nàn. Đội ngũ chuyên nghiệp, chu đáo.",
        date: "20/04/2023",
        therapist: "Chuyên viên D"
    }
];

const StarRating = ({ rating }) => (
    <div className="flex">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
        ))}
    </div>
);

const ViewFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [selectedService, setSelectedService] = useState('');
    
    // Phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 6;
    
    // Lấy danh sách dịch vụ độc nhất
    const uniqueServices = [...new Set(dummyFeedbacks.map(fb => fb.service))];
    
    useEffect(() => {
        // TODO: Fetch feedback từ API
        
        // Sử dụng dữ liệu mẫu
        setFeedbacks(dummyFeedbacks);
        setFilteredFeedbacks(dummyFeedbacks);
    }, []);
    
    useEffect(() => {
        // Lọc feedback theo điều kiện
        const filtered = feedbacks.filter(feedback => {
            const matchesSearch = 
                feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                feedback.therapist.toLowerCase().includes(searchTerm.toLowerCase());
                
            const matchesRating = selectedRating === 0 || feedback.rating === selectedRating;
            const matchesService = selectedService === '' || feedback.service === selectedService;
            
            return matchesSearch && matchesRating && matchesService;
        });
        
        setFilteredFeedbacks(filtered);
        setCurrentPage(1); // Reset về trang 1 khi lọc lại dữ liệu
    }, [searchTerm, selectedRating, selectedService, feedbacks]);
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    
    const handleRatingFilter = (rating) => {
        setSelectedRating(rating === selectedRating ? 0 : rating);
    };
    
    const handleServiceFilter = (e) => {
        setSelectedService(e.target.value);
    };
    
    const getRatingColor = (rating) => {
        if (rating >= 4) return "bg-green-50 border-green-200";
        if (rating === 3) return "bg-blue-50 border-blue-200";
        return "bg-red-50 border-red-200";
    };
    
    // Tính toán phân trang
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = filteredFeedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
    const totalPages = Math.ceil(filteredFeedbacks.length / feedbacksPerPage);
    
    // Thay đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    // Component Pagination
    const Pagination = () => {
        const pageNumbers = [];
        
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        
        return (
            <div className="flex justify-center mt-8">
                <nav>
                    <ul className="flex space-x-2">
                        {/* Nút về trang trước */}
                        <li>
                            <button 
                                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === 1 
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                        : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                                }`}
                            >
                                &laquo;
                            </button>
                        </li>
                        
                        {/* Các số trang */}
                        {pageNumbers.map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number)}
                                    className={`px-3 py-1 rounded-md ${
                                        currentPage === number
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                                    }`}
                                >
                                    {number}
                                </button>
                            </li>
                        ))}
                        
                        {/* Nút đến trang sau */}
                        <li>
                            <button 
                                onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded-md ${
                                    currentPage === totalPages 
                                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                                        : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                                }`}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-36 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Đánh giá từ khách hàng</h2>
                    <p className="text-center text-gray-600 mb-8">
                        Xem tất cả các đánh giá và phản hồi từ khách hàng về dịch vụ của chúng tôi
                    </p>
                    
                    {/* Thanh tìm kiếm và bộ lọc */}
                    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Tìm kiếm */}
                            <div className="flex-grow">
                                <input 
                                    type="text" 
                                    placeholder="Tìm kiếm đánh giá..." 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            
                            {/* Lọc theo dịch vụ */}
                            <div className="md:w-64">
                                <select 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                                    value={selectedService}
                                    onChange={handleServiceFilter}
                                >
                                    <option value="">Tất cả dịch vụ</option>
                                    {uniqueServices.map((service, index) => (
                                        <option key={index} value={service}>{service}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Lọc theo đánh giá */}
                        <div className="mt-4">
                            <p className="text-sm text-gray-700 mb-2">Lọc theo đánh giá:</p>
                            <div className="flex space-x-2">
                                {[5, 4, 3, 2, 1].map(rating => (
                                    <button
                                        key={rating}
                                        onClick={() => handleRatingFilter(rating)}
                                        className={`px-3 py-1 rounded-full text-sm ${
                                            selectedRating === rating 
                                                ? 'bg-teal-600 text-white' 
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    >
                                        {rating} sao
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Số lượng kết quả tìm thấy */}
                    <p className="text-sm text-gray-600 mb-4">
                        Hiển thị {currentFeedbacks.length} trong tổng số {filteredFeedbacks.length} đánh giá
                    </p>
                    
                    {/* Kết quả */}
                    <div className="space-y-6">
                        {filteredFeedbacks.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">Không tìm thấy đánh giá phù hợp.</p>
                            </div>
                        ) : (
                            currentFeedbacks.map(feedback => (
                                <div 
                                    key={feedback.id} 
                                    className={`p-6 rounded-lg shadow-md border ${getRatingColor(feedback.rating)}`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between mb-4">
                                        <div>
                                            <h3 className="font-semibold text-lg">{feedback.customerName}</h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                <StarRating rating={feedback.rating} />
                                                <span className="text-sm text-gray-500">
                                                    {feedback.date}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                                                {feedback.service}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-gray-700 mb-3">{feedback.comment}</p>
                                    
                                    <div className="text-sm text-gray-500">
                                        Chuyên viên: {feedback.therapist}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {/* Phân trang */}
                    {filteredFeedbacks.length > 0 && <Pagination />}
                </div>
            </div>
            <ContactUs/>
        </div>
    );
};

export default ViewFeedbacks; 