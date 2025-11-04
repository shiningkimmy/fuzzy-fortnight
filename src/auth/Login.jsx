import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FaUser } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // If token exists, redirect to dashboard
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, password });

      const { token, username } = response.data;
      localStorage.setItem('token', token);  // Save JWT token to localStorage
      localStorage.setItem('username', username);  // Save username to localStorage

      toast.success('Login successful!', { position: 'top-right', autoClose: 3000 });
      setTimeout(() => {
        window.location.href = '/';  // Redirect to dashboard
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError('Invalid credentials');
    toast.error('Invalid credentials. Please try again!', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <img src={Logo} alt="Flame Sense Logo" className="w-32 h-32 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Flames Sense | Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className='relative'>
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="relative">
              <TbPassword className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-orange-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
