import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8081/Login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          const role = res.data.role;
          if (role === 'Admin') {
            navigate('/Doctor');
          } else if (role === 'User') {
            navigate('/Patient');
          } else {
            navigate('/');
          }
        } else {
          alert(res.data.Error);
        }
      })
      .catch(err => {
        console.error('Error:', err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="bg-white text-gray-900 p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Login</h2>
        <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-bold">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button type="submit" className="w-full bg-gray-200 text-gray-900 p-3 rounded hover:bg-gray-500 focus:outline-none">Login</button>
          <p className="mt-2 text-sm text-gray-900 text-center">You agree to our terms and policies.</p>
          <Link to="/Signup" className="block w-full bg-gray-200 text-gray-900 p-3 rounded mt-2 hover:bg-gray-500 focus:outline-none text-center">Signup</Link>

        </form>
      </div>
    </div>
  );
}

export default Login;
