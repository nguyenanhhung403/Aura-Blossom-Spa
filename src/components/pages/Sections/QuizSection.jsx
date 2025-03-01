import React from 'react';

const QuizSection = () => {
    return (
        <section id="quiz" className="w-full py-16 px-4 animate__animated animate__fadeInUp animate__delay-1s" style={{ backgroundColor: 'rgb(88, 137, 133)' }}>
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-8">
                    Trắc nghiệm
                </h2>
                
                <div className="text-center">
                    <button className="px-6 py-3 bg-[#446E6A] text-white rounded-full font-semibold hover:bg-[#375955] transition">
                        Bắt đầu trắc nghiệm
                    </button>
                </div>
            </div>
        </section>
    );
};

export default QuizSection;