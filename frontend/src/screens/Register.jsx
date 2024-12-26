import React, {useState, useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../config/axios.js';
import { UserContext } from '../context/user.context.jsx';

const Register = () => {

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    axios.post('/users/register', { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full p-2.5 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center">
          Already have an acocunt? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
