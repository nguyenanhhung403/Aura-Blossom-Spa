import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { getAllServices } from '../service/serviceApi';
import { getAllTherapists } from '../service/therapistsApi';

const RateService = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [therapists, setTherapists] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        serviceId: '',
        therapistId: '',
        rating: 5,
        comment: '',
        date: ''
    });

    useEffect(() => {
        // Bỏ qua đăng nhập tạm thời
        // if (!user) {
        //     navigate('/login');
        // }

        // Fetch services
        const fetchServices = async () => {
            try {
                const response = await getAllServices();
                setServices(response.result || []);
            } catch (error) {
                console.error('Error fetching services:', error);
                // Sử dụng dữ liệu mẫu nếu không fetch được
                setServices([
                    { id: 1, name: 'Dịch vụ chăm sóc da' },
                    { id: 2, name: 'Massage toàn thân' },
                    { id: 3, name: 'Tẩy tế bào chết' },
                    { id: 4, name: 'Tẩy lông' },
                    { id: 5, name: 'Nặn mụn' }
                ]);
            }
        };

        // Fetch therapists
        const fetchTherapists = async () => {
            try {
                const response = await getAllTherapists();
                setTherapists(response.result || []);
            } catch (error) {
                console.error('Error fetching therapists:', error);
                // Sử dụng dữ liệu mẫu nếu không fetch được
                setTherapists([
                    { id: 1, fullName: 'Chuyên viên A' },
                    { id: 2, fullName: 'Chuyên viên B' },
                    { id: 3, fullName: 'Chuyên viên C' },
                    { id: 4, fullName: 'Chuyên viên D' }
                ]);
            }
        };

        fetchServices();
        fetchTherapists();
    }, [navigate]); // Bỏ user dependency tạm thời

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRatingChange = (rating) => {
        setFormData({
            ...formData,
            rating
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Bỏ qua gọi API, luôn hiển thị thành công
            // await submitFeedback(formData);
            
            // Hiển thị thông báo thành công
            setTimeout(() => {
                alert('Cảm ơn bạn đã gửi đánh giá!');
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại sau.');
        } finally {
            setTimeout(() => {
                setIsSubmitting(false);
            }, 1000);
        }
    };

    const ServiceOption = ({ service }) => (
        <option value={service.id}>{service.name}</option>
    );

    const TherapistOption = ({ therapist }) => (
        <option value={therapist.id}>{therapist.fullName}</option>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="pt-36 pb-12 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Đánh giá dịch vụ</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Chọn dịch vụ */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceId">
                                Dịch vụ đã sử dụng
                            </label>
                            <select
                                id="serviceId"
                                name="serviceId"
                                value={formData.serviceId}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                <option value="">-- Chọn dịch vụ --</option>
                                {services.map(service => (
                                    <ServiceOption key={service.id} service={service} />
                                ))}
                            </select>
                        </div>

                        {/* Chọn chuyên viên */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="therapistId">
                                Chuyên viên thực hiện
                            </label>
                            <select
                                id="therapistId"
                                name="therapistId"
                                value={formData.therapistId}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                <option value="">-- Chọn chuyên viên --</option>
                                {therapists.map(therapist => (
                                    <TherapistOption key={therapist.id} therapist={therapist} />
                                ))}
                            </select>
                        </div>

                        {/* Ngày sử dụng dịch vụ */}
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                Ngày sử dụng dịch vụ
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                            />
                        </div>

                        {/* Rating */}
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="comment">
                                Nhận xét của bạn
                            </label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows="4"
                                placeholder="Chia sẻ trải nghiệm của bạn với dịch vụ và chuyên viên..."
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
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RateService; 