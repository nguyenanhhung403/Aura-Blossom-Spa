import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactUs from './ContactUs';
import { getAllRatings } from '../service/ratingApi';

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await getAllRatings();
                console.log("API Response:", response); // Debug log
                
                // Kiểm tra cấu trúc response và lấy mảng dữ liệu
                const feedbacksData = response.result || [];
                
                // Chuyển đổi dữ liệu từ API sang định dạng phù hợp
                const formattedFeedbacks = feedbacksData.map(item => ({
                    id: item.id,
                    date: new Date(item.created_at).toLocaleDateString('vi-VN'),
                    comment: item.feedback || 'Không có nhận xét',
                    rating: item.stars,
                    appointmentId: item.appointment_id
                }));
                
                setFeedbacks(formattedFeedbacks);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error("Lỗi khi tải đánh giá:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchFeedbacks();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="pt-36 pb-12 px-4 text-center">
                    <p>Đang tải dữ liệu đánh giá...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="pt-36 pb-12 px-4 text-center text-red-500">
                    <p>Lỗi khi tải dữ liệu: {error}</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-36 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Đánh giá từ khách hàng</h2>
                    <p className="text-center text-gray-600 mb-8">
                        Xem tất cả các đánh giá và phản hồi từ khách hàng
                    </p>
                    
                    {/* Hiển thị danh sách đánh giá */}
                    {feedbacks.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Hiện chưa có đánh giá nào</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {feedbacks.map(feedback => (
                                <div 
                                    key={feedback.id} 
                                    className={`p-6 rounded-lg shadow-md border ${
                                        feedback.rating >= 4 
                                            ? "bg-green-50 border-green-200" 
                                            : feedback.rating === 3 
                                                ? "bg-blue-50 border-blue-200" 
                                                : "bg-red-50 border-red-200"
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <StarRating rating={feedback.rating} />
                                                <span className="text-sm text-gray-500">
                                                    {feedback.date}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-gray-700">{feedback.comment}</p>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ID lịch hẹn: {feedback.appointmentId}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ContactUs/>
            <Footer />
        </div>
    );
};

export default ViewFeedbacks;