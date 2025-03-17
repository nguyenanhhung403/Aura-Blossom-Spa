import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { 
  FaHome, FaCalendarAlt, FaHistory, FaCommentDots, 
  FaUserCircle, FaSignOutAlt, FaCog
} from 'react-icons/fa';

const StaffLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#0e1726] min-h-screen text-white p-4 relative">
        {/* Logo / Tiêu đề */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold font-[Segoe_Script]">Nhân Viên</h2>
        </div>

        {/* Danh sách menu */}
        <ul className="space-y-3">
          <li>
            <Link
              to="/staff"
              className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
            >
              <FaHome className="mr-2" />
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link
              to="/staff/appointments"
              className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
            >
              <FaCalendarAlt className="mr-2" />
              Lịch hẹn
            </Link>
          </li>
          <li>
            <Link
              to="/staff/history"
              className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
            >
              <FaHistory className="mr-2" />
              Lịch sử thanh toán
            </Link>
          </li>
          <li>
            <Link
              to="/staff/feedback"
              className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
            >
              <FaCommentDots className="mr-2" />
              Feedback
            </Link>
          </li>
          <li>
            <Link
              to="/staff/settings"
              className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
            >
              <FaCog className="mr-2" />
              Cài đặt tài khoản
            </Link>
          </li>
        </ul>

        {/* Phần hiển thị thông tin và nút đăng xuất */}
        <div className="absolute bottom-4 left-4 right-4 border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaUserCircle className="mr-2 text-xl" />
              <span className="text-base font-medium">Nhân viên</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/"
              className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
              title="Trang Home"
            >
              <FaHome className="mr-1" />
              <span>Trang Home</span>
            </Link>
            <Link
              to="/login"
              className="flex items-center text-sm text-red-400 hover:text-red-300"
              title="Đăng xuất"
            >
              <FaSignOutAlt className="mr-1" />
              <span>Đăng xuất</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-[#0f172a]">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StaffLayout;
