import React, { useRef, useState, useEffect } from 'react';
import { Camera, Shield, MapPin, HelpCircle, FileText } from 'lucide-react';


const Camerageter = () => {
  const diseases = [
    { plant: "Apple", name: "Apple Scab", cure: "Apply fungicides like captan or myclobutanil." },
    { plant: "Apple", name: "Apple Black Rot", cure: "Prune infected areas and apply fungicides." },
    { plant: "Apple", name: "Cedar Apple Rust", cure: "Remove nearby juniper hosts and apply fungicides." },
    { plant: "Cherry", name: "Cherry Powdery Mildew", cure: "Use sulfur-based fungicides and ensure good air circulation." },
    { plant: "Corn", name: "Cercospora Leaf Spot (Gray Leaf Spot)", cure: "Rotate crops and apply resistant hybrids." },
    { plant: "Corn", name: "Common Rust", cure: "Use resistant varieties and apply fungicides if needed." },
    { plant: "Corn", name: "Northern Leaf Blight", cure: "Plant resistant hybrids and use fungicides." },
    { plant: "Grape", name: "Black Rot", cure: "Prune and remove infected parts, apply fungicides." },
    { plant: "Grape", name: "Black Measles", cure: "Implement good cultural practices and use fungicides." },
    { plant: "Grape", name: "Leaf Blight", cure: "Apply protective fungicides and practice proper vineyard hygiene." },
    { plant: "Orange", name: "Citrus Greening", cure: "Use disease-free trees and manage psyllid populations." },
    { plant: "Orange", name: "Orange with Citrus Greening", cure: "Use disease-free trees and manage psyllid populations." },
    { plant: "Peach", name: "Bacterial Spot", cure: "Apply copper-based bactericides and select resistant varieties." },
    { plant: "Pepper Bell", name: "Bacterial Spot", cure: "Use resistant varieties and copper-based bactericides." },
    { plant: "Potato", name: "Early Blight", cure: "Apply fungicides and practice crop rotation." },
    { plant: "Potato", name: "Late Blight", cure: "Use resistant varieties and fungicides." },
    { plant: "Squash", name: "Powdery Mildew", cure: "Apply sulfur-based fungicides and ensure proper spacing." },
    { plant: "Strawberry", name: "Leaf Scorch", cure: "Remove infected leaves and apply fungicides." },
    { plant: "Tomato", name: "Bell pepper with Bacterial Spot", cure: "Use copper-based bactericides and resistant varieties." },
    { plant: "Tomato", name: "Early Blight", cure: "Apply fungicides and use resistant varieties." },
    { plant: "Tomato", name: "Tomato with Late Blight", cure: "Use resistant varieties and fungicides." },
    { plant: "Tomato", name: "Leaf Mold", cure: "Improve ventilation and apply fungicides." },
    { plant: "Tomato", name: "Septoria Leaf Spot", cure: "Remove affected leaves and use fungicides." },
    { plant: "Tomato", name: "Spider Mites (Two-Spotted Spider Mite)", cure: "Use miticides or insecticidal soap." },
    { plant: "Tomato", name: "Target Spot", cure: "Apply fungicides and improve air circulation." },
    { plant: "Tomato", name: "Mosaic Virus", cure: "Remove infected plants and sanitize tools." },
    { plant: "Tomato", name: "Yellow Leaf Curl Virus", cure: "Use resistant varieties and control whiteflies." }
  ];

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [result, setResult] = useState('');
  const [result1, setResult1] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('disease-detection');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
        alert("Could not access the camera. Please allow camera permissions.");
      });
  }, []);

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 320, 240);
  };

  const uploadImage = () => {
    setLoading(true);
    canvasRef.current.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'plant_image.jpg');

      fetch('http://10.12.25.213:8000/predict/', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          if (data.prediction && data.prediction.length > 0) {
            const { label, score } = data.prediction[0];
            setResult(`Prediction: ${label} | Accuracy: ${score}`);
            const diseaseInfo = diseases.find(disease => disease.name === label);
            if (diseaseInfo) {
              setResult1(diseaseInfo.cure);
            } else {
              setResult1("");
            }
          } else {
            setResult("Prediction is not defined");
            setResult1("");
          }
        })
        .catch(error => {
          setLoading(false);
          console.error("Error uploading the image or in prediction: ", error);
          setResult("Please retake the picture");
          setResult1("");
        });
    }, 'image/jpeg');
  };

  const renderDiseaseDetectionSection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Plant Disease Detection</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <video ref={videoRef} width="320" height="240" autoPlay className="border-2 border-green-600 rounded-lg"></video>
        <canvas ref={canvasRef} width="320" height="240" className="border-2 border-green-600 rounded-lg"></canvas>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button 
          onClick={captureImage} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Capture Image
        </button>
        <button 
          onClick={uploadImage} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Detect Disease
        </button>
      </div>
      {loading && <div className="text-center text-green-700">Processing...</div>}
      {result && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <div className="font-bold text-green-800">{result}</div>
          {result1 && (
            <div className="mt-2 p-2 bg-white rounded-lg border border-green-200">
              <strong>Recommended Cure:</strong> {result1}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderAdvisorySection = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Agricultural Advisory</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Crop Management</h3>
          <p>Comprehensive guidance on crop selection, rotation, and best practices.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Weather Forecast</h3>
          <p>Detailed agricultural weather predictions to help plan farming activities.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Soil Health</h3>
          <p>Soil testing recommendations and fertility improvement strategies.</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Market Insights</h3>
          <p>Current crop prices, market trends, and selling recommendations.</p>
        </div>
      </div>
    </div>
  );

  const renderSideNavigation = () => (
    <div className="bg-green-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Farmer Support Services</h2>
      <nav>
        <button 
          onClick={() => setActiveSection('disease-detection')}
          className={`w-full text-left p-2 rounded mb-2 ${activeSection === 'disease-detection' ? 'bg-green-700' : 'hover:bg-green-800'}`}
        >
          <Camera className="inline mr-2" /> Plant Disease Detection
        </button>
        <button 
          onClick={() => setActiveSection('advisory')}
          className={`w-full text-left p-2 rounded mb-2 ${activeSection === 'advisory' ? 'bg-green-700' : 'hover:bg-green-800'}`}
        >
          <HelpCircle className="inline mr-2" /> Agricultural Advisory
        </button>
        <button 
          className="w-full text-left p-2 rounded mb-2 hover:bg-green-800"
        >
          <MapPin className="inline mr-2" /> Regional Support Centers
        </button>
        <button 
          className="w-full text-left p-2 rounded mb-2 hover:bg-green-800"
        >
          <Shield className="inline mr-2" /> Government Schemes
        </button>
        <button 
          className="w-full text-left p-2 rounded hover:bg-green-800"
        >
          <FileText className="inline mr-2" /> Resources & Documentation
        </button>
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-100 p-4 lg:p-8">
      <div className="container mx-auto">
        <header className="bg-white shadow-lg rounded-lg p-4 mb-6">
          <h1 className="text-3xl font-bold text-green-900 text-center">
           
          </h1>
        </header>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            {renderSideNavigation()}
          </div>
          <div className="md:col-span-3">
            {activeSection === 'disease-detection' && renderDiseaseDetectionSection()}
            {activeSection === 'advisory' && renderAdvisorySection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Camerageter;