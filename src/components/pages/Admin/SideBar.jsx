import React from 'react';
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
          <a
            href="/admin/Home"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaHome className="mr-2" />
            Trang Chủ
          </a>
        </li>
        <li>
          <a
            href="/admin/services"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaServicestack className="mr-2" />
            Dịch vụ
          </a>
        </li>
        <li>
          <a
            href="/admin/appointments"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaCalendarAlt className="mr-2" />
            Lịch hẹn
          </a>
        </li>
        <li>
          <a
            href="/admin/employees"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaUserTie className="mr-2" />
            Nhân viên
          </a>
        </li>
        <li>
          <a
            href="/admin/customers"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaUsers className="mr-2" />
            Khách hàng
          </a>
        </li>
        <li>
          <a
            href="/admin/schedules"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaClock className="mr-2" />
            Lịch làm việc
          </a>
        </li>
        <li>
          <a
            href="/admin/quiz"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaQuestionCircle className="mr-2" />
            Quiz
          </a>
        </li>
        <li>
          <a
            href="/admin/blogs"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaBlog className="mr-2" />
            Blogs
          </a>
        </li>
        <li>
          <a
            href="/admin/feedback"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaCommentDots className="mr-2" />
            Feedback
          </a>
        </li>
        <li>
          <a
            href="/admin/dashboard"
            className="flex items-center px-3 py-2 rounded transition-colors duration-200 hover:bg-[#1c2a3d]"
          >
            <FaChartBar className="mr-2" />
            Báo cáo
          </a>
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
            <a
              href="/"
              className="flex items-center text-sm text-indigo-400 hover:text-indigo-300"
              title="Trang Home"
            >
              <FaHome className="mr-1" />
              <span>Trang Home</span>
            </a>
            <a
              href="/login"
              className="flex items-center text-sm text-red-400 hover:text-red-300"
              title="Đăng xuất"
            >
              <FaSignOutAlt className="mr-1" />
              <span>Đăng xuất</span>
            </a>
          </div>
      </div>
    </div>
  );
};

export default Sidebar;
