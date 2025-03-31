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
  
  // Thêm log để kiểm tra dữ liệu
  console.log("Full recommendations data:", recommendations);
  console.log("First service:", recommendations[0]);

  const handleServiceClick = (serviceId) => {
    console.log("Navigating to service:", serviceId);
    navigate(`/services/${serviceId}`);
  };

  return (
    <div id="recommendations" className="recommendations-container my-12 px-4 py-8 bg-[#FAF6F3]">
      <h2 className="text-4xl font-bold text-center mb-6 text-[#2D4B49]">
        Dịch vụ phù hợp với bạn
      </h2>
      
      <div className="text-center mb-12">
        <p className="text-xl text-[#2D4B49] font-medium max-w-3xl mx-auto px-4 py-3 bg-[#E9DFD4] rounded-lg shadow-sm">
          Dựa trên câu trả lời của bạn, chúng tôi đề xuất những dịch vụ sau đây 
          <span className="font-bold text-[#C8A27C]"> sẽ phù hợp nhất </span>
          với nhu cầu của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {recommendations.length > 0 ? (
          recommendations.map((service) => (
            <div
              key={service.service_id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="cursor-pointer h-full flex flex-col">
                <div className="relative h-48">
                  <img
                    src={service.thumbnail_url || '/default-service-image.jpg'}
                    alt={service.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/default-service-image.jpg';
                    }}
                  />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-[#2D4B49] mb-3">
                    {service.service_name}
                  </h3>
                  
                  <p className="text-gray-600 text-base mb-6 line-clamp-2 flex-grow">
                    {service.service_name}
                  </p>

                  <button 
                    onClick={() => handleServiceClick(service.service_id)}
                    className="w-full bg-[#C8A27C] text-white text-lg font-semibold px-6 py-3 rounded-lg
                             hover:bg-[#AA8864] transform transition-all duration-300 
                             hover:shadow-lg hover:-translate-y-1
                             flex items-center justify-center gap-2"
                  >
                    <span>Xem chi tiết</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-xl text-gray-600 mb-6">
              Không tìm thấy dịch vụ phù hợp với bạn.
            </div>
            <button
              onClick={() => navigate('/services')}
              className="bg-[#C8A27C] text-white text-lg font-semibold px-8 py-3 rounded-lg
                       hover:bg-[#AA8864] transform transition-all duration-300
                       hover:shadow-lg hover:-translate-y-1"
            >
              Xem tất cả dịch vụ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
