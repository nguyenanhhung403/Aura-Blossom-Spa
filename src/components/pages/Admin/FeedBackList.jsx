import React, { useState, useEffect } from "react";
import { FaTrash, FaStar, FaSearch } from "react-icons/fa";
import Sidebar from "./SideBar";
import { getAllRatings, deleteRating } from '../../service/ratingApi.js';
import { toast } from 'react-toastify';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await getAllRatings();
            console.log('API Response:', response);
            
            if (response?.code === 1000) {
                setFeedbacks(response.result);
            } else {
                throw new Error('Không thể tải danh sách feedback');
            }
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa feedback này?")) {
            try {
                const response = await deleteRating(id);
                if (response?.code === 1000) {
                    setFeedbacks(prev => prev.filter(fb => fb.id !== id));
                    toast.success('Xóa feedback thành công');
                }
            } catch (error) {
                console.error('Error deleting feedback:', error);
                toast.error('Lỗi khi xóa feedback');
            }
        }
    };

    const renderStars = (count) => {
        return [1, 2, 3, 4, 5].map((star) => (
            <FaStar
                key={star}
                className={star <= count ? "text-yellow-400" : "text-gray-400"}
                size={18}
            />
        ));
    };

    // Tìm kiếm và lọc feedback
    const filteredFeedbacks = feedbacks.filter(fb => 
        fb.userFullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.therapist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fb.feedback?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Phân trang
    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
    const currentFeedbacks = filteredFeedbacks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-900">
                <Sidebar />
                <div className="flex-1 p-4">
                    <div className="text-white">Đang tải...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-white text-2xl">Danh sách Feedback</h1>
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                
                {currentFeedbacks.length > 0 ? (
                    <div className="space-y-4">
                        {currentFeedbacks.map((fb) => (
                            <div key={fb.id} className="bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center mb-2">
                                            {renderStars(fb.stars)}
                                            <span className="ml-2 text-white">{fb.stars}/5</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mb-3">
                                            <div>
                                                <p className="text-gray-400">Khách hàng:</p>
                                                <p className="text-white">{fb.userFullname}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Chuyên viên:</p>
                                                <p className="text-white">{fb.therapist}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400">Dịch vụ:</p>
                                                <p className="text-white">{fb.service}</p>
                                            </div>
                                        </div>
                                        <p className="text-white bg-gray-700 p-3 rounded">{fb.feedback}</p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {new Date(fb.createdAt).toLocaleString('vi-VN')}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(fb.id)}
                                        className="ml-4 text-red-500 hover:text-red-400"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-800 p-8 rounded-lg text-center">
                        <p className="text-gray-400">Không có feedback nào</p>
                    </div>
                )}

                {/* Phân trang */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === i + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedbackList;