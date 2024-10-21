import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    role: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/Signup', values)
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/Login');
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="bg-white text-gray-900 p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Sign-Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={(e) =>
                setValues({ ...values, name: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block  font-bold">
              Role
            </label>
            <select
              name="role"
              onChange={(e) =>
                setValues({ ...values, role: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-600"
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block  font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-900 p-3 rounded hover:bg-gray-500 focus:outline-none"
          >
            Register
          </button>

          <p className="mt-4 text-sm text-gray-900">
            By signing up, you agree to our terms and policies.
          </p>

          <Link
            to="/Login"
            className="block w-full bg-gray-300 text-gray-900 p-3 rounded mt-4 hover:bg-gray-500 focus:outline-none text-center"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;