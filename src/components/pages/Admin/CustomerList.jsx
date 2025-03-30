import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Sidebar from "../Admin/SideBar";
import { toast } from 'react-toastify';
import { getAllUsers, updateUser, deleteUser, changePassword, adminResetPassword } from "../../service/userApi";
import 'react-toastify/dist/ReactToastify.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({
    password: '',
    confirmPassword: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      console.log('API Response:', response);

      if (response?.code === 1000) {
        setCustomers(response.result);
      } else {
        throw new Error(response?.message || 'Không thể tải danh sách khách hàng');
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError(error.message);
      toast.error("Lỗi khi tải danh sách khách hàng");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (customer) => {
    setEditedCustomer({
      id: customer.id,
      password: '',
      confirmPassword: ''
    });
    setIsEditModalOpen(true);
    setEditingId(customer.id);
  };

  const handleSave = async (id) => {
    try {
      if (editedCustomer.password !== editedCustomer.confirmPassword) {
        toast.error('Mật khẩu xác nhận không khớp!');
        return;
      }

      if (editedCustomer.password.length < 6) {
        toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
        return;
      }

      const passwordData = {
        userId: id,
        newPassword: editedCustomer.password,
        confirmPassword: editedCustomer.confirmPassword
      };

      const response = await adminResetPassword(passwordData);
      
      if (response?.code === 1000) {
        toast.success('Đặt lại mật khẩu thành công!');
        setIsEditModalOpen(false);
        setEditedCustomer({ password: '', confirmPassword: '' });
      } else {
        throw new Error(response?.message || 'Có lỗi xảy ra khi đặt lại mật khẩu!');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error(error.message || 'Có lỗi xảy ra khi đặt lại mật khẩu!');
    }
  };

  const handleDelete = async (customer) => {
    try {
      // Kiểm tra xem user có phải là therapist không
      const isTherapist = customer.roles?.some(role => 
        role.name?.includes('THERAPIST') || role === 'THERAPIST'
      );

      // Hiển thị cảnh báo khác nhau cho therapist và user thường
      const confirmMessage = isTherapist 
        ? "Bạn có chắc muốn xóa therapist này? Hành động này sẽ xóa tất cả các dịch vụ và lịch hẹn liên quan."
        : "Bạn có chắc muốn xóa người dùng này?";

      if (window.confirm(confirmMessage)) {
        console.log('Deleting user:', customer);
        const response = await deleteUser(customer.id);
        
        if (response?.code === 1000) {
          toast.success("Xóa người dùng thành công");
          fetchCustomers(); // Refresh danh sách
        } else {
          throw new Error(response?.message || 'Lỗi không xác định khi xóa người dùng');
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      if (error.message.includes('Therapist not found')) {
        toast.error("Không thể xóa: Therapist này đang có lịch hẹn hoặc dịch vụ liên quan");
      } else {
        toast.error(error.message || "Lỗi khi xóa người dùng");
      }
    }
  };

  // Xử lý tìm kiếm
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.id?.toString().includes(searchTerm.toLowerCase()) ||
      (customer.username || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.fullname || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone || '').includes(searchTerm) ||
      (customer.role?.[0]?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentItems = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-900 justify-center items-center">
        <div className="text-white">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Quản lý Account</h1>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center space-x-4">
          <div className="relative">
              <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
                placeholder="Tìm kiếm account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>
          </div>
        </div>

        {/* Bảng danh sách */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full text-sm text-left text-gray-200">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Họ tên</th>
                <th className="px-6 py-3">Số điện thoại</th>
                <th className="px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-700">
                    <td className="px-6 py-4">#{customer.id}</td>
                    <td className="px-6 py-4">{customer.username || '-'}</td>
                    <td className="px-6 py-4">{customer.email || '-'}</td>
                    <td className="px-6 py-4">{customer.fullname || '-'}</td>
                    <td className="px-6 py-4">{customer.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-blue-400 hover:text-blue-300"
                          title="Đổi mật khẩu"
                        >
                          <FaEdit />
                        </button>
                      </div>
                      </td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                    Không có dữ liệu account
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-gray-700 flex justify-between items-center">
            <div className="text-gray-400">
              Trang {currentPage} / {totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-700 text-gray-500"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Trước
              </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-700 text-gray-500"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                Sau
              </button>
            </div>
          </div>
        )}

        {/* Modal chỉnh sửa */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <h2 className="text-xl font-bold text-white mb-4">Đổi mật khẩu</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1">Mật khẩu mới</label>
                  <input
                    type="text"
                    value={editedCustomer.password}
                    onChange={(e) => setEditedCustomer({
                      ...editedCustomer,
                      password: e.target.value
                    })}
                    className="w-full bg-gray-700 text-white rounded p-2"
                    placeholder="Nhập mật khẩu mới"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Xác nhận mật khẩu mới</label>
                  <input
                    type="text"
                    value={editedCustomer.confirmPassword}
                    onChange={(e) => setEditedCustomer({
                      ...editedCustomer,
                      confirmPassword: e.target.value
                    })}
                    className="w-full bg-gray-700 text-white rounded p-2"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditedCustomer({ password: '', confirmPassword: '' });
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
                >
                  Hủy
                </button>
                <button
                  onClick={() => handleSave(editingId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;
