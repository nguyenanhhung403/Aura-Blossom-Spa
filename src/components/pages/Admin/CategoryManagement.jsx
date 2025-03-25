import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTrash,
  FaEdit,
  FaSave,
  FaCheck,
  FaTimes,
  FaPlus
} from "react-icons/fa";
import Sidebar from "../Admin/SideBar";
import {
  getAllServiceCategories,
  createServiceCategory,
  updateServiceCategory,
  deleteServiceCategory,
} from "../../service/serviceCategoryApi";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // State cho form thêm mới
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    signature: false
  });

  // State cho form chỉnh sửa
  const [editedCategory, setEditedCategory] = useState({});
  
  // State cho lỗi
  const [errors, setErrors] = useState({});

  // Lọc categories theo search term
  const filteredCategories = categories.filter(
    cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Load categories khi component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllServiceCategories();
      if (response.result) {
        setCategories(response.result);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Xử lý thêm category
  const handleAddCategory = async () => {
    const validationErrors = {};
    if (!newCategory.name.trim()) {
      validationErrors.name = "Tên danh mục không được để trống";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await createServiceCategory(newCategory);
      if (response.result) {
        setCategories(prev => [...prev, response.result]);
        setNewCategory({ name: "", description: "", signature: false });
        setIsAdding(false);
        setErrors({});
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Có lỗi xảy ra khi thêm danh mục!");
    }
  };

  // Xử lý cập nhật category
  const handleUpdateCategory = async (id) => {
    try {
      const response = await updateServiceCategory(id, editedCategory);
      if (response.result) {
        setCategories(prev =>
          prev.map(cat => cat.id === id ? response.result : cat)
        );
        setEditingId(null);
        setEditedCategory({});
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Có lỗi xảy ra khi cập nhật danh mục!");
    }
  };

  // Xử lý xóa category
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      try {
        await deleteServiceCategory(id);
        setCategories(prev => prev.filter(cat => cat.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Có lỗi xảy ra khi xóa danh mục!");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Danh mục Dịch vụ</h1>
        </div>

        {/* Thanh công cụ */}
        <div className="mb-6 flex justify-between items-center">
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
          >
            <FaPlus /> Thêm danh mục
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm danh mục..."
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
            <h2 className="text-xl font-semibold mb-4">Thêm Danh mục mới</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Tên danh mục</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows="3"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newCategory.signature}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, signature: e.target.checked }))}
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Dịch vụ chữ ký</label>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  <FaSave className="inline mr-2" /> Lưu
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setNewCategory({ name: "", description: "", signature: false });
                    setErrors({});
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  <FaTimes className="inline mr-2" /> Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bảng danh sách */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dịch vụ chữ ký</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editedCategory.name}
                        onChange={(e) => setEditedCategory(prev => ({ ...prev, name: e.target.value }))}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{category.name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === category.id ? (
                      <textarea
                        value={editedCategory.description}
                        onChange={(e) => setEditedCategory(prev => ({ ...prev, description: e.target.value }))}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{category.description}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === category.id ? (
                      <input
                        type="checkbox"
                        checked={editedCategory.signature}
                        onChange={(e) => setEditedCategory(prev => ({ ...prev, signature: e.target.checked }))}
                        className="h-4 w-4 text-blue-500"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">{category.signature ? "Có" : "Không"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === category.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateCategory(category.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaCheck className="text-xl" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditedCategory({});
                          }}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <FaTimes className="text-xl" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingId(category.id);
                            setEditedCategory(category);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <FaEdit className="text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash className="text-xl" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredCategories.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              Không tìm thấy danh mục nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagement; 