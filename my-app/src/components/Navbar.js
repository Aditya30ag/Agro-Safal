import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  InformationCircleIcon, 
  DocumentTextIcon, 
  CloudIcon, 
  UserCircleIcon,
  ArrowRightOnRectangleIcon,  // Corrected logout icon
  ArrowLeftOnRectangleIcon,    // Alternative logout icon
  CogIcon
} from '@heroicons/react/24/outline';

export default function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [weatherData, setWeatherData] = useState({
    condition: '',
    temperature: ''
  });

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=New%20Delhi&appid=190dfc4fed3386777429b9d4bc2ed376&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      
      setWeatherData({
        condition: data.weather[0].main,
        temperature: data.main.temp.toFixed(1)
      });
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  // Authentication and weather effects
  useEffect(() => {
    fetchWeatherData();
    const token = localStorage.getItem('token');
    if (token){
      setIsAuthenticated(true);
    }
    
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
    props.showalert && props.showalert();
  };

  // Navigation click handler
  const handleNavigation = () => {
    props.handleonClick2 && props.handleonClick2();
  };

  return (
    <nav className="bg-gradient-to-b from-green-50 to-transparent shadow-sm">
      <div className=" mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" style={{textDecoration:"none"}}>
          <div className="flex items-center space-x-3">
            <img 
              src="/Screenshot 2024-10-20 141808.png" 
              alt="Government Agriculture Logo" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-green-800">Farmer Support Portal</span>
          </div>
        </Link>

        {/* Main Navigation */}
        <div className="flex items-center space-x-6">
          <Link 
            to="/home" 
            onClick={handleNavigation}
            className={`flex items-center space-x-1 ${
              location.pathname === '/home' 
                ? 'text-green-700 font-semibold' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            <HomeIcon className="h-5 w-5" />
            <span>Home</span>
          </Link>

          <Link 
            to="/about" 
            onClick={handleNavigation}
            className={`flex items-center space-x-1 ${
              location.pathname === '/about' 
                ? 'text-green-700 font-semibold' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            <InformationCircleIcon className="h-5 w-5" />
            <span>About</span>
          </Link>

          <Link 
            to="/services" 
            onClick={handleNavigation}
            className={`flex items-center space-x-1 ${
              location.pathname === '/services' 
                ? 'text-green-700 font-semibold' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            <DocumentTextIcon className="h-5 w-5" />
            <span>Services</span>
          </Link>
          <Link 
            to="/market" 
            onClick={handleNavigation}
            className={`flex items-center space-x-1 ${
              location.pathname === '/market' 
                ? 'text-green-700 font-semibold' 
                : 'text-gray-600 hover:text-green-700'
            }`}
          >
            <CogIcon className="h-5 w-5" />
            <span>Livemarket</span>
          </Link>
        </div>

        {/* Weather and Authentication */}
        <div className="flex items-center space-x-4 ml-12">
          {/* Weather Display */}
          <div className="flex items-center space-x-2 text-gray-700">
            <CloudIcon className="h-6 w-6 text-blue-500" />
            <span>{weatherData.condition} {weatherData.temperature}°C</span>
          </div>

          {/* Authentication Buttons */}
          {!isAuthenticated ? (
            <div className="flex space-x-3">
              <Link 
                to="/login" 
                onClick={handleNavigation}
                className="btn btn-outline-green flex items-center space-x-1"
              >
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link 
                to="/signup" 
                onClick={handleNavigation}
                className="btn btn-green flex items-center space-x-1"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Sign Up</span>
              </Link>
            </div>
          ) : (
            <button 
              onClick={handleLogout}
              className="btn btn-red flex items-center space-x-1"
            >
              
              <span><ArrowRightOnRectangleIcon className="h-5 w-5" />Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}