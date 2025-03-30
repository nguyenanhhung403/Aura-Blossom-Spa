import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactUs from './ContactUs';
import { getAllRatings } from '../service/ratingApi';
import { FaStar, FaUser, FaClock, FaClipboardList } from 'react-icons/fa';

const StarRating = ({ rating }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <FaStar
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ))}
        <span className="ml-2 text-gray-600 font-medium">{rating}/5</span>
    </div>
);

const ViewFeedbacks = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRating, setSelectedRating] = useState('all');
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await getAllRatings();
                console.log('Feedback response:', response);
                
                if (response?.code === 1000 && response.result) {
                    setFeedbacks(response.result);
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

    // Lọc feedback theo rating
    const filteredFeedbacks = feedbacks.filter(feedback => {
        if (selectedRating === 'all') return true;
        return feedback.stars === parseInt(selectedRating);
    });

    // Tính toán phân trang
    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
    const currentFeedbacks = filteredFeedbacks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Tính toán thống kê
    const stats = {
        total: feedbacks.length,
        average: feedbacks.reduce((acc, curr) => acc + curr.stars, 0) / feedbacks.length || 0,
        fiveStar: feedbacks.filter(f => f.stars === 5).length,
        fourStar: feedbacks.filter(f => f.stars === 4).length,
        threeStar: feedbacks.filter(f => f.stars === 3).length,
        twoStar: feedbacks.filter(f => f.stars === 2).length,
        oneStar: feedbacks.filter(f => f.stars === 1).length,
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="pt-36 pb-12 px-4 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-36 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Đánh giá từ khách hàng
                        </h2>
                        <p className="text-gray-600">
                            {stats.total} đánh giá | Điểm trung bình: {stats.average.toFixed(1)}/5
                        </p>
                    </div>

                    {/* Rating stats */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {[5, 4, 3, 2, 1].map(stars => {
                                const count = feedbacks.filter(f => f.stars === stars).length;
                                const percentage = (count / stats.total) * 100 || 0;
                                return (
                                    <div key={stars} className="flex items-center space-x-2">
                                        <div className="flex items-center">
                                            <FaStar className="text-yellow-400" />
                                            <span className="ml-1">{stars}</span>
                                        </div>
                                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div
                                                className="h-full bg-yellow-400 rounded-full"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-500">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Filter buttons */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <button
                            onClick={() => setSelectedRating('all')}
                            className={`px-4 py-2 rounded-full ${
                                selectedRating === 'all'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Tất cả
                        </button>
                        {[5, 4, 3, 2, 1].map(rating => (
                            <button
                                key={rating}
                                onClick={() => setSelectedRating(rating.toString())}
                                className={`px-4 py-2 rounded-full ${
                                    selectedRating === rating.toString()
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                                {rating} sao
                            </button>
                        ))}
                    </div>

                    {/* Feedback list */}
                    {currentFeedbacks.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Chưa có đánh giá nào</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentFeedbacks.map(feedback => (
                                <div 
                                    key={feedback.id} 
                                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <StarRating rating={feedback.stars} />
                                            <div className="mt-2 flex items-center text-gray-600">
                                                <FaUser className="mr-2" />
                                                <span>{feedback.userFullname}</span>
                                            </div>
                                        </div>
                                        <div className="text-right text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <FaClock className="mr-1" />
                                                {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center text-gray-600">
                                            <FaClipboardList className="mr-2" />
                                            <span>Dịch vụ: {feedback.service}</span>
                                        </div>
                                        <div className="text-gray-600">
                                            Chuyên viên: {feedback.therapist}
                                        </div>
                                    </div>

                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                        {feedback.feedback || 'Không có nhận xét'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 space-x-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === i + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ContactUs />
            {/* <Footer /> */}
        </div>
    );
};

export default ViewFeedbacks;