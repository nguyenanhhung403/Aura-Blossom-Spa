import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../../components/images/LoginImage/LoginBackground.jpg";

const EmailCheck = () => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = () => {
    // Giả lập gửi mã xác nhận
    setIsCodeSent(true);
  };

  const handleVerifyCode = () => {
    // Kiểm tra mã xác nhận, ở đây giả sử mã đúng là "123456"
    if (verificationCode === "123456") {
      navigate("/forgot");
    } else {
      alert("Mã xác nhận không đúng");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay mờ */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <motion.div
        className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Kiểm tra Email</h2>
        <form>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>

          {isCodeSent && (
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="verification-code">
                Mã xác nhận
              </label>
              <input
                type="text"
                id="verification-code"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                placeholder="Nhập mã xác nhận"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </motion.div>
          )}

          {!isCodeSent ? (
            <motion.button
              type="button"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 
                         rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={handleSendCode}
            >
              Gửi mã
            </motion.button>
          ) : (
            <motion.button
              type="button"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 
                         rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={handleVerifyCode}
            >
              Tiếp tục
            </motion.button>
          )}
        </form>

        <motion.p
          className="mt-4 text-center text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Đăng nhập
          </Link>
        </motion.p>
        <motion.p
          className="mt-4 text-center text-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Trở về trang chủ
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EmailCheck;
