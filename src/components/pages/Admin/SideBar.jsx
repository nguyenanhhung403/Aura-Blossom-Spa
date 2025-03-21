import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaServicestack, 
  FaCalendarAlt, 
  FaUsers, 
  FaClock, 
  FaQuestionCircle, 
  FaBlog, 
  FaCommentDots, 
  FaChartBar,
  FaUserMd,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-64 bg-[#0e1726] min-h-screen text-white p-4">
      {/* Logo / Tiêu đề */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-[Segoe_Script]">Trang Chủ</h2>
      </div>

      {/* Danh sách menu */}
      <ul className="space-y-2">
        <li>
          <Link to="/admin/trang-chu" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaHome className="mr-3" />
            Trang Chủ
          </Link>
        </li>

        <li>
          <Link to="/admin/services" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaServicestack className="mr-3" />
            Dịch vụ
          </Link>
        </li>

        <li>
          <Link to="/admin/appointments" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaCalendarAlt className="mr-3" />
            Lịch hẹn
          </Link>
        </li>

        <li>
          <Link to="/admin/therapists" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaUserMd className="mr-3" />
            Nhân viên
          </Link>
        </li>

        <li>
          <Link to="/admin/customers" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaUsers className="mr-3" />
            Khách hàng
          </Link>
        </li>

        <li>
          <Link to="/admin/schedules" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaClock className="mr-3" />
            Lịch làm việc
          </Link>
        </li>

        <li>
          <Link to="/admin/quiz" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaQuestionCircle className="mr-3" />
            Quiz
          </Link>
        </li>

        <li>
          <Link to="/admin/blogs" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaBlog className="mr-3" />
            Blogs
          </Link>
        </li>

        <li>
          <Link to="/admin/feedback" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaCommentDots className="mr-3" />
            Feedback
          </Link>
        </li>

        <li>
          <Link to="/admin/reports" className="flex items-center px-4 py-2 hover:bg-[#1c2a3d] rounded">
            <FaChartBar className="mr-3" />
            Báo cáo
          </Link>
        </li>

        <li className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center py-2 px-4 hover:bg-gray-700 rounded text-red-400 hover:text-red-300"
          >
            <FaSignOutAlt className="mr-2" />
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
