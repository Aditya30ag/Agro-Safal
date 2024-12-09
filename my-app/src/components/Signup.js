import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const WelcomeCarousel = () => {
  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20">
        <div className="grid grid-cols-4 h-screen">
          <div className="col-span-4 relative">
            <div className="absolute inset-0">
              <div 
                className="bg-cover bg-top h-full w-full transition-all duration-1000"
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
export default function Signup(props) {
  const [credentials, setcredential] = useState({
    name: "",
    name1: "",
    email: "",
    number: "",
    aadharnumber: "",
    cropsname: "",
    state: "",
    farmSize: "",
    password: "",
  });
  const [content, setcontent] = useState("");
  const navigate = useNavigate();

  const handleonClick = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        name1: credentials.name1,
        email: credentials.email,
        number: credentials.number,
        aadharnumber: credentials.aadharnumber,
        cropsname: credentials.cropsname,
        state: credentials.state,
        farmSize: credentials.farmSize,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success === true) {
      localStorage.setItem("token", json.token);
      navigate("/home");
      props.showalert();
    } else {
      props.showalert();
      setcontent("User with this Email already exists");
    }
  };

  const onchange = (e) => {
    setcredential({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Carousel Section */}
      <div className="hidden lg:block lg:w-2/3">
        <WelcomeCarousel />
      </div>
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
          
          <img 
            src="/logo.jpg" 
            alt="Farmer Support Logo" 
            className="h-20 w-20 mx-auto rounded-full mb-4 object-cover border-4 border-green-600"
          />
          <h2 className="text-3xl font-bold text-green-800">Farmer Registration</h2>
        </div>
        
        <form onSubmit={handleonClick}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-green-700 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onchange}
                required
              />
            </div>
            <div>
              <label htmlFor="name1" className="block text-green-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                id="name1"
                name="name1"
                value={credentials.name1}
                onChange={onchange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-green-700 mb-2">Email Address</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onchange}
              required
            />
            {content && <p className="text-red-500 mt-2">{content}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="number" className="block text-green-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                id="number"
                name="number"
                value={credentials.number}
                onChange={onchange}
                required
              />
            </div>
            <div>
              <label htmlFor="aadharnumber" className="block text-green-700 mb-2">Pan Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                id="aadharnumber"
                name="aadharnumber"
                value={credentials.aadharnumber}
                onChange={onchange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="state" className="block text-green-700 mb-2">State</label>
              <select
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                id="state"
                name="state"
                value={credentials.state}
                onChange={onchange}
                required
              >
                <option value="">Select State</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Punjab">Punjab</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
              </select>
            </div>
            <div>
              <label htmlFor="farmSize" className="block text-green-700 mb-2">Farm Size (Acres)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                id="farmSize"
                name="farmSize"
                value={credentials.farmSize}
                onChange={onchange}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="cropsname" className="block text-green-700 mb-2">Crops You Grow</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="cropsname"
              name="cropsname"
              value={credentials.cropsname}
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-green-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              id="password"
              name="password"
              value={credentials.password}
              onChange={onchange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-300"
          >
            Register as a Farmer
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-green-600 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}