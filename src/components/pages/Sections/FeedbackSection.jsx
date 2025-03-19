import React from 'react';
import { Link } from 'react-router-dom';

const feedbacks = [
    {
        id: 1,
        text: "Tôi rất hài lòng với dịch vụ tại spa. Các chuyên viên rất chuyên nghiệp và tận tâm. Sau khi sử dụng dịch vụ chăm sóc da mặt, làn da của tôi trở nên sáng mịn và căng bóng. Tôi nhất định sẽ quay lại và giới thiệu cho bạn bè.",
        rating: 5,
        delay: ""
    },
    {
        id: 2,
        text: "Spa có không gian rất thư giãn và dễ chịu. Các dịch vụ tẩy lông ở đây không đau, hiệu quả rõ rệt ngay từ lần đầu tiên. Tôi cảm thấy rất thoải mái và tự tin hơn với làn da mịn màng sau khi tẩy lông. Chắc chắn tôi sẽ trở thành khách hàng thường xuyên.",
        rating: 4,
        delay: "animate__delay-1s"
    },
    {
        id: 3,
        text: "Tôi đã thử liệu trình massage toàn thân tại spa, cảm giác thư giãn tuyệt vời. Các chuyên viên rất chu đáo, luôn hỏi tôi cảm thấy như thế nào trong suốt quá trình điều trị. Đặc biệt, tôi rất thích không gian ấm cúng và yên tĩnh ở đây.",
        rating: 4,
        delay: "animate__delay-2s"
    }
];

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
    return (
        <section id="feedback" className="w-full py-16 px-4 animate__animated animate__fadeInUp animate__delay-2s" style={{ backgroundColor: 'rgb(142, 163, 150)' }}>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">Feedback của khách hàng</h2>
                <p className="text-center text-gray-200 max-w-2xl mx-auto mb-12">
                    Spa là không gian thư giãn, cung cấp các dịch vụ chăm sóc sức khoẻ, giúp khách hàng xua tan căng thẳng.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {feedbacks.map(({ id, text, rating, delay }) => (
                        <div 
                            key={id} 
                            className={`bg-white p-6 rounded-lg shadow text-center animate__animated animate__fadeInUp ${delay} transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                        >
                            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
                            <p className="text-sm text-gray-600">{text}</p>
                            <StarRating rating={rating} />
                        </div>
                    ))}
                </div>
                
                <div className="mt-10 flex justify-center space-x-4">
                    {/* <Link 
                        to="/rate-service" 
                        className="bg-white text-[rgb(88,137,133)] hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Đánh giá dịch vụ
                    </Link> */}
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