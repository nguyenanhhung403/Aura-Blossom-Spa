import { useState } from "react";
import Navbar from "./Navbar";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const BeautyTips = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);
  const totalPages = 55; // tự chọn số trang tối đa
  const beautyTips = [
    {
      image: "/beauty-image.jpg",
      title: "Select du lieu api 1",
      description: "Bla bla 1",
      steps: ["Step 1", "Step 2", "Step 3"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Select du lieu api 2",
      description: "Bla bla 2",
      steps: ["Step 1", "Step 2", "Step 3"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Select du lieu api 3",
      description: "Bla bla 3",
      steps: ["Step 1", "Step 2", "Step 3"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Select du lieu api 4",
      description: "Bla bla 4",
      steps: ["Step 1", "Step 2", "Step 3"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Select du lieu api 5",
      description: "Bla bla 5",
      steps: ["Step 1", "Step 2", "Step 3"]
    },
    {
      image: "/beauty-image.jpg",
      title: "Select du lieu api 6",
      description: "Bla bla 6",
      steps: ["Step 1", "Step 2", "Step 3"]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <Navbar />
      <div className="pt-24">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 font-serif">BÍ QUYẾT LÀM ĐẸP</h1>
          <div className="flex justify-center mt-4">
            <input
              type="text"
              className="w-64 p-2 border border-gray-300 rounded"
              placeholder="Tìm kiếm..."
            />
          </div>
        </div>

        {/* Beauty Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
          {beautyTips.map((tip, index) => (
            <div
              key={index}
              className="bg-teal-100 rounded-lg p-4 cursor-pointer"
              onClick={() => setSelectedTip(tip)}
            >
              <img src={tip.image} alt="Beauty" className="rounded-lg w-full h-40 object-cover" />
              <div className="mt-4">
                <h2 className="font-bold text-gray-700">{tip.title}</h2>
                <p className="text-gray-600 mt-2">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed View */}
        {selectedTip && (
          <div className="bg-white rounded-lg p-6 shadow-lg mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{selectedTip.title}</h2>
            <p className="text-gray-600 mt-4">{selectedTip.description}</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Các bước làm:</h3>
            <ul className="list-disc list-inside mt-2">
              {selectedTip.steps.map((step, index) => (
                <li key={index} className="text-gray-600">{step}</li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
              onClick={() => setSelectedTip(null)}
            >
              Quay lại
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center space-x-2 mt-6">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-full ${
                currentPage === i + 1 ? "bg-gray-700 text-white" : "bg-gray-300"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <span className="text-gray-600">...</span>
          <button
            className={`px-3 py-1 rounded-full ${
              currentPage === totalPages ? "bg-gray-700 text-white" : "bg-gray-300"
            }`}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        </div>
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
};

export default BeautyTips;