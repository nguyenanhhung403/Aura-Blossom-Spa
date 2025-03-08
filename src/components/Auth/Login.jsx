import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../components/config/firebase";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../../components/context/UserContext";
import Background from "../../components/images/LoginImage/LoginBackground.jpg";
import spaImage2 from "../../components/images/logoSpa.png";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const loginObj = {
        username,
        password,
      }

      const loginResult = await loginUser(loginObj);
      const isAuthenticated = loginResult?.result?.authenticated;
      if (!loginResult || !isAuthenticated) {
        throw new Error("Đăng nhập thất bại");
      }

      const accessToken = loginResult.result.token;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      navigate("/");
    }catch (error) {
      console.error(error);
      const message = error.message ? 'Mật khẩu hoặc tên đăng nhập không đúng' : 'Có lỗi xảy ra khi đăng nhập';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-90 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex justify-center mb-8"
        >
          <img
            src={spaImage2}
            alt="Spa Logo"
            className="w-28 h-28 drop-shadow-lg"
          />
        </motion.div>

        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="Nhập tên đăng nhập"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
          >
            Đăng nhập
          </motion.button>
        </form>

        <div className="my-6 flex items-center justify-between text-sm">
          <Link
            to="/email-check"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Quên mật khẩu?
          </Link>
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Tạo tài khoản mới
          </Link>
        </div>

        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">hoặc</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          className="w-full bg-white border border-gray-300 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="w-5 h-5 mr-3"
          />
          Đăng nhập với Google
        </motion.button>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
          >
            ← Trở về trang chủ
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;