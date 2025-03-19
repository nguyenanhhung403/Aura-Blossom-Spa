import React, { useState, useEffect } from "react";
import { FaSearch, FaTrash, FaStar, FaCheck, FaTimes, FaFilter, FaSort, FaUserCircle, FaPhone, FaComments } from "react-icons/fa";
import Sidebar from "./SideBar";
import { getAllRatings, deleteRating } from '../../service/ratingApi.js';


const FeedbackList = () => {
    const [selectedService, setSelectedService] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortByRating, setSortByRating] = useState("all");
    const [expandedId, setExpandedId] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getAllRatings();
                setFeedbacks(response.result || []);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        };

        fetchFeedbacks();
    }, []);

    const getFilteredFeedbacks = () => {
        let result = feedbacks.filter((fb) => {
            const matchService = selectedService === "" || fb.service === selectedService;
            const matchSearch = 
                fb.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fb.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fb.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                fb.service.toLowerCase().includes(searchTerm.toLowerCase());
            return matchService && matchSearch;
        });

        if (sortByRating === "high") {
            result = result.sort((a, b) => b.rating - a.rating);
        } else if (sortByRating === "low") {
            result = result.sort((a, b) => a.rating - b.rating);
        }

        return result;
    };

    const filteredFeedbacks = getFilteredFeedbacks();

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa feedback này?")) {
            try {
                await deleteRating(id);
                setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
            } catch (error) {
                console.error('Error deleting feedback:', error);
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

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return "bg-green-900 border-green-700";
        if (rating === 3) return "bg-blue-900 border-blue-700";
        return "bg-red-900 border-red-700";
    };

    return (
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-4">
                {/* Tiêu đề và thanh công cụ */}
                <div className="bg-gray-800 p-4 rounded-lg text-xl font-bold text-gray-100 mb-6 flex justify-between items-center">
                    <span>Phản hồi khách hàng</span>
                    <span className="text-sm font-normal text-gray-400">Tổng số: {feedbacks.length}</span>
                </div>

                {/* Danh sách feedback */}
                <div className="space-y-4">
                    {filteredFeedbacks.map((fb) => (
                        <div
                            key={fb.id}
                            className={`bg-gray-800 border rounded-lg overflow-hidden hover:shadow-lg transition-all ${getRatingColor(fb.rating)}`}
                        >
                            {/* Phần header và chi tiết */}
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
                                        <span className="text-sm text-gray-300">{fb.rating}/5</span>
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
                                    {expandedId === fb.id ? <FaTimes className="text-gray-400" /> : <FaCheck className="text-gray-400" />}
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
                                        <div className="bg-gray-700 p-3 rounded-lg text-white">"{fb.comment}"</div>
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
