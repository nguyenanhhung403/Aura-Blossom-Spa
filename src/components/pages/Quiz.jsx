import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../../App.css";
import axios from "axios";

import QuizBanner from "../images/QuizImage/QuizBanner.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getAllServices } from "../service/serviceApi";
import { getAllQuizzes, getAllQuizzesByCategoryId } from "../service/quizApi";
import { getAllServiceCategories } from "../service/serviceCategoryApi";
import { calculateRecommendation } from "../service/servicerecommendation";

const Quiz = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [recommendationList, setRecommendationList] = useState([]);

  // Gọi API lấy danh sách dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices();
        setServices(response.result || []);
      } catch (error) {
        console.error("Lỗi tải dịch vụ:", error);
      }
    };
    fetchServices();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setQuizSubmitted(false);
  };

  return (
    <>
      <Navbar />
      <div className="quiz-container">
        <div className="quiz-banner">
          <img src={QuizBanner} alt="quiz-banner" />
          <h1 className="quiz-header">TRẮC NGHIỆM</h1>
        </div>
        <div className="quiz-description">
          <p>
            Giúp chúng tôi hiểu rõ hơn về nhu cầu của bạn bằng cách trả lời
            những câu hỏi dưới đây nhé!
          </p>
          <div className="quiz-underline"></div>
          <div className="quiz-slider">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
            >
              {services.map((service) => (
                <SwiperSlide
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="slide-item">{service.name}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {selectedService && (
          <QuizComponent
            service={selectedService}
            setQuizSubmitted={setQuizSubmitted}
            setRecommendationList={setRecommendationList}
          />
        )}

        {quizSubmitted && (
          <Recommendations recommendations={recommendationList} />
        )}
      </div>
      <Footer />
    </>
  );
};

const QuizComponent = ({
  service,
  setQuizSubmitted,
  setRecommendationList,
}) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [quiz, setQuiz] = useState(null);

  // Gọi API lấy danh sách câu hỏi
  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const response = await getAllQuizzesByCategoryId(service.category?.id);
        setQuestions(response.result.questions || []);
        console.log(response.result.questions);
        setQuiz(response.result);
      } catch (error) {
        console.error("Lỗi tải câu hỏi:", error);
      }
    }
    fetchAllQuestions();
  }, [service.category?.id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const allAnswered = questions.every((q) => answers[q.id]);
    if (!allAnswered) {
      alert("Vui lòng trả lời hết tất cả câu hỏi trước khi nộp bài!");
      return;
    }

    if (!submitted) {
      setSubmitted(true);
      setQuizSubmitted(true);

      const requestBody = {
        quizId: quiz.id, // Hoặc service.quizId nếu có
        answersIds: Object.values(answers), // Lấy danh sách ID của các đáp án đã chọn
      };

      try{
        const response = await calculateRecommendation(requestBody);
        setRecommendationList(response.result || []);
      }catch(error){
        console.error("Lỗi nộp bài:", error);
      }

      setTimeout(() => {
        document
          .getElementById("recommendations")
          .scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };


  return (
    <div className="quiz-content">
      <h2>{service.name}</h2>
      {questions.length > 0 ? (
        <form className="quiz-form">
          {questions.map((q) => (
            <div key={q.id} className="quiz-question">
              <p>{q.question}</p>
              <div className="quiz-options-grid">
                {q.answers.map((option, idx) => (
                  <label
                    key={option.id}
                    className={`quiz-option ${
                      answers[q.id] === option.id ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`} // Nhóm radio theo câu hỏi
                      value={option.id}
                      checked={answers[q.id] === option.id} // Kiểm tra theo ID
                      onChange={() => handleAnswerChange(q.id, option.id)}
                    />
                    <span className="option-label">
                      {String.fromCharCode(65 + idx)}.
                    </span>{" "}
                    {option.answer} {/* Hiển thị nội dung đáp án */}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="quiz-submit-container">
            <button type="button" className="submit-btn" onClick={handleSubmit}>
              Nộp bài
            </button>
          </div>
        </form>
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
      {submitted && (
        <p className="success-message">
          Nộp bài thành công! Xem gợi ý dịch vụ bên dưới.
        </p>
      )}
    </div>
  );
};

const Recommendations = ({ recommendations }) => {
  const navigate = useNavigate();

  return (
    <div id="recommendations" className="recommendations-container">
      <h2>
        Dựa trên câu trả lời của bạn, chúng tôi gợi ý một vài dịch vụ phù hợp
        nhất.
      </h2>
      <div className="recommendations-grid">
        {recommendations.length > 0 ? (
          recommendations.map((service) => (
            <div
              key={service.service_id}
              className="recommendation-item"
              onClick={() => navigate(`/services/${service.service_id}`)}
            >
              <img
                src={service.thumbnail_url}
                alt={service.service_name}
                className="recommendation-image"
              />
              <p>{service.name}</p>
            </div>
          ))
        ) : (
          <p>Không có gợi ý nào.</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
