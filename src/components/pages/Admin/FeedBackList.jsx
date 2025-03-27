import React, { useState, useEffect } from "react";
import { FaTrash, FaStar } from "react-icons/fa";
import Sidebar from "./SideBar";
import { getAllRatings, deleteRating } from '../../service/ratingApi.js';

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await getAllRatings();
                console.log('API Response:', response);
                
                // Thử các trường hợp khác nhau
                const data = response?.data || response?.result || response;
                
                if (Array.isArray(data)) {
                    setFeedbacks(data);
                } else {
                    console.error('Invalid data format:', data);
                    setFeedbacks([]);
                }
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa feedback này?")) {
            try {
                await deleteRating(id);
                setFeedbacks(prev => prev.filter(fb => fb.id !== id));
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

    if (loading) {
        return <div className="text-white p-4">Đang tải...</div>;
    }

    return (
        <div className="flex min-h-screen bg-gray-900">
            <Sidebar />
            <div className="flex-1 p-4">
                <h1 className="text-white text-2xl mb-4">Danh sách Feedback</h1>
                
                {feedbacks.length > 0 ? (
                    <div className="space-y-4">
                        {feedbacks.map((fb) => (
                            <div key={fb.id} className="bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            {renderStars(fb.stars)}
                                            <span className="ml-2 text-white">{fb.stars}/5</span>
                                        </div>
                                        <p className="text-white">{fb.feedback}</p>
                                        <p className="text-gray-400 text-sm mt-2">
                                            {new Date(fb.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(fb.id)}
                                        className="text-red-500 hover:text-red-400"
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
            </div>
        </div>
    );
};

export default FeedbackList;