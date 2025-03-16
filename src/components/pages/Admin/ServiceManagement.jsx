import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaSave,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import Sidebar from "../Admin/SideBar";

const Services = () => {
  // Mảng dịch vụ mẫu
  const [services, setServices] = useState([
    {
      id: 1,
      category: "Hair",
      name: "Cắt tóc",
      image: "",
      price: "30",
      duration: "30 phút",
      description: "Dịch vụ cắt tóc cơ bản.",
    },
    {
      id: 2,
      category: "Spa",
      name: "Chăm sóc da mặt",
      image: "",
      price: "50",
      duration: "45 phút",
      description: "Dịch vụ làm sạch da mặt và thư giãn.",
    },
  ]);

  // Tìm kiếm theo ID hoặc tên dịch vụ
  const [searchTerm, setSearchTerm] = useState("");
  const filteredServices = services.filter(
    (s) =>
      s.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm dịch vụ mới
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({
    category: "",
    name: "",
    image: "",
    price: "",
    duration: "",
    description: "",
  });
  // State lưu lỗi cho form thêm
  const [addErrors, setAddErrors] = useState({});
  const fileInputRef = useRef(null);

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      // Kiểm tra định dạng file, chỉ chấp nhận jpg và png
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Chỉ được chọn file JPG hoặc PNG!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddService = () => {
    const errors = {};

    // Kiểm tra các trường không được để trống
    if (!newService.category.trim()) {
      errors.category = "Category không được để trống";
    }
    if (!newService.name.trim()) {
      errors.name = "Tên dịch vụ không được để trống";
    }
    if (!newService.price.trim()) {
      errors.price = "Giá không được để trống";
    }
    if (!newService.duration.trim()) {
      errors.duration = "Thời gian không được để trống";
    }
    if (!newService.description.trim()) {
      errors.description = "Mô tả không được để trống";
    }

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    // Tạo ID tự tăng dựa trên max ID hiện có
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;
    const serviceToAdd = { ...newService, id: newId };
    setServices((prev) => [...prev, serviceToAdd]);
    setNewService({ category: "", name: "", image: "", price: "", duration: "", description: "" });
    setAddErrors({});
    setIsAdding(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Chỉnh sửa dịch vụ
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState({});

  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditedService(service);
  };

  const handleSaveEdit = (id) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? editedService : s))
    );
    setEditingId(null);
    setEditedService({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedService({});
  };

  // Xóa dịch vụ
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Nút trở về */}
        <div className="mb-3">
          <Link
            to="/admin/services"
            className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded hover:bg-gray-600"
          >
            &larr; Trở về
          </Link>
        </div>

        {/* Tiêu đề */}
        <div className="bg-gray-800 p-3 border-b border-gray-700 text-lg font-bold text-gray-100 mb-4">
          {filteredServices.length} Danh sách Dịch Vụ
        </div>

        {/* Thanh công cụ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded">
          {/* Nút Thêm dịch vụ */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Thêm Dịch vụ
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

        {/* Form Thêm Dịch vụ */}
        {isAdding && (
          <div className="bg-gray-800 p-3 mt-3 border border-gray-700 rounded">
            <div className="mb-2 font-semibold text-gray-200">Thêm Dịch vụ</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Category */}
              <div>
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={newService.category}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.category && (
                  <p className="text-red-400 text-sm">{addErrors.category}</p>
                )}
              </div>
              {/* Tên dịch vụ */}
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Tên dịch vụ"
                  value={newService.name}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.name && (
                  <p className="text-red-400 text-sm">{addErrors.name}</p>
                )}
              </div>
              {/* Giá */}
              <div>
                <input
                  type="number"
                  name="price"
                  placeholder="Giá"
                  value={newService.price}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.price && (
                  <p className="text-red-400 text-sm">{addErrors.price}</p>
                )}
              </div>
              {/* Thời gian */}
              <div>
                <input
                  type="text"
                  name="duration"
                  placeholder="Thời gian"
                  value={newService.duration}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.duration && (
                  <p className="text-red-400 text-sm">{addErrors.duration}</p>
                )}
              </div>
              {/* Mô tả */}
              <div>
                <input
                  type="text"
                  name="description"
                  placeholder="Mô tả dịch vụ"
                  value={newService.description}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.description && (
                  <p className="text-red-400 text-sm">{addErrors.description}</p>
                )}
              </div>
              {/* Upload ảnh (chỉ nhận JPG và PNG) */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleImageChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                  accept="image/jpeg, image/png"
                />
                {newService.image && (
                  <img
                    src={newService.image}
                    alt="Preview"
                    className="w-20 h-20 object-cover mt-1"
                  />
                )}
              </div>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleAddService}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <FaSave />
                <span>Lưu</span>
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setAddErrors({});
                  setNewService({ category: "", name: "", image: "", price: "", duration: "", description: "" });
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center space-x-1"
              >
                <FaTimes />
                <span>Hủy</span>
              </button>
            </div>
          </div>
        )}

        {/* Bảng Dịch vụ */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Category</th>
                <th className="border border-gray-600 p-2">Tên dịch vụ</th>
                <th className="border border-gray-600 p-2">Hình ảnh</th>
                <th className="border border-gray-600 p-2">Giá</th>
                <th className="border border-gray-600 p-2">Thời gian</th>
                <th className="border border-gray-600 p-2">Mô tả</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredServices.map((s) => (
                <tr key={s.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{s.id}</td>
                  {s.id === editingId ? (
                    <>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedService.category}
                          onChange={(e) =>
                            setEditedService((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedService.name}
                          onChange={(e) =>
                            setEditedService((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="file"
                          onChange={(e) =>
                            handleImageChange(e, setEditedService)
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                          accept="image/jpeg, image/png"
                        />
                        {editedService.image && (
                          <img
                            src={editedService.image}
                            alt="Preview"
                            className="w-20 h-20 object-cover mt-1"
                          />
                        )}
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="number"
                          value={editedService.price}
                          onChange={(e) =>
                            setEditedService((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedService.duration}
                          onChange={(e) =>
                            setEditedService((prev) => ({
                              ...prev,
                              duration: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedService.description}
                          onChange={(e) =>
                            setEditedService((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleSaveEdit(s.id)}
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
                          onClick={() => handleDelete(s.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">{s.category}</td>
                      <td className="border border-gray-600 p-2">{s.name}</td>
                      <td className="border border-gray-600 p-2">
                        {s.image && (
                          <img
                            src={s.image}
                            alt="Service"
                            className="w-10 h-10 object-cover inline-block"
                          />
                        )}
                      </td>
                      <td className="border border-gray-600 p-2">{s.price}</td>
                      <td className="border border-gray-600 p-2">{s.duration}</td>
                      <td className="border border-gray-600 p-2">{s.description}</td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleStartEdit(s)}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td
                    colSpan="9"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy dịch vụ phù hợp!
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

export default Services;
