
import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function Welcomepage() {
  return (
    <div className="min-h-full bg-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-full h-96 object-cover"
              src="/img4.jpg"
              alt="Modern Farming"
            />
            <Carousel.Caption className="bg-black bg-opacity-50 p-4 rounded">
              <h3 className="text-2xl font-bold text-white">Modern Agricultural Solutions</h3>
              <p className="text-green-200">Empowering farmers with cutting-edge technology and resources</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-full h-96 object-cover"
              src="/img2.jpg"
              alt="Crop Management"
            />
            <Carousel.Caption className="bg-black bg-opacity-50 p-4 rounded">
              <h3 className="text-2xl font-bold text-white">Smart Crop Management</h3>
              <p className="text-green-200">Track, analyze, and optimize your agricultural productivity</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-full h-96 object-cover"
              src="/img3.jpg"
              alt="Community Support"
            />
            <Carousel.Caption className="bg-black bg-opacity-50 p-4 rounded">
              <h3 className="text-2xl font-bold text-white">Farmer Community Network</h3>
              <p className="text-green-200">Connect, learn, and grow together with fellow farmers</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        
        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Welcome to Farmer's Companion</h2>
          <p className="text-gray-600 mb-6">
            Your one-stop platform for agricultural insights, support, and community.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/login" 
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300"
            >
              Login
            </a>
            <a 
              href="/signup" 
              className="bg-white text-green-600 px-6 py-3 rounded-md border border-green-600 hover:bg-green-50 transition duration-300"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}