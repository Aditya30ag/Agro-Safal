import React, { useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  ShoppingCartIcon, 
  TrashIcon, 
  CreditCardIcon, 
  BanknotesIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

import Cartcontext from "../context/notes/CartContext";

const CartPage = () => {
  const navigate=useNavigate();
  const a = useContext(Cartcontext);  
  // Sample cart items state
  const [cartItems, setCartItems] = useState([
   
  ]);
  const getCart = async () => {
    //Add api
    const response = await fetch(
      "http://localhost:5000/api/cart/fetchallcart",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token:
            localStorage.getItem('token'),
        },
      }
    );
    const json = await response.json();
    setCartItems(json);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCart();
    } else {
      navigate("/");
    }
  }, [a, navigate]);
 
  // Payment modes state
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);

  // Payment modes
  const paymentModes = [
    { 
      _id: 'credit', 
      name: 'Credit Card', 
      icon: <CreditCardIcon className="w-6 h-6" /> 
    },
    { 
      _id: 'debit', 
      name: 'Debit Card', 
      icon: <BanknotesIcon className="w-6 h-6" /> 
    },
    { 
      _id: 'upi', 
      name: 'UPI', 
      icon: <CheckCircleIcon className="w-6 h-6" /> 
    }
  ];

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.prices * item.quantity), 0).toFixed(2);
  };

  // Remove item from cart
  const removeItem = (_id) => {
    setCartItems(cartItems.filter(item => item._id !== _id));
  };

  // Update quantity
  const updateQuantity = (_id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item._id === _id 
        ? { ...item, quantity: Math.max(1, newQuantity) } 
        : item
    ));
  };

  // Handle payment mode selection
  const handlePaymentModeSelect = (mode) => {
    setSelectedPaymentMode(mode);
  };

  // Proceed to payment
  const proceedToPayment = () => {
    if (selectedPaymentMode && cartItems.length > 0) {
      alert(`Proceeding with payment via ${selectedPaymentMode.name}`);
      // Here you would typically integrate with a payment gateway
    } else {
      alert('Please select items and a payment mode');
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <ShoppingCartIcon className="w-10 h-10 text-green-600 mr-4" />
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-600">Your cart is empty</p>
        </div>
      ) : (
        <div className="gr_id md:gr_id-cols-3 gap-6">
          {/* Cart Items Column */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={item._id} 
                className="flex items-center bg-white shadow-md rounded-lg p-4"
              >
                <img 
                  src={item.img}
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-md mr-4" 
                />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.prices.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="bg-gray-200 px-2 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => removeItem(item._id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary and Payment Column */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-2">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>₹{(calculateTotal() * 0.1).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-xl mb-6">
              <span>Total</span>
              <span>₹{(parseFloat(calculateTotal()) * 1.1).toFixed(2)}</span>
            </div>

            <h3 className="text-xl font-semibold mb-4">Select Payment Mode</h3>
            <div className="space-y-3">
              {paymentModes.map((mode) => (
                <button
                  key={mode._id}
                  onClick={() => handlePaymentModeSelect(mode)}
                  className={`w-full flex items-center justify-center p-3 border rounded-lg ${
                    selectedPaymentMode?._id === mode._id 
                      ? 'bg-green-100 border-green-500' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {mode.icon}
                  <span className="ml-2">{mode.name}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={proceedToPayment}
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;