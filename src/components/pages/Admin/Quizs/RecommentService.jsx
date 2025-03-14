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

// Danh sách các Quiz Category (danh mục Quiz)
const quizCategories = [
  "Mặt",
  "Body",
  "Trị sẹo",
  "Sáng da",
  "Trị thâm",
];

// Danh sách các dịch vụ (theo ví dụ từ hình)
const allServices = [
  "Soi da & tư vấn phác đồ trị mụn",
  "Laser Pico trị nám",
  "Nặn mụn oxy tèo bề bề",
  "Điện di Collagen tăng sinh elastin",
  "Laser Fractional CO2 trị sẹo",
  "RF Lifting trẻ hóa da",
  "Lấy nhân mụn y khoa",
];

const RecommendService = () => {
  // Dữ liệu mẫu
  const [recommendServices, setRecommendServices] = useState([
    {
      id: 1,
      quizCategory: "Mặt",
      service: "Soi da & tư vấn phác đồ trị mụn",
      minScore: 0,
      maxScore: 10,
    },
    {
      id: 2,
      quizCategory: "Trị sẹo",
      service: "Laser Fractional CO2 trị sẹo",
      minScore: 5,
      maxScore: 15,
    },
    {
      id: 3,
      quizCategory: "Sáng da",
      service: "Điện di Collagen tăng sinh elastin",
      minScore: 8,
      maxScore: 20,
    },
  ]);

  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc theo searchTerm (tìm kiếm theo id, quizCategory, service)
  const filteredRecommendServices = recommendServices.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.id.toString().toLowerCase().includes(search) ||
      item.quizCategory.toLowerCase().includes(search) ||
      item.service.toLowerCase().includes(search)
    );
  });

  // State điều khiển form Thêm mới
  const [isAdding, setIsAdding] = useState(false);
  const [newRecommend, setNewRecommend] = useState({
    quizCategory: "",
    service: "",
    minScore: "",
    maxScore: "",
  });
  const [addErrors, setAddErrors] = useState({});

  // Xử lý thay đổi input
  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm Recommend Service
  const handleAddRecommend = () => {
    const errors = {};
    // Kiểm tra các trường
    if (!newRecommend.quizCategory.trim()) {
      errors.quizCategory = "Vui lòng chọn Category";
    }
    if (!newRecommend.service.trim()) {
      errors.service = "Vui lòng chọn Dịch vụ";
    }
    if (newRecommend.minScore === "") {
      errors.minScore = "Vui lòng nhập Min Score";
    }
    if (newRecommend.maxScore === "") {
      errors.maxScore = "Vui lòng nhập Max Score";
    }
    // Check logic min < max
    if (
      newRecommend.minScore !== "" &&
      newRecommend.maxScore !== "" &&
      Number(newRecommend.minScore) > Number(newRecommend.maxScore)
    ) {
      errors.scoreRange = "Min Score không được lớn hơn Max Score";
    }

    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    // Nếu không có lỗi -> thêm vào danh sách
    const newId =
      recommendServices.length > 0
        ? Math.max(...recommendServices.map((s) => s.id)) + 1
        : 1;
    const recommendToAdd = {
      ...newRecommend,
      id: newId,
      minScore: Number(newRecommend.minScore),
      maxScore: Number(newRecommend.maxScore),
    };
    setRecommendServices((prev) => [...prev, recommendToAdd]);
    // Reset form
    setNewRecommend({ quizCategory: "", service: "", minScore: "", maxScore: "" });
    setAddErrors({});
    setIsAdding(false);
  };

  // State điều khiển chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editedRecommend, setEditedRecommend] = useState({});

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditedRecommend(item);
  };

  const handleSaveEdit = (id) => {
    // Kiểm tra logic min/max
    const errors = {};
    if (editedRecommend.minScore === "") {
      errors.minScore = "Vui lòng nhập Min Score";
    }
    if (editedRecommend.maxScore === "") {
      errors.maxScore = "Vui lòng nhập Max Score";
    }
    if (
      editedRecommend.minScore !== "" &&
      editedRecommend.maxScore !== "" &&
      Number(editedRecommend.minScore) > Number(editedRecommend.maxScore)
    ) {
      errors.scoreRange = "Min Score không được lớn hơn Max Score";
    }

    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join("\n"));
      return;
    }

    setRecommendServices((prev) =>
      prev.map((s) => (s.id === id ? editedRecommend : s))
    );
    setEditingId(null);
    setEditedRecommend({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedRecommend({});
  };

  // Xóa
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa Recommend Service này?")) {
      setRecommendServices((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar giả sử đã có */}
      <Sidebar />

      <div className="flex-1 p-4">
        {/* Nút trở về (tùy bạn sử dụng đường dẫn gì) */}
        <div className="mb-3">
          <Link
            to="/admin/quizlist"
            className="inline-block bg-gray-700 text-gray-200 px-3 py-1 rounded hover:bg-gray-600"
          >
            &larr; Trở về
          </Link>
        </div>

        {/* Tiêu đề */}
        <div className="bg-gray-800 p-3 border-b border-gray-700 text-lg font-bold text-gray-100 mb-4">
          {filteredRecommendServices.length} Recommend Services
        </div>

        {/* Thanh công cụ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded">
          {/* Nút Thêm Recommend Service */}
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
            >
              Thêm Recommend Service
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

        {/* Form thêm Recommend Service */}
        {isAdding && (
          <div className="bg-gray-800 p-3 mt-3 border border-gray-700 rounded">
            <div className="mb-2 font-semibold text-gray-200">
              Thêm Recommend Service
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              {/* Quiz Category */}
              <div>
                <select
                  name="quizCategory"
                  value={newRecommend.quizCategory}
                  onChange={(e) => handleInputChange(e, setNewRecommend)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                >
                  <option value="">-- Chọn Category --</option>
                  {quizCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {addErrors.quizCategory && (
                  <p className="text-red-400 text-sm">{addErrors.quizCategory}</p>
                )}
              </div>

              {/* Service */}
              <div>
                <select
                  name="service"
                  value={newRecommend.service}
                  onChange={(e) => handleInputChange(e, setNewRecommend)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                >
                  <option value="">-- Chọn Dịch vụ --</option>
                  {allServices.map((svc) => (
                    <option key={svc} value={svc}>
                      {svc}
                    </option>
                  ))}
                </select>
                {addErrors.service && (
                  <p className="text-red-400 text-sm">{addErrors.service}</p>
                )}
              </div>

              {/* Min Score */}
              <div>
                <input
                  type="number"
                  name="minScore"
                  placeholder="Min Score"
                  value={newRecommend.minScore}
                  onChange={(e) => handleInputChange(e, setNewRecommend)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.minScore && (
                  <p className="text-red-400 text-sm">{addErrors.minScore}</p>
                )}
              </div>

              {/* Max Score */}
              <div>
                <input
                  type="number"
                  name="maxScore"
                  placeholder="Max Score"
                  value={newRecommend.maxScore}
                  onChange={(e) => handleInputChange(e, setNewRecommend)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                />
                {addErrors.maxScore && (
                  <p className="text-red-400 text-sm">{addErrors.maxScore}</p>
                )}
              </div>
            </div>
            {/* Lỗi logic min/max (nếu có) */}
            {addErrors.scoreRange && (
              <p className="text-red-400 text-sm">{addErrors.scoreRange}</p>
            )}

            <div className="flex space-x-2 mt-2">
              <button
                onClick={handleAddRecommend}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 flex items-center space-x-1"
              >
                <FaSave />
                <span>Lưu</span>
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setAddErrors({});
                  setNewRecommend({
                    quizCategory: "",
                    service: "",
                    minScore: "",
                    maxScore: "",
                  });
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center space-x-1"
              >
                <FaTimes />
                <span>Hủy</span>
              </button>
            </div>
          </div>
        )}

        {/* Bảng Recommend Services */}
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Quiz Category</th>
                <th className="border border-gray-600 p-2">Service</th>
                <th className="border border-gray-600 p-2">Min Score</th>
                <th className="border border-gray-600 p-2">Max Score</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredRecommendServices.map((item) => (
                <tr key={item.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{item.id}</td>

                  {editingId === item.id ? (
                    <>
                      {/* Quiz Category edit */}
                      <td className="border border-gray-600 p-1">
                        <select
                          value={editedRecommend.quizCategory}
                          onChange={(e) =>
                            setEditedRecommend((prev) => ({
                              ...prev,
                              quizCategory: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        >
                          {quizCategories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Service edit */}
                      <td className="border border-gray-600 p-1">
                        <select
                          value={editedRecommend.service}
                          onChange={(e) =>
                            setEditedRecommend((prev) => ({
                              ...prev,
                              service: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        >
                          {allServices.map((svc) => (
                            <option key={svc} value={svc}>
                              {svc}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Min Score edit */}
                      <td className="border border-gray-600 p-1">
                        <input
                          type="number"
                          value={editedRecommend.minScore}
                          onChange={(e) =>
                            setEditedRecommend((prev) => ({
                              ...prev,
                              minScore: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>

                      {/* Max Score edit */}
                      <td className="border border-gray-600 p-1">
                        <input
                          type="number"
                          value={editedRecommend.maxScore}
                          onChange={(e) =>
                            setEditedRecommend((prev) => ({
                              ...prev,
                              maxScore: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        />
                      </td>

                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
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
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">
                        {item.quizCategory}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {item.service}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {item.minScore}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {item.maxScore}
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          className="text-red-400 hover:text-red-200"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredRecommendServices.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
                    Không tìm thấy Recommend Service phù hợp!
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

export default RecommendService;
