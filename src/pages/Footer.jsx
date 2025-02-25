import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#2F4F4F] text-white py-8 animate__animated animate__fadeInUp animate__delay-2s">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between">
                <div className="mb-4 md:mb-0">
                    <h3 className="font-bold text-xl">Aura Blossom Spa</h3>
                    <p className="text-sm text-gray-200">
                        © {new Date().getFullYear()} Aura Blossom. All rights reserved.
                    </p>
                </div>
                <div className="flex space-x-4 text-sm">
                    <a href="#home" className="hover:text-gray-300">Trang chủ</a>
                    <a href="#about" className="hover:text-gray-300">Giới thiệu</a>
                    <a href="#services" className="hover:text-gray-300">Dịch vụ</a>
                    <a href="#staff" className="hover:text-gray-300">Chuyên viên</a>
                    <a href="#feedback" className="hover:text-gray-300">Feedback</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
