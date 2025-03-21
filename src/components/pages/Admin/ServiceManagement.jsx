import React, { useState, useRef, useEffect } from "react";
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
import { getAllServiceCategories, createServiceCategory, updateServiceCategory, deleteServiceCategory } from "../../service/serviceCategoryApi";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from "../../service/serviceApi";

const Services = () => {
  // Mảng dịch vụ mẫu
  const [services, setServices] = useState([
    // {
    //   id: 1,
    //   category: null,
    //   name: "Cắt tóc",
    //   thumbnail: "",
    //   price: 30,
    //   duration: "30 phút",
    //   description: "Dịch vụ cắt tóc cơ bản.",
    // },  
    // {
    //   id: 2,
    //   category: null,
    //   name: "Chăm sóc da mặt",
    //   thumbnail: "",
    //   price: 50,
    //   duration: "45 phút",
    //   description: "Dịch vụ làm sạch da mặt và thư giãn.",
    // },
  ]);

  const [categories, setCategories] = useState([]);
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
    categoryId: "",
    name: "",
    thumbnail: "",
    price: 0,
    duration: "",
    description: "",
  });
  // State lưu lỗi cho form thêm
  const [addErrors, setAddErrors] = useState({});
  const fileInputRef = useRef(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // State cho category
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    signature: false,
  });
  const [categoryErrors, setCategoryErrors] = useState({});
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});

  // Thêm state errors vào cùng với các state khác ở đầu component
  const [errors, setErrors] = useState({});

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Chỉ được chọn file JPG hoặc PNG!");
        return;
      }
      setThumbnailFile(file); // Lưu file vào state
      if (isAdding) {
        setNewService((prev) => ({
          ...prev,
          thumbnail: URL.createObjectURL(file),
        }));
      } else if (editingId) {
        setEditedService((prev) => ({
          ...prev,
          thumbnail: URL.createObjectURL(file),
        }));
      }
    }
  };

  const handleAddService = async () => {
    const errors = {};

    // Kiểm tra các trường không được để trống
    if (!newService.categoryId) {
      errors.category = "Category không được để trống";
    }
    if (!newService.name.trim()) {
      errors.name = "Tên dịch vụ không được để trống";
    }
    if (newService.price < 0) {
      errors.price = "Giá không được nhỏ hơn 0";
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

    const serviceRequest = {
      categoryId: newService.categoryId,
      name: newService.name,
      price: newService.price,
      duration: newService.duration,
      description: newService.description,
    };

    try {
      const response = await createService(serviceRequest, thumbnailFile);
      setServices((prev) => [...prev, response.result]);
      setNewService({
        categoryId: "",
        name: "",
        price: 0,
        duration: "",
        description: "",
      });
      setThumbnailFile(null);
      setAddErrors({});
      setIsAdding(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  // Chỉnh sửa dịch vụ
  const [editingId, setEditingId] = useState(null);
  const [editedService, setEditedService] = useState({});

  const handleStartEdit = (service) => {
    setEditingId(service.id);
    setEditedService(service);
    console.log(service);
  };

  const handleSaveEdit = async () => {
    try {
        // Validate dữ liệu
        const validationErrors = {};
        if (!editedService.name?.trim()) {
            validationErrors.name = "Tên dịch vụ không được để trống";
        }
        if (!editedService.price) {
            validationErrors.price = "Giá dịch vụ không được để trống";
        }
        if (!editedService.duration) {
            validationErrors.duration = "Thời gian không được để trống";
        }
        if (!editedService.category?.id) {
            validationErrors.categoryId = "Danh mục không được để trống";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Chuẩn bị dữ liệu gửi đi
        const serviceData = {
            name: editedService.name,
            description: editedService.description || "",
            price: Number(editedService.price),
            duration: Number(editedService.duration),
            categoryId: editedService.category.id
        };

        // Log để debug
        console.log("Sending data:", serviceData);
        console.log("Thumbnail file:", thumbnailFile);

        const response = await updateService(
            editingId,
            serviceData,
            thumbnailFile
        );

        if (response.result) {
            // Refresh lại danh sách
            const servicesRes = await getAllServices();
            if (servicesRes.result) {
                setServices(servicesRes.result);
            }
            
            // Reset các state
            setEditingId(null);
            setEditedService({});
            setThumbnailFile(null);
            setErrors({});
            alert("Cập nhật dịch vụ thành công!");
        }
    } catch (error) {
        if (error.message === "Không tìm thấy dịch vụ này!") {
            alert(error.message);
        } else {
            alert("Có lỗi xảy ra khi cập nhật dịch vụ!");
            console.error(error);
        }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedService({});
  };

  // Xóa dịch vụ
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      const response = await deleteService(id);
      console.log("Delete response:", response);
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Thêm category mới
  const handleAddCategory = async () => {
    const errors = {};
    if (!newCategory.name.trim()) {
      errors.name = "Tên category không được để trống";
    }
    if (Object.keys(errors).length > 0) {
      setCategoryErrors(errors);
      return;
    }

    try {
      const response = await createServiceCategory(newCategory);
      if (response.result) {
        setCategories(prev => [...prev, response.result]);
        setNewCategory({ name: "", description: "", signature: false });
        setCategoryErrors({});
        setIsAddingCategory(false);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Có lỗi xảy ra khi thêm category!");
    }
  };

  // Bắt đầu chỉnh sửa category
  const handleStartEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setEditedCategory(category);
  };

  // Lưu chỉnh sửa category
  const handleSaveEditCategory = async () => {
    try {
      const response = await updateServiceCategory(editingCategoryId, editedCategory);
      if (response.result) {
        setCategories(prev =>
          prev.map(cat =>
            cat.id === editingCategoryId ? response.result : cat
          )
        );
        setEditingCategoryId(null);
        setEditedCategory({});
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Có lỗi xảy ra khi cập nhật category!");
    }
  };

  // Hủy chỉnh sửa category
  const handleCancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditedCategory({});
  };

  // Xóa category
  const handleDeleteCategory = async (id) => {
    const hasServices = services.some(service => service.categoryId === id);
    if (hasServices) {
      alert("Không thể xóa category khi vẫn còn dịch vụ thuộc category này!");
      return;
    }

    if (window.confirm("Bạn có chắc muốn xóa category này?")) {
      try {
        await deleteServiceCategory(id);
        setCategories(prev => prev.filter(cat => cat.id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Có lỗi xảy ra khi xóa category!");
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllServiceCategories();
        if (res.result) {
          setCategories(res.result);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    const fetchServices = async () => {
      try {
        const res = await getAllServices();
        setServices(res.result);
      } catch (error) {
        setServices([]);
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
    fetchCategories();
  }, [isAdding]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

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

        {/* Quản lý Category */}
        <div className="bg-gray-800 p-3 mt-3 border border-gray-700 rounded">
          <div className="mb-2 font-semibold text-gray-200">Quản lý Category</div>
          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Thêm Category
            </button>
          </div>

          {isAddingCategory && (
            <div className="mb-2">
              <input
                type="text"
                placeholder="Tên category"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
              />
              {categoryErrors.name && (
                <p className="text-red-400 text-sm">{categoryErrors.name}</p>
              )}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleAddCategory}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Lưu
                </button>
                <button
                  onClick={() => {
                    setIsAddingCategory(false);
                    setCategoryErrors({});
                    setNewCategory({ name: "" });
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Tên Category</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{cat.id}</td>
                  {cat.id === editingCategoryId ? (
                    <>
                      <td className="border border-gray-600 p-1">
                        <input
                          type="text"
                          value={editedCategory.name}
                          onChange={(e) =>
                            setEditedCategory((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={handleSaveEditCategory}
                          className="text-green-400 hover:text-green-200"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={handleCancelEditCategory}
                          className="text-red-400 hover:text-red-200 ml-2"
                        >
                          <FaTimes />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">{cat.name}</td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleStartEditCategory(cat)}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDeleteCategory(cat.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không có category nào!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                <select
                  name="categoryId"
                  value={newService.categoryId}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                >
                  <option value="">Select Category</option>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
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
    type="text" // Thay đổi từ "number" sang "text"
    name="price"
    placeholder="Giá (VNĐ)"
    value={newService.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    onChange={(e) => {
      const value = e.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm
      setNewService((prev) => ({
        ...prev,
        price: value ? parseInt(value, 10) : 0, // Chuyển đổi thành số
      }));
    }}
    className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
  />
  {addErrors.price && (
    <p className="text-red-400 text-sm">{addErrors.price}</p>
  )}
</div>
              {/* Thời gian */}
              <div>
                <input
                  type="number"
                  name="duration"
                  placeholder="Thời gian (phút)"
                  value={newService.duration}
                  onChange={(e) => handleInputChange(e, setNewService)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                  min="0"
                  step="5"
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
                  <p className="text-red-400 text-sm">
                    {addErrors.description}
                  </p>
                )}
              </div>
              {/* Upload ảnh (chỉ nhận JPG và PNG) */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                  accept="image/jpeg, image/png"
                />
                {newService.thumbnail && (
                  <img
                    src={newService.thumbnail}
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
                  setNewService({
                    category: "",
                    name: "",
                    thumbnail: "",
                    price: "",
                    duration: "",
                    description: "",
                  });
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
                        <select
                          name="categoryId"
                          value={editedService.category.id}
                          onChange={(e) =>
                            setEditedService((prev) => ({
                              ...prev,
                              category: {
                                ...prev.category,
                                id: e.target.value,
                              },
                              categoryId: e.target.value,
                            }))
                          }
                          className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                        >
                          <option value="">Select Category</option>
                          {categories.length > 0 &&
                            categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                        </select>
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
                          onChange={handleImageChange}
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                          accept="thumbnail/jpeg, thumbnail/png"
                        />
                        {editedService.thumbnail && (
                          <img
                            src={editedService.thumbnail}
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
                          type="number"
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
                          onClick={handleSaveEdit}
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
                      <td className="border border-gray-600 p-2">
                        {s.category?.name}
                      </td>
                      <td className="border border-gray-600 p-2">{s.name}</td>
                      <td className="border border-gray-600 p-2">
                        {s.thumbnail && (
                          <img
                            src={s.thumbnail}
                            alt="Service"
                            className="w-10 h-10 object-cover inline-block"
                          />
                        )}
                      </td>
                      <td className="border border-gray-600 p-2">{s.price}</td>
                      <td className="border border-gray-600 p-2">
                        {s.duration}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {s.description}
                      </td>
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
