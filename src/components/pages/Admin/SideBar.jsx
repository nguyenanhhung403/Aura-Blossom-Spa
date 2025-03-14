import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHome, FaServicestack, FaCalendarAlt, FaUserTie, FaUsers, 
  FaClock, FaQuestionCircle, FaBlog, FaCommentDots, FaChartBar, 
  FaUserCircle, FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#0e1726] min-h-screen text-white p-4 relative">
      {/* Logo / Tiêu đề */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-[Segoe_Script]">Quản Lý</h2>
      </div>

      {/* Danh sách menu */}
      <ul className="space-y-3">
        <li>
          <Link
            to="/admin/Home"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaHome className="mr-2" />
            Trang Chủ
          </Link>
        </li>
        <li>
          <Link
            to="/admin/services"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaServicestack className="mr-2" />
            Dịch vụ
          </Link>
        </li>
        <li>
          <Link
            to="/admin/appointments"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaCalendarAlt className="mr-2" />
            Lịch hẹn
          </Link>
        </li>
        <li>
          <Link
            to="/admin/employees"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaUserTie className="mr-2" />
            Nhân viên
          </Link>
        </li>
        <li>
          <Link
            to="/admin/customers"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaUsers className="mr-2" />
            Khách hàng
          </Link>
        </li>
        <li>
          <Link
            to="/admin/schedules"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaClock className="mr-2" />
            Lịch làm việc
          </Link>
        </li>
        <li>
          <Link
            to="/admin/quizlist"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaQuestionCircle className="mr-2" />
            Quiz
          </Link>
        </li>
        <li>
          <Link
            to="/admin/blogs"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaBlog className="mr-2" />
            Blogs
          </Link>
        </li>
        <li>
          <Link
            to="/admin/feedback"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaCommentDots className="mr-2" />
            Feedback
          </Link>
        </li>
        <li>
          <Link
            to="/admin/dashboard"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaChartBar className="mr-2" />
            Báo cáo
          </Link>
        </li>
      </ul>

      {/* Phần hiển thị thông tin Admin, nút "Trang Home" và "Đăng xuất" */}
      <div className="absolute bottom-4 left-4 right-4 border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <FaUserCircle className="mr-2 text-xl" />
            <span className="text-base font-medium">Admin</span>
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
  );
};

export default Sidebar;
