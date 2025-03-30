import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { toast } from 'react-toastify';
import { getMyHistoricalAppointments } from '../service/appointmentApi';
import { createRating } from '../service/ratingApi';

const RateService = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    
    const [selectedAppointment, setSelectedAppointment] = useState('');
    const [formData, setFormData] = useState({
        rating: 5,
        comment: ''
    });

    // Fetch historical appointments của user
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await getMyHistoricalAppointments();
                if (response?.code === 1000) {
                    // Lọc các appointments đã hoàn thành và chưa được đánh giá
                    const unratedAppointments = response.result.filter(app => 
                        app.status === 'COMPLETED' && !app.isRated
                    );
                    setAppointments(unratedAppointments);
                }
            } catch (error) {
                console.error('Error fetching appointments:', error);
                toast.error('Không thể tải danh sách lịch hẹn');
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const handleAppointmentChange = (e) => {
        const appointmentId = e.target.value;
        setSelectedAppointment(appointmentId);
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAppointment) {
            toast.warning('Vui lòng chọn lịch hẹn cần đánh giá');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await createRating(selectedAppointment, {
                stars: formData.rating,
                feedback: formData.comment
            });

            if (response?.code === 1000) {
                toast.success('Cảm ơn bạn đã gửi đánh giá!');
                navigate('/');
            } else {
                throw new Error(response?.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error(error.message || 'Có lỗi xảy ra khi gửi đánh giá');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="pt-36 pb-12 px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-36 pb-12 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đánh giá dịch vụ</h2>
                    
                    {appointments.length === 0 ? (
                        <div className="text-center text-gray-600">
                            Bạn chưa có lịch hẹn nào cần đánh giá
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Chọn lịch hẹn */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Chọn lịch hẹn cần đánh giá
                                </label>
                                <select
                                    value={selectedAppointment}
                                    onChange={handleAppointmentChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                                >
                                    <option value="">-- Chọn lịch hẹn --</option>
                                    {appointments.map(appointment => (
                                        <option key={appointment.id} value={appointment.id}>
                                            {`${appointment.service.name} - ${appointment.therapist.fullname} - ${new Date(appointment.date).toLocaleDateString('vi-VN')}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating stars */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Đánh giá của bạn
                                </label>
                                <div className="flex justify-center space-x-2 my-4">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingChange(star)}
                                            className="focus:outline-none"
                                        >
                                            <svg
                                                className={`w-10 h-10 ${star <= formData.rating ? 'text-yellow-500' : 'text-gray-300'} 
                                                        hover:text-yellow-400 transition-colors duration-200`}
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-center text-gray-600">
                                    {formData.rating === 1 && 'Rất không hài lòng'}
                                    {formData.rating === 2 && 'Không hài lòng'}
                                    {formData.rating === 3 && 'Bình thường'}
                                    {formData.rating === 4 && 'Hài lòng'}
                                    {formData.rating === 5 && 'Rất hài lòng'}
                                </p>
                            </div>

                            {/* Nhận xét */}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Nhận xét của bạn
                                </label>
                                <textarea
                                    value={formData.comment}
                                    onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                                    required
                                    rows="4"
                                    placeholder="Chia sẻ trải nghiệm của bạn..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                                ></textarea>
                            </div>

                            {/* Submit button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-colors
                                            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RateService;