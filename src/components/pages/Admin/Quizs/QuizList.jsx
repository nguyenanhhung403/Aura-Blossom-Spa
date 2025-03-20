// QuizSets.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar"; // Sidebar giống trang cũ
import { getAllQuizzes } from "../../../service/quizApi";

const QuizSets = () => {
  const [quizSets, setQuizSets] = useState([]);
  useEffect(() => {
    const fetchAllQuizSets = async () => {
      const response = await getAllQuizzes();
      setQuizSets(response.result);
    };
    fetchAllQuizSets();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung bên phải */}
      <div className="flex-1 p-4">
        {/* Tiêu đề */}
        <h1 className="text-2xl font-bold text-white mb-6">Bộ câu hỏi</h1>

        {/* Danh sách bộ quiz */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {quizSets.length > 0 &&
            quizSets.map((set) => (
              <div
                key={set.id}
                className="bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
              >
                <h2 className="text-xl text-white font-semibold">{set.title}</h2>
                <p className="text-gray-400 mt-1">
                  Số câu hỏi: {set.questions.length}
                </p>
                {/* Nút xem chi tiết - dẫn đến /admin/quizlist/:id */}
                <Link
                  to={`/admin/quizlist/${set.id}`}
                  className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                >
                  Chi tiết
                </Link>
              </div>
            ))}
        </div>

        {/* Nút Gợi ý dịch vụ đặt ở dưới danh sách */}
        <div className="">
          <Link
            to="/admin/recommend-service"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Gợi ý dịch vụ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizSets;
