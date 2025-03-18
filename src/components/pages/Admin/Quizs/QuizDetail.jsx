import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import Sidebar from "../SideBar";

/**
 * Dữ liệu gốc cho nhiều ID quiz:
 *  - key: ID (chuỗi) hoặc số
 *  - value: mảng câu hỏi
 */
const initialData = {
  "1": [
    {
      id: 1,
      question: "Bạn thích thời gian thư giãn vào lúc nào?",
      options: [
        { text: "Sáng sớm", score: 10 },
        { text: "Trưa", score: 12 },
        { text: "Chiều", score: 15 },
        { text: "Tối", score: 20 },
      ],
    },
    {
      id: 2,
      question: "Mức độ căng thẳng của bạn hiện tại như thế nào?",
      options: [
        { text: "Rất căng thẳng", score: 20 },
        { text: "Khá căng thẳng", score: 15 },
        { text: "Bình thường", score: 12 },
        { text: "Rất thư giãn", score: 10 },
      ],
    },
    {
      id: 3,
      question: "Bạn ưu tiên dịch vụ spa nào?",
      options: [
        { text: "Massage thư giãn", score: 12 },
        { text: "Chăm sóc da chuyên sâu", score: 15 },
        { text: "Gói toàn thân cao cấp", score: 20 },
        { text: "Liệu trình làm đẹp nhẹ nhàng", score: 10 },
      ],
    },
  ],
  "2": [
    {
      id: 1,
      question: "Bạn thích đi spa cùng ai?",
      options: [
        { text: "Một mình", score: 10 },
        { text: "Bạn bè", score: 12 },
        { text: "Gia đình", score: 15 },
        { text: "Đồng nghiệp", score: 20 },
      ],
    },
    {
      id: 2,
      question: "Tần suất bạn đến spa?",
      options: [
        { text: "1 lần/tháng", score: 10 },
        { text: "2 lần/tháng", score: 12 },
        { text: "1 lần/tuần", score: 15 },
        { text: "2-3 lần/tuần", score: 20 },
      ],
    },
    {
      id: 3,
      question: "Bạn thường chọn spa vì lý do nào?",
      options: [
        { text: "Giảm stress", score: 20 },
        { text: "Chăm sóc da", score: 15 },
        { text: "Cải thiện sức khỏe", score: 12 },
        { text: "Theo trend", score: 10 },
      ],
    },
  ],
};

const QuizDetail = () => {
  const { id } = useParams();

  // Lấy danh sách câu hỏi của quiz từ initialData (nếu không có thì là mảng rỗng)
  const initialQuestions = initialData[id] || [];

  // State chứa danh sách câu hỏi và hỗ trợ CRUD
  const [questions, setQuestions] = useState(initialQuestions);

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const filteredQuestions = questions.filter((q) =>
    q.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||  // Thêm điều kiện tìm theo ID
    q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Trạng thái mở form thêm
  const [isAdding, setIsAdding] = useState(false);
  // Form thêm câu hỏi (thay đổi UI - sắp xếp dọc, nhóm input)
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    option1Text: "",
    option1Score: "",
    option2Text: "",
    option2Score: "",
    option3Text: "",
    option3Score: "",
    option4Text: "",
    option4Score: "",
  });
  const [addErrors, setAddErrors] = useState({});

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  // Thêm câu hỏi
  const handleAddQuestion = () => {
    const errors = {};
    if (!newQuestion.question.trim()) {
      errors.question = "Câu hỏi không được để trống";
    }
    for (let i = 1; i <= 4; i++) {
      if (!newQuestion[`option${i}Text`].trim()) {
        errors[`option${i}Text`] = `Option ${i} không được để trống`;
      }
      const score = parseInt(newQuestion[`option${i}Score`], 10);
      if (isNaN(score) || score < 10 || score > 20) {
        errors[`option${i}Score`] = `Điểm Option ${i} phải từ 10 đến 20`;
      }
    }
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }

    // Tạo câu hỏi mới
    const newId =
      questions.length > 0 ? Math.max(...questions.map((q) => q.id)) + 1 : 1;
    const questionToAdd = {
      id: newId,
      question: newQuestion.question,
      options: [
        {
          text: newQuestion.option1Text,
          score: parseInt(newQuestion.option1Score, 10),
        },
        {
          text: newQuestion.option2Text,
          score: parseInt(newQuestion.option2Score, 10),
        },
        {
          text: newQuestion.option3Text,
          score: parseInt(newQuestion.option3Score, 10),
        },
        {
          text: newQuestion.option4Text,
          score: parseInt(newQuestion.option4Score, 10),
        },
      ],
    };
    setQuestions((prev) => [...prev, questionToAdd]);
    // Reset form
    setNewQuestion({
      question: "",
      option1Text: "",
      option1Score: "",
      option2Text: "",
      option2Score: "",
      option3Text: "",
      option3Score: "",
      option4Text: "",
      option4Score: "",
    });
    setAddErrors({});
    setIsAdding(false);
  };

  // Sửa câu hỏi
  const [editingId, setEditingId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState({});

  const handleStartEdit = (q) => {
    setEditingId(q.id);
    setEditedQuestion({
      question: q.question,
      option1Text: q.options[0].text,
      option1Score: q.options[0].score,
      option2Text: q.options[1].text,
      option2Score: q.options[1].score,
      option3Text: q.options[2].text,
      option3Score: q.options[2].score,
      option4Text: q.options[3].text,
      option4Score: q.options[3].score,
    });
  };

  const handleSaveEdit = (idQ) => {
    // Kiểm tra lỗi tương tự khi thêm
    const errors = {};
    if (!editedQuestion.question.trim()) {
      errors.question = "Câu hỏi không được để trống";
    }
    for (let i = 1; i <= 4; i++) {
      if (!editedQuestion[`option${i}Text`].trim()) {
        errors[`option${i}Text`] = `Option ${i} không được để trống`;
      }
      const score = parseInt(editedQuestion[`option${i}Score`], 10);
      if (isNaN(score) || score < 10 || score > 20) {
        errors[`option${i}Score`] = `Điểm Option ${i} phải từ 10 đến 20`;
      }
    }
    if (Object.keys(errors).length > 0) {
      alert("Vui lòng kiểm tra dữ liệu nhập vào!");
      return;
    }

    setQuestions((prev) =>
      prev.map((q) =>
        q.id === idQ
          ? {
              id: idQ,
              question: editedQuestion.question,
              options: [
                {
                  text: editedQuestion.option1Text,
                  score: parseInt(editedQuestion.option1Score, 10),
                },
                {
                  text: editedQuestion.option2Text,
                  score: parseInt(editedQuestion.option2Score, 10),
                },
                {
                  text: editedQuestion.option3Text,
                  score: parseInt(editedQuestion.option3Score, 10),
                },
                {
                  text: editedQuestion.option4Text,
                  score: parseInt(editedQuestion.option4Score, 10),
                },
              ],
            }
          : q
      )
    );
    setEditingId(null);
    setEditedQuestion({});
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedQuestion({});
  };

  // Xóa câu hỏi
  const handleDelete = (idQ) => {
    if (window.confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
      setQuestions((prev) => prev.filter((q) => q.id !== idQ));
    }
  };

  // Nếu ID quiz không tồn tại trong dữ liệu
  if (!initialData[id]) {
    return (
      <div className="flex min-h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-4 text-white">
          <p>Không tìm thấy dữ liệu cho Quiz có ID = {id}</p>
          <Link to="/admin/quizlist" className="text-indigo-500">
            Trở về danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Nút trở về */}
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
          Danh sách câu hỏi của Quiz (ID: {id})
        </div>

        {/* Thanh công cụ: Thêm + Tìm kiếm */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-gray-800 p-3 border border-gray-700 rounded mb-4">
          <div className="flex items-center gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setIsAdding(true)}
              className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 flex items-center gap-1"
            >
              <FaPlus />
              <span>Thêm câu hỏi</span>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm theo ID hoặc nội dung..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-2 pr-2 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Form thêm câu hỏi (thiết kế lại giao diện) */}
        {isAdding && (
          <div className="bg-gray-800 border border-gray-700 rounded p-4 mb-4">
            <h3 className="text-gray-200 text-lg font-semibold mb-3">
              Thêm câu hỏi mới
            </h3>
            <div className="flex flex-col space-y-3">
              {/* Câu hỏi */}
              <div>
                <label className="block text-gray-300 mb-1">Nội dung câu hỏi</label>
                <input
                  type="text"
                  name="question"
                  value={newQuestion.question}
                  onChange={handleNewInputChange}
                  className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                />
                {addErrors.question && (
                  <p className="text-red-400 text-sm">{addErrors.question}</p>
                )}
              </div>
              {/* Option 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 mb-1">Option 1</label>
                  <input
                    type="text"
                    name="option1Text"
                    placeholder="Nội dung Option 1"
                    value={newQuestion.option1Text}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option1Text && (
                    <p className="text-red-400 text-sm">{addErrors.option1Text}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Điểm (10-20)</label>
                  <input
                    type="number"
                    name="option1Score"
                    placeholder="10-20"
                    value={newQuestion.option1Score}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option1Score && (
                    <p className="text-red-400 text-sm">{addErrors.option1Score}</p>
                  )}
                </div>
              </div>
              {/* Option 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 mb-1">Option 2</label>
                  <input
                    type="text"
                    name="option2Text"
                    placeholder="Nội dung Option 2"
                    value={newQuestion.option2Text}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option2Text && (
                    <p className="text-red-400 text-sm">{addErrors.option2Text}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Điểm (10-20)</label>
                  <input
                    type="number"
                    name="option2Score"
                    placeholder="10-20"
                    value={newQuestion.option2Score}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option2Score && (
                    <p className="text-red-400 text-sm">{addErrors.option2Score}</p>
                  )}
                </div>
              </div>
              {/* Option 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 mb-1">Option 3</label>
                  <input
                    type="text"
                    name="option3Text"
                    placeholder="Nội dung Option 3"
                    value={newQuestion.option3Text}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option3Text && (
                    <p className="text-red-400 text-sm">{addErrors.option3Text}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Điểm (10-20)</label>
                  <input
                    type="number"
                    name="option3Score"
                    placeholder="10-20"
                    value={newQuestion.option3Score}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option3Score && (
                    <p className="text-red-400 text-sm">{addErrors.option3Score}</p>
                  )}
                </div>
              </div>
              {/* Option 4 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-300 mb-1">Option 4</label>
                  <input
                    type="text"
                    name="option4Text"
                    placeholder="Nội dung Option 4"
                    value={newQuestion.option4Text}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option4Text && (
                    <p className="text-red-400 text-sm">{addErrors.option4Text}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Điểm (10-20)</label>
                  <input
                    type="number"
                    name="option4Score"
                    placeholder="10-20"
                    value={newQuestion.option4Score}
                    onChange={handleNewInputChange}
                    className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                  />
                  {addErrors.option4Score && (
                    <p className="text-red-400 text-sm">{addErrors.option4Score}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Nút Lưu / Hủy */}
            <div className="flex space-x-3 mt-4">
              <button
                onClick={handleAddQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-green-700"
              >
                <FaCheck />
                <span>Lưu</span>
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setAddErrors({});
                }}
                className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-red-700"
              >
                <FaTimes />
                <span>Hủy</span>
              </button>
            </div>
          </div>
        )}

        {/* Bảng danh sách câu hỏi */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-center">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="border border-gray-600 p-2">ID</th>
                <th className="border border-gray-600 p-2">Câu hỏi</th>
                <th className="border border-gray-600 p-2">Lựa chọn (Text | Điểm)</th>
                <th className="border border-gray-600 p-2">Sửa</th>
                <th className="border border-gray-600 p-2">Xóa</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 text-gray-200">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-700">
                  <td className="border border-gray-600 p-2">{q.id}</td>
                  {editingId === q.id ? (
                    <>
                      <td className="border border-gray-600 p-2">
                        <input
                          type="text"
                          value={editedQuestion.question}
                          onChange={(e) =>
                            setEditedQuestion((prev) => ({
                              ...prev,
                              question: e.target.value,
                            }))
                          }
                          className="border p-1 w-full bg-gray-700 border-gray-600 text-white rounded"
                        />
                      </td>
                      <td className="border border-gray-600 p-2">
                        <div className="space-y-2">
                          {[0, 1, 2, 3].map((index) => (
                            <div key={index} className="flex gap-2">
                              <input
                                type="text"
                                value={editedQuestion[`option${index + 1}Text`]}
                                onChange={(e) =>
                                  setEditedQuestion((prev) => ({
                                    ...prev,
                                    [`option${index + 1}Text`]: e.target.value,
                                  }))
                                }
                                className="border p-1 w-full bg-gray-700 border-gray-600 text-white rounded"
                              />
                              <input
                                type="number"
                                value={
                                  editedQuestion[`option${index + 1}Score`]
                                }
                                onChange={(e) =>
                                  setEditedQuestion((prev) => ({
                                    ...prev,
                                    [`option${index + 1}Score`]: e.target.value,
                                  }))
                                }
                                className="border p-1 w-20 bg-gray-700 border-gray-600 text-white rounded"
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleSaveEdit(q.id)}
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
                          onClick={() => handleDelete(q.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-600 p-2">{q.question}</td>
                      <td className="border border-gray-600 p-2">
                        {q.options.map((opt, i) => (
                          <div key={i}>
                            {opt.text} | {opt.score}
                          </div>
                        ))}
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleStartEdit(q)}
                          className="text-blue-400 hover:text-blue-200"
                        >
                          <FaEdit />
                        </button>
                      </td>
                      <td className="border border-gray-600 p-2">
                        <button
                          onClick={() => handleDelete(q.id)}
                          className="text-red-400 hover:text-red-200"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {filteredQuestions.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-4 text-center text-red-400 font-semibold">
                    Không tìm thấy câu hỏi phù hợp!
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

export default QuizDetail;
