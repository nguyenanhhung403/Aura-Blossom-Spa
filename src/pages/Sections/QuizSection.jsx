import React from 'react';

const QuizSection = () => {
    return (
        <section id="quiz" className="py-16 px-4 max-w-7xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
            <h2 className="text-3xl font-bold text-[#2F4F4F] text-center mb-8">
                Trắc nghiệm
            </h2>
            <p className="text-center text-gray-700 max-w-2xl mx-auto mb-12">
                Tham gia trắc nghiệm để hiểu rõ hơn về làn da của bạn và nhận tư vấn phù hợp từ chuyên gia của chúng tôi.
            </p>
            <div className="text-center">
                <button className="px-6 py-3 bg-[#446E6A] text-white rounded-full font-semibold hover:bg-[#375955] transition">
                    Bắt đầu trắc nghiệm
                </button>
            </div>
        </section>
    );
};

export default QuizSection;
