import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../../components/images/LoginImage/LoginBackground.jpg";
import spaImage2 from "../../components/images/logoSpa.png";

const ResetPassword = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay mờ nền */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <motion.div
        className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Spa */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center mb-8">
          <img src={spaImage2} alt="Logo Spa" className="w-28 h-28 drop-shadow-lg" />
        </motion.div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Tạo mật khẩu mới
        </h2>

        <form>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu mới"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </motion.div>
          
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-gray-700 mb-2" htmlFor="confirm-password">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Nhập lại mật khẩu"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 
                       rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Đặt lại mật khẩu
          </motion.button>
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

export default ResetPassword;
