import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { auth } from '../config/firebase';
import logoSpa from '../images/logoSpa.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faBars, faTimes, faHome, faInfoCircle, faConciergeBell, faQuestionCircle, faUsers, faComments, faBlog, faPhone, faUser, faHistory, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className="fixed top-0 w-full z-50 bg-white shadow-md animate__animated animate__fadeInDown">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Link to="/" onClick={scrollToTop}>
                        <img
                            src={logoSpa}
                            alt="Aura Blossom Logo"
                            className="w-10 h-10 object-cover rounded-full"
                        />
                    </Link>
                    <span className="font-bold text-3xl text-[#2F4F4F] font-serif" style={{ fontFamily: 'Roboto, sans-serif' }}>Aura Blossom</span>
                </div>
                <div className="hidden md:flex items-center space-x-6 whitespace-nowrap">
                    {user ? (
                        <div className="relative flex items-center space-x-2">
                            <span className="text-xl font-bold text-[#2F4F4F] font-serif" style={{ fontFamily: 'Roboto, sans-serif' }}>{user.displayName}</span>
                            <div className="relative" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                                <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-[#446E6A] hover:text-[#375955] transition cursor-pointer" />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-1 w-48 bg-[#446E6A] border border-gray-200 rounded-lg shadow-lg z-50">
                                        <Link to="/profile" className="block px-4 py-2 text-white hover:bg-[#375955] flex items-center space-x-2">
                                            <FontAwesomeIcon icon={faUser} />
                                            <span>Thông tin tài khoản</span>
                                        </Link>
                                        <Link to="/support" className="block px-4 py-2 text-white hover:bg-[#375955] flex items-center space-x-2">
                                            <FontAwesomeIcon icon={faComments} />
                                            <span>Hỗ trợ</span>
                                        </Link>
                                        <Link to="/history" className="block px-4 py-2 text-white hover:bg-[#375955] flex items-center space-x-2">
                                            <FontAwesomeIcon icon={faHistory} />
                                            <span>Lịch sử</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-white hover:bg-[#375955] flex items-center space-x-2"
                                        >
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span>Đăng xuất</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="px-4 py-2 text-xl font-bold border border-[#446E6A] text-[#446E6A] rounded hover:bg-[#446E6A] hover:text-white transition" style={{ fontFamily: 'Roboto, sans-serif' }}>Đăng nhập</button>
                            </Link>
                            <Link to="/register">
                                <button className="px-4 py-2 text-xl font-bold bg-[#446E6A] text-white rounded hover:bg-[#375955] transition" style={{ fontFamily: 'Roboto, sans-serif' }}>Đăng ký</button>
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-3xl text-[#446E6A]">
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
                    </button>
                </div>
            </div>
            <div className={`md:flex justify-center mt-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <nav className="flex flex-col md:flex-row items-center space-x-4 text-xl font-bold text-[#2F4F4F] font-serif whitespace-nowrap" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    <a href="/#home" onClick={scrollToTop} className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Trang chủ</span>
                    </a>
                    <a href="/#about" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <span>Giới thiệu</span>
                    </a>
                    <a href="/#services" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faConciergeBell} />
                        <span>Dịch vụ</span>
                    </a>
                    <a href="/#quiz" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faQuestionCircle} />
                        <span>Trắc nghiệm</span>
                    </a>
                    <a href="/#staff" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Chuyên viên</span>
                    </a>
                    <a href="/#feedback" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faComments} />
                        <span>Feedback</span>
                    </a>
                    <a href="/blog" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faBlog} />
                        <span>Blog</span>
                    </a>
                    <a href="/#contact" className="hover:text-[#446E6A] transition flex items-center space-x-2">
                        <FontAwesomeIcon icon={faPhone} />
                        <span>Liên hệ</span>
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;