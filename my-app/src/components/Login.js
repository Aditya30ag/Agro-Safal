import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  
  UserIcon, 
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

// Carousel Component
const WelcomeCarousel = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20">
        <div className="grid grid-cols-4 h-screen">
          <div className="col-span-4 relative">
            <div className="absolute inset-0">
              <div 
                className="bg-cover bg-center h-full w-full transition-all duration-1000"
                style={{ 
                  backgroundImage: 'url("/anuty.jpg")',
                  backgroundPosition: 'center',
                  opacity: 0.8
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className="relative z-30 flex items-center justify-center h-full">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  Empowering Farmers Through Technology
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                  Connecting farmers with innovative solutions, advanced analytics, and personalized support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Component
export default function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const url = "http://localhost:5000/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success === true) {
        localStorage.setItem("token", json.token);
        props.showalert && props.showalert("Login Successful", "success");
        navigate("/home");
      } else {
        setError(json.message || "Invalid credentials. Please try again.");
        props.showalert && props.showalert("Login Failed", "danger");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
      props.showalert && props.showalert("Login Error", "danger");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) {
      setError("");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Carousel Section */}
      <div className="hidden lg:block lg:w-2/3">
        <WelcomeCarousel />
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img 
              src="/logo.jpg" 
              alt="Farmer Support Logo" 
              className="h-20 w-20 mx-auto rounded-full mb-4 object-cover border-4 border-green-600"
            />
            <h2 className="text-3xl font-bold text-green-800">Farmer Support Portal</h2>
            <p className="text-gray-600 mt-2">Login to access your agricultural insights</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
               
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>


            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                <ExclamationCircleIcon className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <UserIcon className="h-5 w-5" />
              <span>Login to Your Account</span>
            </button>

            {/* Signup Link */}
            <div className="text-center">
              <Link 
                to="/signup" 
                onClick={props.handleonClick2}
                className="text-green-600 hover:text-green-800 transition-colors"
              >
                Don't have an account? Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}