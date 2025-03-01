import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { auth } from '../config/firebase';
import logoSpa from '../images/logoSpa.png';
import { logoutUser } from "../service/authApi.js";
import { ACCESS_TOKEN } from "../service/api.js";

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (loading) return;

        setLoading(true);
        try {
            await auth.signOut();
            const token = localStorage.getItem(ACCESS_TOKEN);
            await logoutUser({token});
            setUser(null);
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem("user");
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-white shadow-sm animate__animated animate__fadeInDown">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link to="/home" onClick={scrollToTop}>
                        <img
                            src={logoSpa}
                            alt="Aura Blossom Logo"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                    </Link>
                    <span className="font-bold text-xl text-[#2F4F4F]">Aura Blossom</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 whitespace-nowrap">
                    {user ? (
                        <>
                            <span className="text-sm text-[#2F4F4F]">Welcome, {user.displayName}</span>
                            <button
                                disabled={loading}
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                                {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="px-4 py-2 text-sm border border-[#446E6A] text-[#446E6A] rounded hover:bg-[#446E6A] hover:text-white transition">Đăng nhập</button>
                            </Link>
                            <Link to="/register">
                                <button className="px-4 py-2 text-sm bg-[#446E6A] text-white rounded hover:bg-[#375955] transition">Đăng ký</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <nav className="hidden md:flex items-center space-x-3 text-sm font-medium text-[#2F4F4F] whitespace-nowrap">
                    <a href="#home" onClick={scrollToTop} className="hover:text-[#446E6A] transition">Trang chủ</a>
                    <a href="#about" className="hover:text-[#446E6A] transition">Giới thiệu</a>
                    <a href="#services" className="hover:text-[#446E6A] transition">Dịch vụ</a>
                    <a href="#quiz" className="hover:text-[#446E6A] transition">Trắc nghiệm</a>
                    <a href="#staff" className="hover:text-[#446E6A] transition">Chuyên viên</a>
                    <a href="#feedback" className="hover:text-[#446E6A] transition">Feedback</a>
                    <a href="#blog" className="hover:text-[#446E6A] transition">Blog</a>
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