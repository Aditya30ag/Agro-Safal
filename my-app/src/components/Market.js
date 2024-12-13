import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Mainmarket from "./Mainmarket";

export default function Market(props) {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const addCart = async (name, img, prices) => {
    try {
        // Check for token
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }

        let url = `http://localhost:5000/api/cart/createcart`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify({ 
                name, 
                img, 
                prices 
            }),
        });

        // Check if response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add item to cart');
        }

        const json = await response.json();

        return json;
    } catch (error) {
        console.error('Error adding to cart:', error);
        
        throw error;
    }
};
  const handleBuyNow = async (e) => {
    try {
        // Show added to cart alert
        setIsAddedToCart(true);

        // Automatically hide the alert after 3 seconds
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 3000);
        const prices = parseInt(selectedProduct.price, 10); // The 10 specifies base 10
        await addCart(selectedProduct.name, selectedProduct.img, prices);

    } catch (error) {
       
        setIsAddedToCart(false);
        alert(error);
    }
};

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const Viewcart=()=>{
    // Navigate to buy now page
    navigate("/market/buynow");
  }
  // Placeholder for product change handler
  const handleProductChange = (e) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [e.target.name]: e.target.value
      });
    }
  };

  return (
    <div className="mx-auto px-4 relative bg-[#F5F5F0]">
      {/* Added to Cart Alert */}
      {isAddedToCart && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-[#2C5E1A] text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
            <svg 
              className="w-6 h-6 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Added to Cart
          </div>
        </div>
      )}

      {props.notes.length === 0 ? (
        <div className="flex items-center justify-center p-8 bg-[#E6EFE0] rounded-lg">
          <InformationCircleIcon className="w-10 h-10 mr-4 text-[#1A5F7A]" />
          <p className="text-xl text-[#2C5E1A]">No products available. Add a product.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {props.notes.map((note) => (
            <div
              key={note.name}
              className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-xl border border-[#2C5E1A]/10"
            >
              <img
                src={note.img || '/placeholder-product.png'}
                alt={note.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-[#F9FBF6]">
                <h3 className="text-xl font-semibold text-[#2C5E1A]">{note.name}</h3>
                <p className="text-[#4A6741]">{note.title}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-[#1A5F7A]">₹{note.price}</span>
                  <button
                    onClick={() => handleProductDetails(note)}
                    className="px-4 py-2 text-sm text-white bg-[#2C5E1A] rounded hover:bg-[#1A5F7A] transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      <Mainmarket
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        product={selectedProduct || {}}
        onBuy={handleBuyNow}
        onChangeHandler={handleProductChange}
        Viewcart={Viewcart}
      />
    </div>
  );
}