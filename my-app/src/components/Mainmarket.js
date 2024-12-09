import React from "react";
import { 
  ShoppingCartIcon, 
  XMarkIcon, 
} from "@heroicons/react/24/outline";


const Mainmarket = ({ 
  isOpen, 
  onClose, 
  product, 
  onBuy, 
  onChangeHandler ,
  Viewcart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
            <h3 className="text-2xl font-semibold text-green-800">
              Product Details
            </h3>
            <button
              className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
              onClick={onClose}
            >
              <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
            </button>
          </div>

          {/* Body */}
          <div className="relative flex-auto p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Product Image */}
              <div>
              <img 
                  src={product.img || './img1.jpg'} 
                  alt={product.name} 
                  className="object-cover w-full h-64 rounded-lg"
                />
              </div>

              {/* Product Details Form */}
              <form className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={product.name}
                    onChange={onChangeHandler}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    readOnly
                  />
                </div>
                <div>
                  <label 
                    htmlFor="title" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={onChangeHandler}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    readOnly
                  />
                </div>
                <div>
                  <label 
                    htmlFor="seller" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Seller
                  </label>
                  <input
                    type="text"
                    id="seller"
                    name="seller"
                    value={product.seller}
                    onChange={onChangeHandler}
                    className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    readOnly
                  />
                </div>
                <div>
                  <label 
                    htmlFor="price" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="flex items-center">
                    <span className="mr-2 text-green-600">₹</span>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={product.price}
                      onChange={onChangeHandler}
                      className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
            <button
              className="px-6 py-2 mb-1 mr-4 text-sm font-bold text-gray-600 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="flex items-center px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-600 rounded shadow outline-none active:bg-green-700 hover:shadow-lg focus:outline-none"
              type="button"
              onClick={Viewcart}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              ViewCart
            </button>
            <button
              className="flex items-center px-6 py-2 mb-1 mr-1 text-sm font-bold text-white uppercase bg-green-600 rounded shadow outline-none active:bg-green-700 hover:shadow-lg focus:outline-none"
              type="button"
              onClick={onBuy}
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Add to the cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainmarket;