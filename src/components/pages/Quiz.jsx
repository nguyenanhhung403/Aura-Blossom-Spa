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

const Quiz = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [recommendationList, setRecommendationList] = useState([]);

  // Gọi API lấy danh sách dịch vụ
  useEffect(() => {
    axios
      .get("https://your-api.com/services") // Thay bằng API thực tế
      .then((response) => setServices(response.data))
      .catch((error) => console.error("Lỗi tải dịch vụ:", error));
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
          <p>Giúp chúng tôi hiểu rõ hơn về nhu cầu của bạn bằng cách trả lời những câu hỏi dưới đây nhé!</p>
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
                <SwiperSlide key={service.id} onClick={() => handleServiceClick(service)}>
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

        {quizSubmitted && <Recommendations recommendations={recommendationList} />}
      </div>
      <Footer />
    </>
  );
};

const QuizComponent = ({ service, setQuizSubmitted, setRecommendationList }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Gọi API lấy danh sách câu hỏi
  useEffect(() => {
    axios
      .get(`https://your-api.com/questions?quizId=${service.id}`) // Thay bằng API thực tế
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Lỗi tải câu hỏi:", error));
  }, [service.id]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    const allAnswered = questions.every((q) => answers[q.id]);
    if (!allAnswered) {
      alert("Vui lòng trả lời hết tất cả câu hỏi trước khi nộp bài!");
      return;
    }

    if (!submitted) {
      setSubmitted(true);
      setQuizSubmitted(true);

      // Gọi API để lấy danh sách gợi ý
      axios
        .post("https://your-api.com/recommendations", { answers })
        .then((response) => setRecommendationList(response.data))
        .catch((error) => console.error("Lỗi tải gợi ý:", error));

      setTimeout(() => {
        document.getElementById("recommendations").scrollIntoView({ behavior: "smooth" });
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
                {q.options.map((option, idx) => (
                  <label key={idx} className={`quiz-option ${answers[q.id] === option ? "selected" : ""}`}>
                    <input type="radio" name={`question-${q.id}`} value={option} checked={answers[q.id] === option} onChange={() => handleAnswerChange(q.id, option)} />
                    <span className="option-label">{String.fromCharCode(65 + idx)}.</span> {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="quiz-submit-container">
            <button type="button" className="submit-btn" onClick={handleSubmit}>Nộp bài</button>
          </div>
        </form>
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
      {submitted && <p className="success-message"> Nộp bài thành công! Xem gợi ý dịch vụ bên dưới.</p>}
    </div>
  );
};

const Recommendations = ({ recommendations }) => {
  const navigate = useNavigate();

  return (
    <div id="recommendations" className="recommendations-container">
      <h2>Dựa trên câu trả lời của bạn, chúng tôi gợi ý một vài dịch vụ phù hợp nhất.</h2>
      <div className="recommendations-grid">
        {recommendations.length > 0 ? (
          recommendations.map((service) => (
            <div key={service.id} className="recommendation-item" onClick={() => navigate(`/services`)}>
              <img src={service.image} alt={service.name} className="recommendation-image" />
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
