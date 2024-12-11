import React, { useState, useRef} from 'react';
import { 
  Upload, 
  Microscope, 
  Shield, 
  Leaf, 
  AlertCircle, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

const Uploads = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const fileInputRef = useRef(null);
  
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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setPrediction(null); // Reset previous prediction
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = () => {
    if (!selectedImage) {
      console.log('Please select an image first');
      return;
    }

    setLoading(true);
    fetch(selectedImage)
      .then(res => res.blob())
      .then(blob => {
        const formData = new FormData();
        formData.append('file', blob, 'plant_image.jpg');
        console.log(formData);

        return fetch('http://10.12.25.213:8000/predict/', {
          method: 'POST',
          body: formData
        });
      })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.prediction && data.prediction.length > 0) {
          const { label, score } = data.prediction[0];
          const diseaseInfo = diseases.find(disease => disease.name === label);
          
          setPrediction({
            label,
            accuracy: score,
            details: diseaseInfo || null
          });
        } else {
          setPrediction(null);
          alert("Could not identify the plant disease");
        }
      })
      .catch(error => {
        setLoading(false);
        console.error("Error: ", error);
        alert("An error occurred. Please try again.");
      });
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'text-red-600';
      case 'moderate': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden my-2">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 flex items-center">
        
        <div>
          <h1 className="text-2xl font-bold">Agricultural Diagnostic Center</h1>
          <p className="text-sm opacity-80">Plant Health Analysis Platform</p>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="p-6">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*" 
          className="hidden"
        />
        
        <button 
          onClick={() => fileInputRef.current.click()}
          className="w-full py-3 px-4 bg-green-100 text-green-800 rounded-lg 
                     flex items-center justify-center hover:bg-green-200 
                     transition-colors duration-300"
        >
          <Upload className="mr-3" size={24} />
          Upload Plant Image
        </button>

        {/* Image Preview */}
        {selectedImage && (
          <div className="mt-6 mb-4 rounded-lg overflow-hidden shadow-md">
            <img 
              src={selectedImage} 
              alt="Selected Plant" 
              className="w-full h-72 object-cover"
            />
          </div>
        )}

        {/* Analyze Button */}
        {selectedImage && (
          <button 
            onClick={uploadImage}
            disabled={loading}
            className={`w-full py-3 rounded-lg mt-4 text-white transition-colors duration-300 
                        ${loading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-green-600 hover:bg-green-700'}`}
          >
            {loading ? 'Analyzing...' : 'Diagnose Plant Disease'}
          </button>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="mt-6 bg-gray-50 rounded-lg p-5 space-y-4">
            <div className="flex items-center">
              <Microscope className="mr-3 text-green-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">Diagnostic Results</h3>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-700">
                    Disease: {prediction.label}
                  </p>
                  <p className="text-sm text-gray-500">
                    Accuracy: {(prediction.accuracy * 100).toFixed(2)}%
                  </p>
                </div>
                {prediction.accuracy > 0.7 ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <AlertCircle className="text-yellow-500" size={24} />
                )}
              </div>
            </div>

            {prediction.details && (
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center mb-2">
                  <Leaf className="mr-2 text-green-500" size={20} />
                  <h4 className="font-semibold text-gray-800">Treatment Recommendations</h4>
                </div>
                <p className="text-gray-600">{prediction.details.cure}</p>
                
                {prediction.details.severity && (
                  <div className={`mt-2 flex items-center ${getSeverityColor(prediction.details.severity)}`}>
                    <Info size={16} className="mr-2" />
                    <span className="text-sm capitalize">
                      Severity: {prediction.details.severity}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Guidance */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p>
          <Shield className="inline mr-2 text-green-600" size={16} />
          Official tool. Consult local experts for comprehensive advice.
        </p>
      </div>
    </div>
  );
};

export default Uploads;