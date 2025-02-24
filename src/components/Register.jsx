import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import spaImage from "../images/LoginImage/AnhTemplate.jpg";
import spaImage2 from "../images/logoSpa.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây (gọi API, kiểm tra, v.v.)
  };

  return (
    <div className="flex min-h-screen h-screen">
      <motion.div
        className="hidden md:flex md:w-1/2 relative h-screen"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={spaImage} alt="Spa" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white flex items-center justify-center">
            <img
              src={spaImage2}
              style={{ width: "33.33%", height: "auto" }}
              alt="Logo"
            />
          </h1>
        </div>
      </motion.div>

      <motion.div
        className="w-full md:w-1/2 bg-[#1B4033] flex items-center justify-center p-6 h-screen"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Tên
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập tên của bạn"
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập email của bạn"
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập mật khẩu"
                required
              />
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label
                className="block text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Xác nhận mật khẩu"
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-[#446E6A] text-white py-2 rounded hover:bg-[#375955] transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Đăng ký
            </motion.button>
          </form>

          <motion.p
            className="mt-4 text-center text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-[#446E6A] hover:underline">
              Đăng nhập
            </Link>
          </motion.p>
          <motion.p
                      className="mt-4 text-center text-gray-700"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      Trở về trang chủ{" "}
                      <Link to="/" className="text-[#446E6A] hover:underline">
                        Home
                      </Link>
                    </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
