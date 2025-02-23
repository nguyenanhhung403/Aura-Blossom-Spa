import React from 'react';
import { Link } from 'react-router-dom';
import logoSpa from '../../images/logoSpa.png';

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-50 bg-white shadow-sm animate__animated animate__fadeInDown">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link to="/home">
                        <img
                            src={logoSpa}
                            alt="Aura Blossom Logo"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                    </Link>
                    <span className="font-bold text-xl text-[#2F4F4F]">Aura Blossom</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 whitespace-nowrap">
                    <Link to="/login">
                        <button className="px-4 py-2 text-sm border border-[#446E6A] text-[#446E6A] rounded hover:bg-[#446E6A] hover:text-white transition">Đăng nhập</button>
                    </Link>
                    <Link to="/register">
                        <button className="px-4 py-2 text-sm bg-[#446E6A] text-white rounded hover:bg-[#375955] transition">Đăng ký</button>
                    </Link>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <nav className="hidden md:flex items-center space-x-3 text-sm font-medium text-[#2F4F4F] whitespace-nowrap">
                    <a href="#home" className="hover:text-[#446E6A] transition">Trang chủ</a>
                    <a href="#about" className="hover:text-[#446E6A] transition">Giới thiệu</a>
                    <a href="#services" className="hover:text-[#446E6A] transition">Dịch vụ</a>
                    <a href="#staff" className="hover:text-[#446E6A] transition">Chuyên viên</a>
                    <a href="#feedback" className="hover:text-[#446E6A] transition">Feedback</a>
                    <a href="#blog" className="hover:text-[#446E6A] transition">Blog</a>
                    <a href="#quiz" className="hover:text-[#446E6A] transition">Trắc nghiệm</a>
                    <a href="#reviews" className="hover:text-[#446E6A] transition">Nhận xét</a>
                    <a href="#contact" className="hover:text-[#446E6A] transition">Liên hệ</a>
                    <a href="#cart" className="hover:text-[#446E6A] transition">Giỏ hàng</a>
                    <a href="#history" className="hover:text-[#446E6A] transition">Lịch sử</a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
