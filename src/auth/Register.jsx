import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if input is valid
      if (!username || !email || !password) {
        toast.error('All fields are required.', { position: 'top-right', autoClose: 3000 });
        return;
      }

      const response = await axios.post('http://localhost:3000/auth/register', { username, email, password });

      if (response.status === 201) {
        toast.success('Registration successful! Please log in.', { position: 'top-right', autoClose: 3000 });
        setTimeout(() => {
          navigate('/');  // Redirect to login page after successful registration
        }, 1500);
      }
    } catch (err) {
      setError('Error registering user');
      toast.error('Error registering user. Please try again!', { position: 'top-right', autoClose: 3000 });
    }
  };



  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <img src={Logo} alt="FlameSense Logo" className="w-32 h-32 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Flame Sense | Register</h2>
          
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full p-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Register
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-orange-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>

    </>
  );
};

export default Register;
