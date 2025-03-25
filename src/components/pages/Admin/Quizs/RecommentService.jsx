import React, { useEffect, useState } from "react";
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
import { getAllServiceCategories } from "../../../service/serviceCategoryApi";
import { getAllServices } from "../../../service/serviceApi";
import {
  createServiceRecommendation,
  deleteServiceRecommendation,
  getAllServiceRecommendations,
  updateServiceRecommendation,
} from "../../../service/servicerecommendation";
import { getAllQuizzes } from "../../../service/quizApi";

const RecommendService = () => {
  const [quizes, setQuizes] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [recommendServices, setRecommendServices] = useState([]);
  useEffect(() => {
    const fetchAllQuizes = async () => {
      const response = await getAllQuizzes();
      setQuizes(response.result);
    };
    const fetchAllServices = async () => {
      const response = await getAllServices();
      setAllServices(response.result);
    };
    const fetchAllServiceRecommendations = async () => {
      const response = await getAllServiceRecommendations();
      setRecommendServices(
        response.result.map((item) => ({
          ...item,
          serviceId: item.service_id,
          quizId: item.quiz_id,
        }))
      );
      console.log(response.result);
    };
    fetchAllServiceRecommendations();
    fetchAllServices();
    fetchAllQuizes();
  }, []);

  // State tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");

  // Lọc theo searchTerm (tìm kiếm theo id, quizCategory, service)
  const filteredRecommendServices = recommendServices?.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.id.toString().toLowerCase().includes(search) ||
      item.quiz_title.toLowerCase().includes(search) ||
      item.service_name.toLowerCase().includes(search)
    );
  });

  // State điều khiển form Thêm mới
  const [isAdding, setIsAdding] = useState(false);
  const [newRecommend, setNewRecommend] = useState({
    quizId: "",
    quiz_title: "",
    serviceId: "",
    service_name: "",
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
  const handleAddRecommend = async () => {
    const errors = {};
    // Kiểm tra các trường
    if (!newRecommend.quizId.trim()) {
      errors.quiz = "Vui lòng chọn Category";
    }
    if (!newRecommend.serviceId.trim()) {
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

    try {
      const response = await createServiceRecommendation(newRecommend);

      setRecommendServices((prev) => [...prev, response.result]);
      setNewRecommend({
        quizId: "",
        quiz_title: "",
        serviceId: "",
        service_name: "",
        minScore: "",
        maxScore: "",
      });
      setAddErrors({});
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding recommend service:", error);
      if (error.response.data.code == 2006) {
        alert("Recommend Service đã tồn tại");
        return;
      }
    }
  };

  // State điều khiển chỉnh sửa
  const [editingId, setEditingId] = useState(null);
  const [editedRecommend, setEditedRecommend] = useState({});

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditedRecommend(item);
    console.log(item);
  };

  const handleSaveEdit = async (id) => {
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

    try {
      console.log(editedRecommend);
      const response = await updateServiceRecommendation(
        editingId,
        editedRecommend
      );
      setRecommendServices((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...response.result,
                quizId: response.result?.quiz_id,
                serviceId: response.result?.service_id,
              }
            : s
        )
      );
      setEditingId(null);
      setEditedRecommend(null);
    } catch (error) {
      console.error("Error updating recommend service:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedRecommend({});
  };

  // Xóa
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa Recommend Service này?")) {
      try {
        await deleteServiceRecommendation(id);
        setRecommendServices((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error deleting recommend service:", error);
      }
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
                  name="quizId"
                  value={newRecommend.quizId}
                  onChange={(e) => handleInputChange(e, setNewRecommend)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                >
                  <option value="">-- Chọn Quiz --</option>
                  {quizes.map((quiz) => (
                    <option key={quiz.id} value={quiz.id}>
                      {quiz.title}
                    </option>
                  ))}
                </select>
                {addErrors.quiz && (
                  <p className="text-red-400 text-sm">
                    {addErrors.quizCategory}
                  </p>
                )}
              </div>

              {/* Service */}
              <div>
                <select
                  name="serviceId"
                  value={newRecommend.serviceId}
                  onChange={(e) => handleInputChange(e, setNewRecommend)}
                  className="border p-1 bg-gray-700 border-gray-600 text-white w-full"
                >
                  <option value="">-- Chọn Dịch vụ --</option>
                  {allServices.map((svc) => (
                    <option key={svc.id} value={svc.id}>
                      {svc.name}
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
                <th className="border border-gray-600 p-2">Quiz Title</th>
                <th className="border border-gray-600 p-2">Service</th>
                <th className="border border-gray-600 p-2">Min Score</th>
                <th className="border border-gray-600 p-2">Max Score</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredRecommendServices.map((item) => (
                <tr
                  key={item.id + "-" + item.serviceId}
                  className="hover:bg-gray-700"
                >
                  <td className="border border-gray-600 p-2">{item.id}</td>

                  {editingId === item.id ? (
                    <>
                      {/* Quiz Category edit */}
                      <td className="border border-gray-600 p-1">
                        <select
                          value={editedRecommend.quizId}
                          onChange={(e) =>
                            setEditedRecommend((prev) => ({
                              ...prev,
                              quizId: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        >
                          {quizes.map((quiz) => (
                            <option key={quiz.id} value={quiz.id}>
                              {quiz.title}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Service edit */}
                      <td className="border border-gray-600 p-1">
                        <select
                          value={editedRecommend.serviceId}
                          onChange={(e) =>
                            setEditedRecommend((prev) => ({
                              ...prev,
                              serviceId: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white"
                        >
                          {allServices.map((svc) => (
                            <option key={svc.id} value={svc.id}>
                              {svc.name}
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
                        {item.quiz_title}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {item.service_name}
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
