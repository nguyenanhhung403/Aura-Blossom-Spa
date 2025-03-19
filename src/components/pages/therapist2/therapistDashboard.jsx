import React from "react";
import { FaCalendarAlt, FaHistory, FaComments, FaUserCog } from "react-icons/fa";


const TherapistDashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Bác Sĩ</h2>
        <ul>
          <li><FaCalendarAlt /> Lịch làm việc cá nhân</li>
          <li><FaHistory /> Lịch hẹn</li>
          <li><FaComments /> Đánh giá</li>
          <li><FaUserCog /> Cài đặt account</li>
        </ul>
        <div className="bottom-section">
          <span>Bác sĩ</span>
          <span>Đăng xuất</span>
        </div>
      </aside>
      <main className="main-content">
        <h1>Trang Chủ Bác Sĩ</h1>
        <div className="card-container">
          <div className="card">
            <FaCalendarAlt className="card-icon" />
            <h3>50</h3>
            <p>Lịch làm việc cá nhân</p>
            <button>Chi tiết</button>
          </div>
          <div className="card">
            <FaHistory className="card-icon" />
            <h3>50</h3>
            <p>Lịch hẹn</p>
            <button>Chi tiết</button>
          </div>
          <div className="card">
            <FaComments className="card-icon" />
            <h3>50</h3>
            <p>Đánh giá</p>
            <button>Chi tiết</button>
          </div>
          <div className="card">
            <FaUserCog className="card-icon" />
            <h3>50</h3>
            <p>Cài đặt account</p>
            <button>Chi tiết</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TherapistDashboard;
