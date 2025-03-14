import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaSave,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Sidebar from "../SideBar";

const StaffList = () => {
  // Mảng nhân viên mẫu
  const [staffs, setStaffs] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0123456789",
      email: "a@gmail.com",
    },
    {
      id: 2,
      name: "Trần Thị B",
      phone: "0987654321",
      email: "b@gmail.com",
    },
    {
      id: 3,
      name: "Lê Văn C",
      phone: "0911222333",
      email: "c@gmail.com",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      phone: "0944555666",
      email: "d@gmail.com",
    },
    {
      id: 5,
      name: "Đỗ Văn E",
      phone: "0933444555",
      email: "e@gmail.com",
    },
  ]);

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const filteredStaffs = staffs.filter(
    (st) =>
      st.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm nhân viên
  const [isAdding, setIsAdding] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    phone: "",
    email: "",
  });
  // State lưu lỗi cho form thêm
  const [addErrors, setAddErrors] = useState({});

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStaff = () => {
    const errors = {};

    // Kiểm tra trường không được trống
    if (!newStaff.name.trim()) {
      errors.name = "Tên nhân viên không được để trống";
    }
    if (!newStaff.phone.trim()) {
      errors.phone = "Số điện thoại không được để trống";
    }
    if (!newStaff.email.trim()) {
      errors.email = "Gmail không được để trống";
    }

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    // Không có lỗi -> thêm vào mảng
    const newId =
      staffs.length > 0 ? Math.max(...staffs.map((s) => s.id)) + 1 : 1;
    const staffToAdd = { ...newStaff, id: newId };
    setStaffs((prev) => [...prev, staffToAdd]);
    setNewStaff({ name: "", phone: "", email: "" });
    setAddErrors({});
    setIsAdding(false);
  };

  // Chỉnh sửa nhân viên
  const [editingId, setEditingId] = useState(null);
  const [editedStaff, setEditedStaff] = useState({});

  const handleStartEdit = (staff) => {
    setEditingId(staff.id);
    setEditedStaff(staff);
  };

  const handleSaveEdit = (id) => {
    setStaffs((prev) => prev.map((s) => (s.id === id ? editedStaff : s)));
    setEditingId(null);
    setEditedStaff({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedStaff({});
  };

  // Xóa nhân viên
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      setStaffs((prev) => prev.filter((st) => st.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Nút trở về */}
        <div className="mb-3">
          <Link
            to="/admin/employees"
            className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded hover:bg-gray-600"
          >
            &larr; Trở về
          </Link>
        </div>

        {/* Tiêu đề */}
        <div className="bg-gray-800 p-3 border-b border-gray-700 text-lg font-bold text-gray-100 mb-4">
          {filteredStaffs.length} Danh sách nhân viên
        </div>

        {/* Thanh công cụ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded">
          {/* Nút + Nhân viên */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Thêm Nhân viên
            </button>
          </div>
          {/* Ô tìm kiếm */}
          <div className="relative">
            <FaSearch className="absolute top-2 left-2 text-gray-400" />
            <input
              type="text"
              className="pl-8 pr-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Form thêm nhân viên */}
        {isAdding && (
          <div className="bg-gray-800 p-3 mt-3 border border-gray-700 rounded">
            <div className="mb-2 font-semibold text-gray-200">Thêm nhân viên</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Tên */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tên nhân viên"
                  value={newStaff.name}
                  onChange={(e) => handleInputChange(e, setNewStaff)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.name && (
                  <p className="text-red-400 text-sm">{addErrors.name}</p>
                )}
              </div>
              {/* SĐT */}
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={newStaff.phone}
                  onChange={(e) => handleInputChange(e, setNewStaff)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.phone && (
                  <p className="text-red-400 text-sm">{addErrors.phone}</p>
                )}
              </div>
              {/* Gmail */}
              <div>
                <input
                  type="text"
                  name="email"
                  placeholder="Gmail"
                  value={newStaff.email}
                  onChange={(e) => handleInputChange(e, setNewStaff)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.email && (
                  <p className="text-red-400 text-sm">{addErrors.email}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleAddStaff}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <FaSave />
                <span>Lưu</span>
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setAddErrors({});
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center space-x-1"
              >
                <FaTimes />
                <span>Hủy</span>
              </button>
            </div>
          </div>
        )}

        {/* Bảng nhân viên */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Tên nhân viên</th>
                <th className="border border-gray-600 p-2">Số điện thoại</th>
                <th className="border border-gray-600 p-2">Gmail</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredStaffs.map((st) => (
                <tr key={st.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{st.id}</td>

                  {st.id === editingId ? (
                    <>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedStaff.name}
                          onChange={(e) =>
                            setEditedStaff((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedStaff.phone}
                          onChange={(e) =>
                            setEditedStaff((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedStaff.email}
                          onChange={(e) =>
                            setEditedStaff((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleSaveEdit(st.id)}
                          className="text-green-400 hover:text-green-200"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-400 hover:text-red-200 ml-2"
                        >
                          <FaTimes />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDelete(st.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">{st.name}</td>
                      <td className="border border-gray-600 p-2">{st.phone}</td>
                      <td className="border border-gray-600 p-2">{st.email}</td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => {
                            setEditingId(st.id);
                            setEditedStaff(st);
                          }}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          className="text-red-400 hover:text-red-200"
                          onClick={() => handleDelete(st.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredStaffs.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy nhân viên phù hợp!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffList;