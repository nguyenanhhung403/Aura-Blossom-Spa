import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Background from "../../components/images/LoginImage/LoginBackground.jpg";
import spaImage2 from "../../components/images/logoSpa.png";
import { registerUser } from "../service/authApi.js";
import { UserContext } from "../context/UserContext.jsx";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(""); // state cho tên đăng nhập
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Thêm state cho số điện thoại
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Lấy email từ localStorage khi component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("registrationEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      // Xóa email khỏi localStorage sau khi đã sử dụng
      localStorage.removeItem("registrationEmail");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    console.log(
      "Tên:", name,
      "Tên đăng nhập:", username,
      "Email:", email,
      "Số điện thoại:", phone,
      "Mật khẩu:", password,
      "Xác nhận:", confirmPassword
    );

    setLoading(true);
    try {
      const registerObj = {
        fullName: name,
        email,
        phone,
        password,
        username,
        confirmPassword,
      };

      const registerResult = await registerUser(registerObj);
      const hasEmail = registerResult?.result?.email;

      if (!registerResult || !hasEmail) {
        throw new Error("Đăng ký thất bại");
      }

      alert("Đăng ký thành công. Vui lòng đăng nhập để tiếp tục");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.message || "Có lỗi xảy ra khi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Overlay đen mờ */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative z-10"
      >
        <motion.div whileHover={{ scale: 1.05 }} className="flex justify-center mb-8">
          <img src={spaImage2} alt="Logo Spa" className="w-28 h-28 drop-shadow-lg" />
        </motion.div>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Đăng ký</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          {/* Trường Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại của bạn"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          {/* Trường Tên đăng nhập */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tên đăng nhập</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập của bạn"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Đăng ký
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
              Đăng nhập
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">
            ← Trở về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
