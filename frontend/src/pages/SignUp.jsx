import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });


  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (signup.password != signup.cpassword) {
      document.getElementById('error-msg').innerText = "Passwords are not matched!!";
      setSignup(prev => ({
        ...prev,
        cpassword: '',
      }))

      return;
    }
    else {
      document.getElementById('error-msg').innerText = "";
      Authenticate();
    }
  }

  const Authenticate = async () => {
    const url = "http://localhost:3001/user/signup";
    const result = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signup)
    });

    const res = await result.json();

    if (!res.error) {
      navigate('/login');
      toast.success('You Account Created Successfully!!');
      return;
    }
    else {
      toast.error('Something went wrong!! Please Try Again!');
      setSignup(prev => ({
        ...prev,
        cpassword: '',
        password: ''
      }))
      document.getElementById('error-msg').innerText = res.message;
      return;
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded shadow-md">
        <header className="text-3xl font-bold text-center mb-8">CODEHELP</header>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="text"
              placeholder="Enter your name"
              name="name" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email ID</label>
            <input onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="email"
              placeholder="Enter your email"
              name="email" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="password"
              placeholder="Enter your password"
              name="password" required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              type="password"
              placeholder="Enter your Confirm password"
              name="cpassword" required
            />
          </div>
          <p id='error-msg' className='text-red-500 text-sm font-semibold text-center'></p>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Create Account
          </button>

          <Link to='/login'>
            <button
              className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Back to Login
            </button></Link>

        </form>
      </div>
    </div>
  )
}

export default SignUp
