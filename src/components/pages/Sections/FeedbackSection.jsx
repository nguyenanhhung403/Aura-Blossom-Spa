import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRatings } from '../../service/ratingApi';

const StarRating = ({ rating }) => (
    <div className="flex justify-center mt-4">
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

const FeedbackSection = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await getAllRatings();
                
                if (response?.code === 1000 && response.result) {
                    // Lấy 3 feedback đầu tiên hoặc tất cả nếu ít hơn 3
                    setFeedbacks(response.result.slice(0, 3));
                } else {
                    throw new Error('Không thể tải đánh giá');
                }
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

    return (
        <section id="feedback" className="w-full py-16 px-4 animate__animated animate__fadeInUp animate__delay-2s" style={{ backgroundColor: 'rgb(142, 163, 150)' }}>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Feedback của khách hàng</h2>
                <p className="text-center text-gray-200 max-w-2xl mx-auto mb-12">
                    Spa là không gian thư giãn, cung cấp các dịch vụ chăm sóc sức khoẻ, giúp khách hàng xua tan căng thẳng.
                </p>
                
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg max-w-xl mx-auto">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                        {feedbacks.map((feedback) => (
                            <div 
                                key={feedback.id} 
                                className="bg-white p-6 rounded-lg shadow text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                            >
                                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-medium text-gray-800 mb-2">{feedback.userFullname}</h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {feedback.feedback || "Dịch vụ tuyệt vời, tôi rất hài lòng!"}
                                </p>
                                <StarRating rating={feedback.stars} />
                            </div>
                        ))}
                    </div>
                )}
                
                <div className="mt-10 flex justify-center space-x-4">
                    <Link 
                        to="/view-feedbacks" 
                        className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[rgb(88,137,133)] px-6 py-3 rounded-full font-medium transition-all duration-300"
                    >
                        Xem tất cả feedback
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeedbackSection;