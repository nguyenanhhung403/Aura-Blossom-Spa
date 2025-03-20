import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaPlus } from "react-icons/fa";
import Sidebar from "../SideBar";
import { getQuizById } from "../../../service/quizApi";
import {
  createQuestionWithAnswers,
  deleteQuestion,
  updateQuestion,
} from "../../../service/questionApi";

const QuizDetail = () => {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuizSetById = async (id) => {
      const response = await getQuizById(id);
      console.log(response.result);
      setQuestions(response.result.questions || []);
    };
    fetchQuizSetById(id);
  }, [id]);

  // Tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  const filteredQuestions = questions.filter(
    (q) =>
      q.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [isAdding, setIsAdding] = useState(false);

  const [newQuestion, setNewQuestion] = useState({ question: "" });
  const [newAnswers, setNewAnswers] = useState([
    { answer: "", score: 0 },
    { answer: "", score: 0 },
    { answer: "", score: 0 },
    { answer: "", score: 0 },
  ]);
  const [addErrors, setAddErrors] = useState({});

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index, e) => {
    const { name, value } = e.target;
    setNewAnswers((prev) =>
      prev.map((answer, i) =>
        i === index ? { ...answer, [name]: value } : answer
      )
    );
  };

  const handleAddQuestion = async () => {
    const errors = {};
    if (!newQuestion.question.trim()) {
      errors.question = "Câu hỏi không được để trống";
    }
    for (let i = 0; i <= 3; i++) {
      if (!newAnswers[i].answer.trim()) {
        errors[`option${i}Text`] = `Option ${i} không được để trống`;
      }
      const score = parseInt(newAnswers[i].score, 10);
      if (isNaN(score) || score < 10 || score > 20) {
        errors[`option${i}Score`] = `Điểm Option ${i} phải từ 10 đến 20`;
      }
    }
    if (Object.keys(errors).length > 0) {
      setAddErrors(errors);
      return;
    }
    const requestBody = {
      question: newQuestion.question,
      answerRequestList: newAnswers,
    };
    try {
      const response = await createQuestionWithAnswers(requestBody, id);
      console.log(response.result);
      setQuestions((prev) => [...prev, response.result]);
    } catch (error) {
      console.error("Lỗi thêm câu hỏi:", error);
    }
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
      option1Text: q.answers[0].answer,
      option1Score: q.answers[0].score,
      option2Text: q.answers[1].answer,
      option2Score: q.answers[1].score,
      option3Text: q.answers[2].answer,
      option3Score: q.answers[2].score,
      option4Text: q.answers[3].answer,
      option4Score: q.answers[3].score,
    });
  };

  const handleSaveEdit = async (idQ) => {
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

    // Chuẩn bị dữ liệu gửi API
    const updatedQuestion = {
      id: idQ,
      question: editedQuestion.question,
      answers: [
        {
          answer: editedQuestion.option1Text,
          score: parseInt(editedQuestion.option1Score, 10),
        },
        {
          answer: editedQuestion.option2Text,
          score: parseInt(editedQuestion.option2Score, 10),
        },
        {
          answer: editedQuestion.option3Text,
          score: parseInt(editedQuestion.option3Score, 10),
        },
        {
          answer: editedQuestion.option4Text,
          score: parseInt(editedQuestion.option4Score, 10),
        },
      ],
    };

    try {
      const response = await updateQuestion(idQ, updatedQuestion);
      console.log(response.result);
      setQuestions((prev) =>
        prev.map((q) => (q.id === idQ ? updatedQuestion : q))
      );
      setEditingId(null);
      setEditedQuestion({});
      alert("Cập nhật thành công!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedQuestion({});
  };

  // Xóa câu hỏi
  const handleDelete = async (idQ) => {
    if (window.confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
      try {
        await deleteQuestion(idQ);
        setQuestions((prev) => prev.filter((q) => q.id !== idQ));
      } catch (error) {
        console.error("Lỗi xóa câu hỏi:", error);
      }
    }
  };

  if (questions.length == 0) {
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
                <label className="block text-gray-300 mb-1">
                  Nội dung câu hỏi
                </label>
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
              {newAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Option {index + 1}
                    </label>
                    <input
                      type="text"
                      name="answer"
                      placeholder={`Nội dung Option ${index + 1}`}
                      value={answer.answer}
                      onChange={(e) => handleAnswerChange(index, e)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">
                      Điểm (10-20)
                    </label>
                    <input
                      type="number"
                      name="score"
                      placeholder="10-20"
                      value={answer.score}
                      onChange={(e) => handleAnswerChange(index, e)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 text-white rounded"
                    />
                  </div>
                </div>
              ))}
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
                <th className="border border-gray-600 p-2">
                  Lựa chọn (Text | Điểm)
                </th>
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
                      <td className="border border-gray-600 p-2">
                        {q.question}
                      </td>
                      <td className="border border-gray-600 p-2">
                        {q.answers.map((opt, i) => (
                          <div key={i}>
                            {opt.answer} | {opt.score}
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
                  <td
                    colSpan="5"
                    className="p-4 text-center text-red-400 font-semibold"
                  >
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
