import React from 'react';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-16">
        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <div className="md:order-first order-last">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                Innovative Agricultural Solutions
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                Our team of passionate agricultural scientists, AI engineers, and data analysts is dedicated to revolutionizing agriculture. We develop cutting-edge technological tools designed to empower farmers, improve crop health, maximize yields, and promote sustainable farming practices.
              </p>
            </div>
          </div>
          <div className="h-96 md:h-auto">
            <img 
              src="/aboutimg1.png" 
              alt="Agricultural Innovation" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <div className="h-96 md:h-auto">
            <img 
              src="/aboutimg2.jpg" 
              alt="AI Crop Disease Detection" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                AI-Powered Crop Disease Management
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                Our advanced AI-based Crop Disease Detection System leverages machine learning and computer vision to identify crop diseases with unprecedented accuracy. We provide farmers with early warnings and actionable insights, enabling proactive crop management and risk mitigation.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="grid md:grid-cols-2 gap-8 items-center bg-gray-100 rounded-xl overflow-hidden shadow-lg">
          <div className="md:order-first order-last">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
                Accessible Technology for All
              </h2>
              <p className="text-gray-700 leading-relaxed text-center">
                Our platform is meticulously designed to be user-friendly, scalable, and accessible to farmers of all scales—from small family farms to large agricultural enterprises. We're committed to democratizing agricultural technology and helping farmers thrive in a changing world.
              </p>
            </div>
          </div>
          <div className="h-96 md:h-auto">
            <img 
              src="/aboutimg3.jpg" 
              alt="Farming Technology" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}