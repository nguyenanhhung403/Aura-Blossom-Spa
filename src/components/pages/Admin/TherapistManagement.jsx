import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaSave,
  FaCheck,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import Sidebar from "../Admin/SideBar";
import { 
  getAllTherapists, 
  createTherapist, 
  updateTherapist, 
  deleteTherapist 
} from "../../service/therapistsApi";

const TherapistManagement = () => {
  const [therapists, setTherapists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // State cho form thêm mới
  const [newTherapist, setNewTherapist] = useState({
    username: "",
    password: "",
    fullname: "",
    phone: "",
    email: "",
    experience: "",
    description: "",
  });

  // State cho form chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editedTherapist, setEditedTherapist] = useState({});
  
  // State cho lỗi
  const [errors, setErrors] = useState({});

  // Load danh sách therapist
  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      const response = await getAllTherapists();
      if (response.result) {
        setTherapists(response.result);
      }
    } catch (error) {
      console.error("Error fetching therapists:", error);
      alert("Có lỗi xảy ra khi tải danh sách chuyên viên!");
    }
  };

  // Lọc therapists theo search term
  const filteredTherapists = therapists.filter(
    therapist => 
      therapist.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.phone?.includes(searchTerm)
  );

  // Xử lý thêm therapist
  const handleAddTherapist = async () => {
    const validationErrors = {};
    if (!newTherapist.username?.trim()) {
      validationErrors.username = "Username không được để trống";
    }
    if (!newTherapist.password?.trim()) {
      validationErrors.password = "Password không được để trống";
    }
    if (!newTherapist.fullname?.trim()) {
      validationErrors.fullname = "Tên không được để trống";
    }
    if (!newTherapist.phone?.trim()) {
      validationErrors.phone = "Số điện thoại không được để trống";
    }
    if (!newTherapist.email?.trim()) {
      validationErrors.email = "Email không được để trống";
    }
    if (!newTherapist.experience) {
      validationErrors.experience = "Kinh nghiệm không được để trống";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const therapistData = {
        username: newTherapist.username,
        password: newTherapist.password,
        fullname: newTherapist.fullname,
        phone: newTherapist.phone,
        email: newTherapist.email,
        experience: Number(newTherapist.experience),
        description: newTherapist.description || ""
      };

      const response = await createTherapist(therapistData, thumbnailFile);
      if (response.result) {
        await fetchTherapists();
        setNewTherapist({
          username: "",
          password: "",
          fullname: "",
          phone: "",
          email: "",
          experience: "",
          description: "",
        });
        setThumbnailFile(null);
        setIsAdding(false);
        setErrors({});
      }
    } catch (error) {
      console.error("Error creating therapist:", error);
      if (error.response?.status === 409) {
        setErrors(prev => ({
          ...prev,
          username: "Username đã tồn tại trong hệ thống!"
        }));
      } else {
        alert("Có lỗi xảy ra khi thêm chuyên viên!");
      }
    }
  };

  // Xử lý cập nhật therapist
  const handleUpdateTherapist = async (id) => {
    try {
        // Validate dữ liệu
        const validationErrors = {};
        if (!editedTherapist.fullname?.trim()) {
            validationErrors.fullname = "Tên không được để trống";
        }
        if (!editedTherapist.phone?.trim()) {
            validationErrors.phone = "Số điện thoại không được để trống";
        }
        if (!editedTherapist.email?.trim()) {
            validationErrors.email = "Email không được để trống";
        }
        if (!editedTherapist.experience) {
            validationErrors.experience = "Kinh nghiệm không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Chuẩn bị dữ liệu gửi đi
        const therapistData = {
            fullname: editedTherapist.fullname,
            password: editedTherapist.password,
            phone: editedTherapist.phone,
            email: editedTherapist.email,
            experience: Number(editedTherapist.experience),
            description: editedTherapist.description || ""
        };

        // Log để debug
        console.log("Sending update data:", therapistData);

        const response = await updateTherapist(id, therapistData, thumbnailFile);

        if (response.result) {
            await fetchTherapists();
            setEditingId(null);
            setEditedTherapist({});
            setThumbnailFile(null);
            setErrors({});
            alert("Cập nhật thông tin thành công!");
        }
    } catch (error) {
        console.error("Update error:", error);
        alert(error.message || "Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  // Xử lý xóa therapist
  const handleDeleteTherapist = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa chuyên viên này?")) {
        try {
            await deleteTherapist(id);
            setTherapists(prev => prev.filter(therapist => therapist.id !== id));
            alert("Xóa chuyên viên thành công!");
        } catch (error) {
            if (error.message === "Không thể xóa chuyên viên này vì có dữ liệu liên quan!") {
                alert(error.message);
            } else if (error.message === "Không tìm thấy chuyên viên này!") {
                alert(error.message);
                // Refresh lại danh sách để đồng bộ với server
                await fetchTherapists();
            } else {
                alert("Có lỗi xảy ra khi xóa chuyên viên!");
            }
        }
    }
};

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Chuyên viên</h1>
        </div>

        {/* Thanh công cụ */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <FaPlus /> Thêm chuyên viên
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm chuyên viên..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:border-blue-500"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Form thêm mới */}
        {isAdding && (
          <div className="mb-6 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Thêm Chuyên viên mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={newTherapist.username}
                  onChange={(e) => setNewTherapist(prev => ({ ...prev, username: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="text"
                  value={newTherapist.password}
                  onChange={(e) => setNewTherapist(prev => ({ ...prev, password: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tên chuyên viên</label>
                <input
                  type="text"
                  value={newTherapist.fullname}
                  onChange={(e) => setNewTherapist(prev => ({ ...prev, fullname: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                {errors.fullname && <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                <input
                  type="text"
                  value={newTherapist.phone}
                  onChange={(e) => setNewTherapist(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={newTherapist.email}
                  onChange={(e) => setNewTherapist(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Kinh nghiệm (năm)</label>
                <input
                  type="number"
                  min="0"
                  value={newTherapist.experience}
                  onChange={(e) => setNewTherapist(prev => ({ 
                    ...prev, 
                    experience: e.target.value ? Number(e.target.value) : "" 
                  }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={newTherapist.description}
                  onChange={(e) => setNewTherapist(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className="mt-1 block w-full border rounded-md px-3 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setThumbnailFile(file);
                    }
                  }}
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleAddTherapist}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                <FaSave className="inline mr-2" /> Lưu
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewTherapist({
                    username: "",
                    password: "",
                    fullname: "",
                    phone: "",
                    email: "",
                    experience: "",
                    description: "",
                  });
                  setThumbnailFile(null);
                  setErrors({});
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                <FaTimes className="inline mr-2" /> Hủy
              </button>
            </div>
          </div>
        )}

        {/* Bảng danh sách */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hình ảnh</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và tên</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kinh nghiệm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTherapists.map((therapist) => (
                <tr key={therapist.id}>
                  {editingId === therapist.id ? (
                    // Form chỉnh sửa
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="text"
                          value={editedTherapist.password || ''}
                          onChange={(e) => setEditedTherapist(prev => ({
                              ...prev,
                              password: e.target.value
                          }))}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setThumbnailFile(file);
                            }
                          }}
                          className="w-full"
                        />
                        {therapist.image && (
                          <img
                            src={therapist.image}
                            alt="Preview"
                            className="h-10 w-10 rounded-full mt-1"
                          />
                        )}
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedTherapist.fullname || ''}
                          onChange={(e) => setEditedTherapist(prev => ({
                              ...prev,
                              fullname: e.target.value
                          }))}
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedTherapist.phone || ''}
                          onChange={(e) => setEditedTherapist(prev => ({
                              ...prev,
                              phone: e.target.value
                          }))}
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="email"
                          value={editedTherapist.email || ''}
                          onChange={(e) => setEditedTherapist(prev => ({
                              ...prev,
                              email: e.target.value
                          }))}
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          value={editedTherapist.experience || ''}
                          onChange={(e) => setEditedTherapist(prev => ({...prev, experience: e.target.value}))}
                          className="w-full border rounded px-2 py-1"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <textarea
                          value={editedTherapist.description || ''}
                          onChange={(e) => setEditedTherapist(prev => ({...prev, description: e.target.value}))}
                          className="w-full border rounded px-2 py-1"
                          rows="2"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleUpdateTherapist(therapist.id)}
                          className="text-green-600 hover:text-green-900 mr-2"
                        >
                          <FaCheck className="text-xl" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedTherapist({});
                            setThumbnailFile(null);
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTimes className="text-xl" />
                        </button>
                      </td>
                    </>
                  ) : (
                    // Hiển thị thông tin
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.password}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={therapist.image || "https://placehold.co/40x40"}
                          alt={therapist.fullname}
                          className="h-10 w-10 rounded-full"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.fullname}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{therapist.experience}</td>
                      <td className="px-6 py-4">{therapist.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => {
                            setEditingId(therapist.id);
                            setEditedTherapist({
                              username: therapist.username,
                              password: therapist.password,
                              fullname: therapist.fullname,
                              phone: therapist.phone,
                              email: therapist.email,
                              experience: therapist.experience,
                              description: therapist.description || ""
                            });
                          }}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteTherapist(therapist.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredTherapists.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    Không tìm thấy chuyên viên nào
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

export default TherapistManagement; 