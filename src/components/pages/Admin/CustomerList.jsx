import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Sidebar from "../Admin/SideBar";

const UserList = () => {
  // Mảng người dùng mẫu với các trường: id, username, email, fullname, phone, role
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      fullname: "John Doe",
      phone: "0123456789",
      role: "user",
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      fullname: "Jane Smith",
      phone: "0987654321",
      role: "staff",
    },
    {
      id: 3,
      username: "tom_le",
      email: "tom@example.com",
      fullname: "Tom Lê",
      phone: "0909123456",
      role: "user",
    },
    {
      id: 4,
      username: "mary_pham",
      email: "mary@example.com",
      fullname: "Mary Phạm",
      phone: "0978123454",
      role: "staff",
    },
    {
      id: 5,
      username: "anna_tran",
      email: "anna@example.com",
      fullname: "Anna Trần",
      phone: "0912987654",
      role: "user",
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
      user.phone.includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chỉnh sửa người dùng
  const [editingId, setEditingId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

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
                <th className="border border-gray-600 p-2">Role</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {currentRecords.map((user) => (
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
                      <td className="border border-gray-600 p-1">
                        <select
                          value={editedUser.role}
                          onChange={(e) =>
                            setEditedUser((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        >
                          <option value="user">User</option>
                          <option value="staff">Staff</option>
                        </select>
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
                          onClick={handleCancelEdit}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTimes />
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === "staff" 
                            ? "bg-blue-900 text-blue-200" 
                            : "bg-gray-700 text-gray-300"
                        }`}>
                          {user.role === "staff" ? "Staff" : "User"}
                        </span>
                      </td>
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
                    colSpan="8"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy người dùng phù hợp!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
