// src/Login.jsx hoặc src/components/Login.jsx

import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Giả lập login thành công
      console.log('Login successful:', formData);
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      Username :<input type="text" name="Username" placeholder="Username" onChange={handleChange} />
      Password: <input type="password" name="Password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
    
  );
};

export default Login;  // ⚡ Đảm bảo có dòng này
