import React from "react";


// Carousel Component
const WelcomeCarousel = () => {
  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden mt-2">
  <div className="absolute inset-0 opacity-50 z-10 rounded-3xl "></div>
  <div className="relative z-20">
    <div className="grid grid-cols-4 h-screen rounded-3xl">
      <div className="col-span-4 relative rounded-3xl">
        <div className="absolute inset-0 rounded-3xl">
          <div
            className="bg-cover bg-center h-full w-full transition-all duration-1000 rounded-3xl "
            style={{
              backgroundImage: 'url("/anuty.jpg")',
              backgroundPosition: 'center',
              opacity: 0.8
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 rounded-3xl"></div>
        <div className="relative z-30 flex items-center justify-center h-full rounded-3xl">
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
export default WelcomeCarousel;