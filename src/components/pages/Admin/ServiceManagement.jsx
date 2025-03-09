import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import Sidebar from "./SideBar";

const Services = () => {
  // Dữ liệu ban đầu (Read) không có trường "staff"
  const initialServices = [
    {
      id: 1,
      serviceName: "Dịch vụ A",
      image: "https://via.placeholder.com/40",
      price: "100.000đ",
      time: "30",
      description: "Mô tả dịch vụ A",
      combo: false,
    },
    {
      id: 2,
      serviceName: "Dịch vụ B",
      image: "https://via.placeholder.com/40",
      price: "150.000đ",
      time: "45",
      description: "Mô tả dịch vụ B",
      combo: false,
    },
  ];

  // State quản lý danh sách dịch vụ
  const [services, setServices] = useState(initialServices);
  // Biến dùng để tạo ID tự tăng
  const [nextId, setNextId] = useState(
    services.length ? Math.max(...services.map((s) => s.id)) + 1 : 1
  );
  // State điều khiển form thêm mới
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: "",
    image: "",
    price: "",
    time: "",
    description: "",
    combo: false,
  });
  // State lưu lỗi cho form thêm mới
  const [addErrors, setAddErrors] = useState({});

  // State cho chế độ chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState({});
  const [editErrors, setEditErrors] = useState({});

  // State tìm kiếm (searchTerm)
  const [searchTerm, setSearchTerm] = useState("");

  // Hàm dùng chung để cập nhật state từ input
  const handleInputChange = (e, setter) => {
    const { name, value, type, checked } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Hàm định dạng giá theo VND
  const formatPrice = (price) => {
    const numericPrice = parseFloat(
      price.toString().replace(/,/g, "").replace(/\./g, "")
    );
    if (isNaN(numericPrice)) return null;
    return numericPrice.toLocaleString("vi-VN") + "đ";
  };

  // Tạo mới (Create) với kiểm tra lỗi
  const handleAddService = () => {
    const errors = {};
    if (!newService.serviceName.trim()) {
      errors.serviceName = "Tên dịch vụ không được để trống";
    }
    if (!newService.description.trim()) {
      errors.description = "Mô tả dịch vụ không được để trống";
    }
    const formattedPrice = formatPrice(newService.price);
    if (!newService.price.trim() || formattedPrice === null) {
      errors.price = "Giá phải là số";
    }
    if (!/^\d+$/.test(newService.time.trim())) {
      errors.time = "Thời gian phải là số (phút)";
    }
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }
    const serviceToAdd = {
      ...newService,
      id: nextId,
      price: formattedPrice,
    };
    setServices((prev) => [...prev, serviceToAdd]);
    setNextId(nextId + 1);
    setNewService({
      serviceName: "",
      image: "",
      price: "",
      time: "",
      description: "",
      combo: false,
    });
    setAddErrors({});
    setIsAdding(false);
  };

  // Xóa (Delete)
  const handleDeleteService = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  // Bắt đầu chỉnh sửa (Update)
  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditedService(service);
    setEditErrors({});
  };

  // Lưu thay đổi (Update) với kiểm tra lỗi
  const handleSaveEdit = (id) => {
    const errors = {};
    if (!editedService.serviceName.trim()) {
      errors.serviceName = "Tên dịch vụ không được để trống";
    }
    if (!editedService.description.trim()) {
      errors.description = "Mô tả dịch vụ không được để trống";
    }
    const formattedPrice = formatPrice(editedService.price);
    if (!editedService.price.trim() || formattedPrice === null) {
      errors.price = "Giá phải là số";
    }
    if (!/^\d+$/.test(editedService.time.trim())) {
      errors.time = "Thời gian phải là số (phút)";
    }
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...editedService, price: formattedPrice }
          : service
      )
    );
    setEditingId(null);
    setEditedService({});
    setEditErrors({});
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedService({});
    setEditErrors({});
  };

  // Lọc dữ liệu dựa trên từ khóa tìm kiếm (theo ID hoặc Tên dịch vụ)
  const filteredServices = services.filter(
    (service) =>
      service.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form component để sử dụng lại cho thêm/chỉnh sửa
  const ServiceForm = ({ service, errors, onChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-800 p-6 rounded-lg shadow">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Tên dịch vụ
        </label>
        <input
          type="text"
          name="serviceName"
          placeholder="Tên dịch vụ"
          value={service.serviceName}
          onChange={onChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.serviceName && (
          <p className="text-red-400 text-xs">{errors.serviceName}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Hình ảnh
        </label>
        <input
          type="text"
          name="image"
          placeholder="URL hình ảnh"
          value={service.image}
          onChange={onChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">Giá</label>
        <input
          type="text"
          name="price"
          placeholder="Giá (chỉ số)"
          value={service.price}
          onChange={onChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.price && <p className="text-red-400 text-xs">{errors.price}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Thời gian (phút)
        </label>
        <input
          type="text"
          name="time"
          placeholder="Thời gian (phút)"
          value={service.time}
          onChange={onChange}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.time && <p className="text-red-400 text-xs">{errors.time}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <label className="block text-sm font-medium text-gray-200">Mô tả</label>
        <textarea
          name="description"
          placeholder="Mô tả dịch vụ"
          value={service.description}
          onChange={onChange}
          rows="3"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {errors.description && (
          <p className="text-red-400 text-xs">{errors.description}</p>
        )}
      </div>

      <div className="flex items-center space-x-1">
        <input
          type="checkbox"
          name="combo"
          checked={service.combo}
          onChange={onChange}
          className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
        />
        <label className="text-sm font-medium text-gray-200">Combo</label>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Nội dung chính */}
      <div className="flex-1">
        <div className="bg-gray-800 p-4 shadow-md">
          <h1 className="text-2xl font-bold text-white">Quản lý Dịch vụ</h1>
        </div>

        {/* Thanh công cụ */}
        <div className="bg-gray-800 p-4 shadow-md flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              className={`flex items-center space-x-1 px-4 py-2 rounded-md ${
                isAdding
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
              onClick={() => !isAdding && setIsAdding(true)}
              disabled={isAdding}
            >
              <FaPlus size={14} />
              <span>Thêm dịch vụ</span>
            </button>
          </div>

          {/* Ô tìm kiếm */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-5  py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Tìm theo ID hoặc tên dịch vụ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setSearchTerm("")}
              >
                <FaTimes className="text-gray-400 hover:text-gray-200" />
              </button>
            )}
          </div>
        </div>

        {/* Form thêm mới */}
        {isAdding && (
          <div className="mt-6 mx-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-100">
                Thêm dịch vụ mới
              </h2>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setAddErrors({});
                }}
                className="text-gray-400 hover:text-gray-200"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <ServiceForm
              service={newService}
              errors={addErrors}
              onChange={(e) => handleInputChange(e, setNewService)}
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="px-4 py-2 bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500"
                onClick={() => {
                  setIsAdding(false);
                  setAddErrors({});
                }}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center space-x-2"
                onClick={handleAddService}
              >
                <FaSave size={14} />
                <span>Lưu dịch vụ</span>
              </button>
            </div>
          </div>
        )}

        {/* Danh sách dịch vụ */}
        <div className="m-4">
          <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {filteredServices.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-gray-400 mb-4 text-lg">
                  Không có dịch vụ nào được tìm thấy
                </div>
                {searchTerm && (
                  <button
                    className="text-indigo-400 hover:text-indigo-300"
                    onClick={() => setSearchTerm("")}
                  >
                    Xóa bộ lọc tìm kiếm
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Combo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Dịch vụ
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Hình ảnh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Thời gian
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Mô tả
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Thao tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {filteredServices.map((service) => (
                      <tr key={service.id} className="hover:bg-gray-700">
                        {editingId === service.id ? (
                          // Editing mode row
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                name="combo"
                                checked={editedService.combo}
                                onChange={(e) =>
                                  handleInputChange(e, setEditedService)
                                }
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs bg-gray-600 rounded-full text-gray-300">
                                {service.id}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                name="serviceName"
                                value={editedService.serviceName}
                                onChange={(e) =>
                                  handleInputChange(e, setEditedService)
                                }
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-100"
                              />
                              {editErrors.serviceName && (
                                <p className="text-red-400 text-xs mt-1">
                                  {editErrors.serviceName}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                name="image"
                                value={editedService.image}
                                onChange={(e) =>
                                  handleInputChange(e, setEditedService)
                                }
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-100"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                name="price"
                                value={editedService.price}
                                onChange={(e) =>
                                  handleInputChange(e, setEditedService)
                                }
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-100"
                              />
                              {editErrors.price && (
                                <p className="text-red-400 text-xs mt-1">
                                  {editErrors.price}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <input
                                type="text"
                                name="time"
                                value={editedService.time}
                                onChange={(e) =>
                                  handleInputChange(e, setEditedService)
                                }
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-100"
                              />
                              {editErrors.time && (
                                <p className="text-red-400 text-xs mt-1">
                                  {editErrors.time}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <textarea
                                name="description"
                                value={editedService.description}
                                onChange={(e) =>
                                  handleInputChange(e, setEditedService)
                                }
                                className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-gray-100"
                                rows="2"
                              />
                              {editErrors.description && (
                                <p className="text-red-400 text-xs mt-1">
                                  {editErrors.description}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center space-x-2">
                                <button
                                  className="p-1 bg-green-600 text-white rounded-full hover:bg-green-500"
                                  onClick={() => handleSaveEdit(service.id)}
                                  title="Lưu"
                                >
                                  <FaSave size={16} />
                                </button>
                                <button
                                  className="p-1 bg-red-600 text-white rounded-full hover:bg-red-500"
                                  onClick={handleCancelEdit}
                                  title="Hủy"
                                >
                                  <FaTimes size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          // View mode row
                          <>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <input
                                type="checkbox"
                                checked={service.combo}
                                readOnly
                                className="w-4 h-4 text-indigo-600"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs bg-gray-600 rounded-full text-gray-300">
                                {service.id}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-100">
                              {service.serviceName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src={service.image}
                                alt={service.serviceName}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-indigo-400">
                              {service.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              {service.time} phút
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-xs truncate text-gray-300">
                                {service.description}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center">
                              <div className="flex justify-center space-x-2">
                                <button
                                  className="p-1 bg-blue-600 text-white rounded-full hover:bg-blue-500"
                                  onClick={() => handleStartEdit(service)}
                                  title="Chỉnh sửa"
                                >
                                  <FaEdit size={16} />
                                </button>
                                <button
                                  className="p-1 bg-red-600 text-white rounded-full hover:bg-red-500"
                                  onClick={() =>
                                    handleDeleteService(service.id)
                                  }
                                  title="Xóa"
                                >
                                  <FaTrash size={16} />
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
