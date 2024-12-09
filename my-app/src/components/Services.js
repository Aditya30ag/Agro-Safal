import React from 'react';
import { 
  Leaf, 
  Shield, 
  TrendingUp, 
  Microscope, 
  FileText, 
  CloudCog 
} from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white shadow-md rounded-lg p-6 border-l-4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2" 
       style={{ borderLeftColor: color }}>
    <div className="flex items-center mb-4">
      <Icon className="w-10 h-10 mr-4" style={{ color: color }} />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Services() {
  const services = [
    {
      icon: Microscope,
      title: "Real-time Crop Disease Detection",
      description: "Advanced AI technology to quickly identify and diagnose crop diseases, helping farmers take immediate action.",
      color: "#2C7A51"
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Data-driven insights to forecast crop health, weather impacts, and potential agricultural challenges.",
      color: "#1E40AF"
    },
    {
      icon: CloudCog,
      title: "Farmer Advisory Platform",
      description: "Personalized recommendations tailored to local conditions, crop types, and individual farm characteristics.",
      color: "#D97706"
    },
    {
      icon: Leaf,
      title: "Nutrient Deficiency Detection",
      description: "Precision analysis of soil and plant health to optimize fertilization and crop nutrition strategies.",
      color: "#16A34A"
    },
    {
      icon: FileText,
      title: "Automated Reports",
      description: "Comprehensive, easy-to-understand reports providing actionable insights for farmers and policymakers.",
      color: "#7C3AED"
    },
    {
      icon: Shield,
      title: "Data Privacy & Security",
      description: "Robust protection of farmer information and agricultural data with state-of-the-art security measures.",
      color: "#DC2626"
    }
  ];

  return (
    <div className="mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Agricultural Innovation Services
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bridging technology and agriculture to empower farmers and support sustainable farming
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            color={service.color}
          />
        ))}
      </div>
      <div className="text-center mt-12">
        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
          Connect with Agricultural Experts
        </button>
      </div>
    </div>
  );
}