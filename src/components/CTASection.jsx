import React from 'react';

const CTASection = () => {
    return (
        <div className="mt-12 text-center animate__animated animate__fadeInUp animate__delay-2s">
            <h3 className="text-xl font-semibold text-[#2F4F4F] mb-4">
                Bấm trả lời câu hỏi để được tư vấn thêm
            </h3>
            <button className="px-5 py-2 bg-[#CC9980] text-white font-semibold rounded-full mr-4 hover:bg-[#b38670] transition">
                Trả lời câu hỏi
            </button>
            <button className="px-5 py-2 bg-white text-[#2F4F4F] border border-[#2F4F4F] font-semibold rounded-full mr-4 hover:bg-[#2F4F4F] hover:text-white transition">
                Bảng giá
            </button>
            <button className="px-5 py-2 bg-white text-[#2F4F4F] border border-[#2F4F4F] font-semibold rounded-full hover:bg-[#2F4F4F] hover:text-white transition">
                Đặt lịch
            </button>
        </div>
    );
};

export default CTASection;
