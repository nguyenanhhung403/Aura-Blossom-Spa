import { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../../App.css";
import QuizBanner from "../images/QuizImage/QuizBanner.jpg";

// Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const services = [
  { name: "Detox Làm Da Sạch Sâu & Khỏe Đẹp", quizId: "quiz1" },
  { name: "Massage Thư Giãn", quizId: "quiz2" },
  { name: "Trị Liệu Da Công Nghệ Cao", quizId: "quiz3" },
  { name: "Chăm Sóc Da Mặt", quizId: "quiz4" },
];

const Quiz = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
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
            "Giúp chúng tôi hiểu rõ hơn về nhu cầu của bạn bằng cách trả lời
            những câu hỏi dưới đây nhé"
          </p>
          <div className="quiz-underline"></div>

          {/* Phần Slider */}
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
              {services.map((service, index) => (
                <SwiperSlide
                  key={index}
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="slide-item">{service.name}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Hiển thị bài quiz */}
        {selectedService && <QuizComponent service={selectedService} />}
      </div>
      <Footer />
    </>
  );
};

const QuizComponent = ({ service }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const sampleQuestions = {
      quiz1: [
        {
          id: 1,
          question: "Bạn có thường xuyên bị mụn không?",
          options: ["Có", "Không", "Thỉnh thoảng", "Hiếm khi"],
        },
        {
          id: 2,
          question: "Bạn muốn làm sạch da theo cách nào?",
          options: ["Thiên nhiên", "Công nghệ cao", "Không chắc", "Cả hai"],
        },
      ],
      quiz2: [
        {
          id: 1,
          question: "Bạn thích kiểu massage nào?",
          options: [
            "Massage đá nóng",
            "Massage Thái",
            "Massage thư giãn",
            "Massage dầu thơm",
          ],
        },
        {
          id: 2,
          question: "Bạn có thường xuyên căng thẳng không?",
          options: ["Có", "Không", "Thỉnh thoảng", "Rất hiếm"],
        },
      ],
    };

    setQuestions(sampleQuestions[service.quizId] || []);
  }, [service.quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = () => {
    console.log("Câu trả lời:", answers);
    alert("Bài quiz đã được gửi!");
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
                  <label
                    key={idx}
                    className={`quiz-option ${
                      answers[q.id] === option ? "selected" : ""
                    }`}
                    onClick={() => handleAnswerChange(q.id, option)}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleAnswerChange(q.id, option)}
                    />
                    <span className="option-label">
                      {String.fromCharCode(65 + idx)}.
                    </span>{" "}
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Đưa nút vào trong form, ngay sau câu hỏi */}
          <div className="quiz-submit-container">
            <button type="button" className="submit-btn" onClick={handleSubmit}>
              Nộp bài
            </button>
          </div>
        </form>
      ) : (
        <p>Đang tải câu hỏi...</p>
      )}
    </div>
  );
};

export default Quiz;
