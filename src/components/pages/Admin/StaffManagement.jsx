import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./SideBar";
import { Users, UserCog } from "lucide-react";

const EmployeeLanding = () => {
  // Mảng nhân viên mẫu
  const employees = [
    { id: 1, name: "Nguyễn Văn A" },
    { id: 2, name: "Trần Thị B" },
    { id: 3, name: "Lê Văn C" },
    { id: 4, name: "Phạm Thị D" },
    { id: 5, name: "Đỗ Văn E" },
  ];

  // Mảng chuyên viên điều trị mẫu
  const specialists = [
    { id: 1, name: "Chuyên viên X" },
    { id: 2, name: "Chuyên viên Y" },
    { id: 3, name: "Chuyên viên Z" },
  ];

  const StatCard = ({ title, count, icon, linkTo, color }) => (
    <div className={`bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-1 hover:bg-opacity-90`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
            {icon}
          </div>
          <span className="text-3xl font-bold text-white">{count}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>
        <Link
          to={linkTo}
          className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
        >
          Chi tiết
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Khu vực nội dung chính */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Quản Lý Nhân Sự</h1>
          <p className="text-gray-400 mt-7">Tổng quan về nhân viên và chuyên viên điều trị</p>
        </div>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-4 text-white shadow-lg">
            <h2 className="text-lg font-large mb-2">Tổng nhân sự</h2>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{employees.length + specialists.length}</span>
            </div>
          </div>
        </div>

        {/* Danh sách chi tiết */}
        <h2 className="text-xl font-bold text-white mb-4">Danh Mục Quản Lý</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Danh sách nhân viên"
            count={employees.length}
            icon={<Users size={24} className="text-blue-500" />}
            linkTo="/admin/employees/staff"
            color="bg-blue-500"
          />
          
          <StatCard
            title="Danh sách chuyên viên điều trị"
            count={specialists.length}
            icon={<UserCog size={24} className="text-purple-500" />}
            linkTo="/admin/employees/specialists"
            color="bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLanding;