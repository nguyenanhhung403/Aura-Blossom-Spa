import React from 'react';
import heroImage from '../../images/AnhSuMenh/SuMenh.jpg';

const HeroSection = () => {
    return (
        <section
            id="home"
            className="relative h-screen flex items-center justify-center bg-cover bg-center animate__animated animate__fadeIn"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 max-w-2xl mx-auto text-center text-white px-4 animate__animated animate__fadeInUp animate__delay-1s">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    "Tỏa sáng như hoa, vẻ đẹp nở rộ theo thời gian."
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Hệ thống spa hàng đầu Việt Nam
                </p>
                <button className="px-6 py-3 bg-[#446E6A] text-white rounded-full font-semibold hover:bg-[#375955] transition animate__animated animate__pulse animate__delay-2s">
                    Đặt lịch ngay
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
