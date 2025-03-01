import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import spaImage from "../images/LoginImage/AnhTemplate.jpg";
import { motion } from "framer-motion";
import spaImage2 from "../images/logoSpa.png";
import { loginUser } from "../service/authApi.js";
import { ACCESS_TOKEN } from "../service/api.js";

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

    <div className="flex min-h-screen h-screen">
      <motion.div
        className="hidden md:flex md:w-1/2 relative h-screen"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={spaImage} alt="Spa" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <img
            src={spaImage2}
            style={{ width: "33.33%", height: "auto" }}
            alt="Logo"
          />
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
          <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>

          <form onSubmit={handleSubmit}>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Tên đăng nhập
              </label>
              <input disabled={loading}
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Mật khẩu
              </label>
              <input disabled={loading}
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
              className="flex items-center justify-between mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center">
                <input disabled={loading} type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe" className="text-gray-700">
                  Lưu mật khẩu
                </label>
              </div>
              <Link
                to="/forgot"
                className="text-blue-500 hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </motion.div>

            <motion.button disabled={loading}
              type="submit"
              className="w-full bg-[#446E6A] text-white py-2 rounded hover:bg-[#375955] transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </motion.button>
          </form>

          <motion.button disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white text-black py-2 rounded border border-gray-300 hover:bg-gray-100 transition mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20190923152039%21Google_%22G%22_logo.svg"
              alt="Google Logo"
              className="w-5 h-5 mr-2"
            />
            Đăng nhập với Google
          </motion.button>

          <motion.p
            className="mt-4 text-center text-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-[#446E6A] hover:underline">
              Đăng ký
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

export default Login;
