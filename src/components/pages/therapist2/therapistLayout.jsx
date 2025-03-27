import React from "react";
import "../../../App.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCalendarAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

const TherapistLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Chuyên viên</h2>
        </div>

        <ul className="menu">
          <li>
            <Link to="/therapist2">
              <FaHome className="icon" />
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/therapist2/schedule">
              <FaCalendarAlt className="icon" />
              Lịch làm việc cá nhân
            </Link>
          </li>
          <li>
            <Link to="/therapist2/settings">
              <FaCog className="icon" />
              Cài đặt tài khoản
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">Chuyên viên</span>
          </div>
          <div className="user-actions">
            <Link to="/" className="home-link">
              <FaHome className="icon" /> Trang Chủ
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Đăng xuất
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default TherapistLayout;