import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { auth } from "../config/firebase";
import logoSpa from "../images/logoSpa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faTimes,
  faHome,
  faInfoCircle,
  faConciergeBell,
  faQuestionCircle,
  faUsers,
  faComments,
  faBlog,
  faPhone,
  faUser,
  faHistory,
  faSignOutAlt,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { faSpa } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const guestUser = {
  //   displayName: "Khách",
  //   email: "guest@example.com"
  // };

  // const handleGuestLogin = () => {
  //   setUser(guestUser);
  // };

  const handleLogout = async () => {
    try {
        // await local.signOut();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.clear();
        sessionStorage.clear();
        setUser(null);
        window.location.href = "/login";
        window.location.reload();
    } catch (error) {
        console.error("Logout error:", error);
    }
};

  // Kiểm tra xem người dùng có role STAFF hoặc ADMIN không
  const hasAdminAccess = () => {
    if (!user || !user.roles) return false;
    return user.roles.some(role => role.name === "ADMIN");
  };

  const hasStaffAccess = () => {
    if (!user || !user.roles) return false;
    return user.roles.some(role => role.name === "STAFF");
  };
  const hasTherapistAccess = () => {
    if (!user || !user.roles) return false;
    return user.roles.some(role => role.name === "THERAPIST");
  };
  // Điều hướng đến trang quản lý phù hợp dựa vào role
  const navigateToManagement = () => {
    if (hasAdminAccess()) {
      navigate("/admin");
    } else if (hasStaffAccess()) {
      navigate("/staff");
    } else if (hasTherapistAccess()) {
      navigate("/therapist2");
    }
    setIsDropdownOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };
  console.log( "user", user);
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
          <span
            className="font-bold text-3xl text-[#2F4F4F] font-serif"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            <Link to="/" onClick={scrollToTop}>Aura Blossom</Link>
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6 whitespace-nowrap">
          {user ? (
            <div className="relative flex items-center space-x-2">
              <span
                className="text-xl font-bold text-[#2F4F4F] font-serif"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                {user?.fullName || user?.displayName}
              </span>
              <button
                onClick={toggleDropdown}
                className="relative flex items-center focus:outline-none"
                aria-label="Mở menu người dùng"
              >
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className={`text-3xl ${
                    isDropdownOpen ? 'text-[#375955]' : 'text-[#446E6A]'
                  } hover:text-[#375955] transition-colors duration-200`}
                />
              </button>
              {isDropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 transform transition-all duration-300 ease-in-out origin-top-right z-50"
                >                  
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                    >
                      <FontAwesomeIcon icon={faUser} className="text-[#446E6A] w-5 h-5" />
                      <span>Thông tin tài khoản</span>
                    </Link>

                    <Link
                      to="/history"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                    >
                      <FontAwesomeIcon icon={faHistory} className="text-[#446E6A] w-5 h-5" />
                      <span>Lịch sử</span>
                    </Link>
                    
                    {(hasStaffAccess() || hasAdminAccess() || hasTherapistAccess()) && (
                      <button
                        onClick={navigateToManagement}
                        className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                      >
                        <FontAwesomeIcon icon={faCog} className="text-[#446E6A] w-5 h-5" />
                        <span>Quản lý</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t border-gray-100 p-2">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center space-x-3"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* <button
                // onClick={handleGuestLogin}
                className="px-4 py-2 text-xl font-bold border border-[#446E6A] text-[#446E6A] rounded hover:bg-[#446E6A] hover:text-white transition"
                style={{ fontFamily: "Roboto, sans-serif" }}
              >
                Xem với tư cách khách
              </button> */}
              <Link to="/login">
                <button
                  className="px-4 py-2 text-xl font-bold border border-[#446E6A] text-[#446E6A] rounded hover:bg-[#446E6A] hover:text-white transition"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Đăng nhập
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="px-4 py-2 text-xl font-bold bg-[#446E6A] text-white rounded hover:bg-[#375955] transition"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Đăng ký
                </button>
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
      <div
        className={`md:flex justify-center mt-4 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <nav
          className="flex flex-col md:flex-row items-center space-x-4 text-xl font-bold text-[#2F4F4F] font-serif whitespace-nowrap"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          <a
            href="/#home"
            onClick={scrollToTop}
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Trang chủ</span>
          </a>
          <a
            href="/#about"
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            <span>Giới thiệu</span>
          </a>
          <a
            href="/#services"
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faSpa} /> {/* Changed icon here */}
            <span>Dịch vụ</span>
          </a>
          <a
            href="/#quiz"
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Trắc nghiệm</span>
          </a>
          <a
            href="/therapist"
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Chuyên viên</span>
          </a>
          <a
            href="/#feedback"
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faComments} />
            <span>Feedback</span>
          </a>
          <a
            href="/blog"
            className="hover:text-[#446E6A] transition flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faBlog} />
            <span>Blog</span>
          </a>
          <button onClick={scrollToBottom} className="hover:text-[#446E6A] transition flex items-center space-x-2">
  <FontAwesomeIcon icon={faPhone} />
  <span>Liên hệ</span>
</button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
