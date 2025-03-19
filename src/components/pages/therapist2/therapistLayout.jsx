import React from "react";
import { Link, Outlet } from "react-router-dom";
import { 
  FaHome, FaCalendarAlt, FaHistory, FaCommentDots, 
  FaUserCircle, FaSignOutAlt, FaCog
} from "react-icons/fa";
import "./TherapistLayout.css"; // Import CSS

const therapistLayout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Bác Sĩ</h2>
        </div>

        <ul className="menu">
          <li>
            <Link to="/therapist">
              <FaHome className="icon" />
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link to="/therapist/schedule">
              <FaCalendarAlt className="icon" />
              Lịch làm việc cá nhân
            </Link>
          </li>
          <li>
            <Link to="/therapist/appointments">
              <FaHistory className="icon" />
              Lịch hẹn
            </Link>
          </li>
          <li>
            <Link to="/therapist/feedback">
              <FaCommentDots className="icon" />
              Đánh giá
            </Link>
          </li>
          <li>
            <Link to="/therapist/settings">
              <FaCog className="icon" />
              Cài đặt tài khoản
            </Link>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="user-info">
            <FaUserCircle className="icon" />
            <span>Bác sĩ</span>
          </div>
          <div className="logout">
            <Link to="/login">
              <FaSignOutAlt className="icon" />
              Đăng xuất
            </Link>
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

export default therapistLayout;
