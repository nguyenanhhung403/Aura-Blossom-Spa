import React from 'react';

const CTASection = () => {
    return (
        <div className="mt-12 flex flex-col items-center animate__animated animate__fadeInUp animate__delay-2s">
            <h3 className="text-xl font-semibold text-[#2F4F4F] mb-4 text-center">
                Bấm trả lời câu hỏi để được tư vấn thêm
            </h3>
            <button className="px-5 py-2 bg-[#CC9980] text-white font-semibold rounded-full hover:bg-[#b38670] transition">
                Trả lời câu hỏi
            </button>
        </div>
    );
};

export default CTASection;