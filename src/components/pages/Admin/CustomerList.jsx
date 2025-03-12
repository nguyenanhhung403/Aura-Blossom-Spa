import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTrash, FaEdit, FaSave, FaCheck, FaTimes } from "react-icons/fa";
import Sidebar from "../Admin/SideBar";

const UserList = () => {
  // Mảng người dùng mẫu với các trường: id, username, email, fullname, phone
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      fullname: "John Doe",
      phone: "0123456789",
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      fullname: "Jane Smith",
      phone: "0987654321",
    },
    {
      id: 3,
      username: "tom_le",
      email: "tom@example.com",
      fullname: "Tom Lê",
      phone: "0909123456",
    },
    {
      id: 4,
      username: "mary_pham",
      email: "mary@example.com",
      fullname: "Mary Phạm",
      phone: "0978123454",
    },
    {
      id: 5,
      username: "anna_tran",
      email: "anna@example.com",
      fullname: "Anna Trần",
      phone: "0912987654",
    },
  ]);

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const filteredUsers = users.filter(
    (user) =>
      user.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  // Thêm người dùng
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    fullname: "",
    phone: "",
  });
  // State lưu lỗi cho form thêm (nếu cần)
  const [addErrors, setAddErrors] = useState({});
  // Quản lý id cho người dùng mới
  const [nextId, setNextId] = useState(6);

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    const errors = {};
    if (!newUser.username.trim()) errors.username = "Username không được để trống";
    if (!newUser.email.trim()) errors.email = "Email không được để trống";
    if (!newUser.fullname.trim()) errors.fullname = "Fullname không được để trống";
    if (!newUser.phone.trim()) errors.phone = "Phone không được để trống";

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    const userToAdd = { ...newUser, id: nextId };
    setUsers((prev) => [...prev, userToAdd]);
    setNextId(nextId + 1);
    setNewUser({ username: "", email: "", fullname: "", phone: "" });
    setAddErrors({});
    setIsAdding(false);
  };

  // Chỉnh sửa người dùng
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  const handleStartEdit = (user) => {
    setEditingId(user.id);
    setEditedUser(user);
  };

  const handleSaveEdit = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? editedUser : u)));
    setEditingId(null);
    setEditedUser({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedUser({});
  };

  // Xóa người dùng
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Phân trang (nếu số lượng người dùng nhiều)
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Nút trở về */}
        <div className="mb-3">
          <Link
            to="/admin/users"
            className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded hover:bg-gray-600"
          >
            &larr; Trở về
          </Link>
        </div>

        {/* Tiêu đề */}
        <div className="bg-gray-800 p-3 border-b border-gray-700 text-lg font-bold text-gray-100 mb-4">
          {filteredUsers.length} Danh sách người dùng
        </div>

        {/* Thanh công cụ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded">
          {/* Nút Thêm người dùng */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Thêm Người dùng
            </button>
          </div>
          {/* Ô tìm kiếm */}
          <div className="relative">
            <FaSearch className="absolute top-2 left-2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Form thêm người dùng */}
        {isAdding && (
          <div className="bg-gray-800 p-3 mt-3 border border-gray-700 rounded">
            <div className="mb-2 font-semibold text-gray-200">Thêm người dùng</div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              {/* Username */}
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={newUser.username}
                  onChange={(e) => handleInputChange(e, setNewUser)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.username && (
                  <p className="text-red-400 text-sm">{addErrors.username}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => handleInputChange(e, setNewUser)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.email && (
                  <p className="text-red-400 text-sm">{addErrors.email}</p>
                )}
              </div>
              {/* Fullname */}
              <div>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Fullname"
                  value={newUser.fullname}
                  onChange={(e) => handleInputChange(e, setNewUser)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.fullname && (
                  <p className="text-red-400 text-sm">{addErrors.fullname}</p>
                )}
              </div>
              {/* Phone */}
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={newUser.phone}
                  onChange={(e) => handleInputChange(e, setNewUser)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.phone && (
                  <p className="text-red-400 text-sm">{addErrors.phone}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleAddUser}
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

        {/* Bảng người dùng */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Username</th>
                <th className="border border-gray-600 p-2">Email</th>
                <th className="border border-gray-600 p-2">Fullname</th>
                <th className="border border-gray-600 p-2">Phone</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{user.id}</td>
                  {user.id === editingId ? (
                    <>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedUser.username}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedUser.fullname}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              fullname: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedUser.phone}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleSaveEdit(user.id)}
                          className="text-green-400 hover:text-green-200"
                        >
                          <FaCheck />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">{user.username}</td>
                      <td className="border border-gray-600 p-2">{user.email}</td>
                      <td className="border border-gray-600 p-2">{user.fullname}</td>
                      <td className="border border-gray-600 p-2">{user.phone}</td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => {
                            setEditingId(user.id);
                            setEditedUser(user);
                          }}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy người dùng phù hợp!
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

export default UserList;
