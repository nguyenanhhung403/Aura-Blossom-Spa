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
import Sidebar from "./SideBar";

const TherapistList = () => {
  // Mảng chuyên viên điều trị
  const [therapists, setTherapists] = useState([
    {
      id: 1,
      name: "Chuyên viên X",
      image: "https://via.placeholder.com/40",
      phone: "0123456789",
      email: "x@gmail.com",
      job: "Điều trị da",
      gender: "Nam",
      desc: "Chuyên môn về da liễu...",
    },
    {
      id: 2,
      name: "Chuyên viên Y",
      image: "https://via.placeholder.com/40",
      phone: "0987654321",
      email: "y@gmail.com",
      job: "Điều trị tóc",
      gender: "Nữ",
      desc: "Chuyên môn về tóc...",
    },
  ]);

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const filteredTherapists = therapists.filter(
    (t) =>
      t.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm chuyên viên
  const [isAdding, setIsAdding] = useState(false);
  const [newTherapist, setNewTherapist] = useState({
    name: "",
    image: "",
    phone: "",
    email: "",
    job: "",
    gender: "",
    desc: "",
  });
  // Lưu lỗi cho form thêm
  const [addErrors, setAddErrors] = useState({});

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTherapist = () => {
    const errors = {};
    // Kiểm tra các trường không được để trống
    if (!newTherapist.name.trim()) {
      errors.name = "Tên chuyên viên không được để trống";
    }
    if (!newTherapist.image.trim()) {
      errors.image = "URL hình ảnh không được để trống";
    }
    if (!newTherapist.phone.trim()) {
      errors.phone = "Số điện thoại không được để trống";
    }
    if (!newTherapist.email.trim()) {
      errors.email = "Gmail không được để trống";
    }
    if (!newTherapist.job.trim()) {
      errors.job = "Công việc không được để trống";
    }
    if (!newTherapist.desc.trim()) {
      errors.desc = "Mô tả chuyên môn không được để trống";
    }
    // Kiểm tra giới tính
    const genderVal = newTherapist.gender.trim().toLowerCase();
    if (!["nam", "nữ"].includes(genderVal)) {
      errors.gender = "Giới tính phải là Nam hoặc Nữ";
    }

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    // Nếu không có lỗi
    const newId =
      therapists.length > 0 ? Math.max(...therapists.map((t) => t.id)) + 1 : 1;
    const therapistToAdd = { ...newTherapist, id: newId };
    setTherapists((prev) => [...prev, therapistToAdd]);
    // Reset form
    setNewTherapist({
      name: "",
      image: "",
      phone: "",
      email: "",
      job: "",
      gender: "",
      desc: "",
    });
    setAddErrors({});
    setIsAdding(false);
  };

  // Sửa chuyên viên
  const [editingId, setEditingId] = useState(null);
  const [editedTherapist, setEditedTherapist] = useState({});

  const handleStartEdit = (therapist) => {
    setEditingId(therapist.id);
    setEditedTherapist(therapist);
  };

  const handleSaveEdit = (id) => {
    setTherapists((prev) =>
      prev.map((t) => (t.id === id ? editedTherapist : t))
    );
    setEditingId(null);
    setEditedTherapist({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTherapist({});
  };

  // Xóa chuyên viên
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chuyên viên này?")) {
      setTherapists((prev) => prev.filter((t) => t.id !== id));
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
          {filteredTherapists.length} Danh sách chuyên viên điều trị
        </div>

        {/* Thanh công cụ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded">
          {/* Nút thêm */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Thêm Chuyên viên
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

        {/* Form thêm chuyên viên */}
        {isAdding && (
          <div className="bg-gray-800 p-3 mt-3 border border-gray-700 rounded">
            <div className="mb-2 font-semibold text-gray-200">Thêm chuyên viên</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Tên chuyên viên */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tên chuyên viên"
                  value={newTherapist.name}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.name && (
                  <p className="text-red-400 text-sm">{addErrors.name}</p>
                )}
              </div>

              {/* URL hình ảnh */}
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="URL hình ảnh"
                  value={newTherapist.image}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.image && (
                  <p className="text-red-400 text-sm">{addErrors.image}</p>
                )}
              </div>

              {/* Số điện thoại */}
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={newTherapist.phone}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
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
                  value={newTherapist.email}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.email && (
                  <p className="text-red-400 text-sm">{addErrors.email}</p>
                )}
              </div>

              {/* Công việc */}
              <div>
                <input
                  type="text"
                  name="job"
                  placeholder="Công việc"
                  value={newTherapist.job}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.job && (
                  <p className="text-red-400 text-sm">{addErrors.job}</p>
                )}
              </div>

              {/* Giới tính */}
              <div>
                <input
                  type="text"
                  name="gender"
                  placeholder="Giới tính (Nam/Nữ)"
                  value={newTherapist.gender}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.gender && (
                  <p className="text-red-400 text-sm">{addErrors.gender}</p>
                )}
              </div>

              {/* Mô tả chuyên môn */}
              <div className="lg:col-span-2">
                <input
                  type="text"
                  name="desc"
                  placeholder="Mô tả chuyên môn"
                  value={newTherapist.desc}
                  onChange={(e) => handleInputChange(e, setNewTherapist)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.desc && (
                  <p className="text-red-400 text-sm">{addErrors.desc}</p>
                )}
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={handleAddTherapist}
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

        {/* Bảng chuyên viên */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Tên chuyên viên</th>
                <th className="border border-gray-600 p-2">Hình ảnh</th>
                <th className="border border-gray-600 p-2">Số điện thoại</th>
                <th className="border border-gray-600 p-2">Gmail</th>
                <th className="border border-gray-600 p-2">Công việc</th>
                <th className="border border-gray-600 p-2">Giới tính</th>
                <th className="border border-gray-600 p-2">Mô tả chuyên môn</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredTherapists.map((t) => (
                <tr key={t.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{t.id}</td>
                  {t.id === editingId ? (
                    <>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedTherapist.name}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
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
                          value={editedTherapist.image}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
                              ...prev,
                              image: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedTherapist.phone}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
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
                          value={editedTherapist.email}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
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
                          value={editedTherapist.job}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
                              ...prev,
                              job: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedTherapist.gender}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
                              ...prev,
                              gender: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedTherapist.desc}
                          onChange={(e) =>
                            setEditedTherapist((prev) => ({
                              ...prev,
                              desc: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      {/* Nút Save / Cancel */}
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleSaveEdit(t.id)}
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
                          onClick={() => handleDelete(t.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">{t.name}</td>
                      <td className="border border-gray-600 p-2">
                        <img
                          src={t.image}
                          alt="Therapist"
                          className="w-10 h-10 object-cover mx-auto rounded"
                        />
                      </td>
                      <td className="border border-gray-600 p-2">{t.phone}</td>
                      <td className="border border-gray-600 p-2">{t.email}</td>
                      <td className="border border-gray-600 p-2">{t.job}</td>
                      <td className="border border-gray-600 p-2">{t.gender}</td>
                      <td className="border border-gray-600 p-2">{t.desc}</td>
                      {/* Nút Edit */}
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => {
                            setEditingId(t.id);
                            setEditedTherapist(t);
                          }}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      {/* Nút Delete */}
                      <td className="border border-gray-600 p-2">
                        <button
                          className="text-red-400 hover:text-red-200"
                          onClick={() => handleDelete(t.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredTherapists.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy chuyên viên phù hợp!
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

export default TherapistList;
