import React, { useRef, useState} from 'react';

function App() {
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
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageSrc = event.target.result;
        console.log(imageSrc);
        setFile(imageSrc);
        //scanImage(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const canvasRef = useRef(null);
  const [result, setResult] = useState('');
  const [result1, setResult1] = useState('');
  const [loading, setLoading] = useState(false);

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
              console.log(`Disease: ${diseaseInfo.name}, Cure: ${diseaseInfo.cure}`);
              setResult1(diseaseInfo.cure);
            } else {
              console.log("Disease not found in the list.");
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

  return (
    <div className="App" style={{marginTop:"150px"}}>
      <button onClick={uploadImage}>Upload Image</button>
      <h1 className="styled-text">Upload a image here</h1>
      <div><input id="dynamicInput" type="file" onChange={handleChange} accept="image/*" /></div>
      {file && <img src={file} alt="Preview" style={{ maxWidth: '100%', maxHeight: '300px', marginTop: '20px' }} />}
      {result}{result1}{loading}
    </div>
  );
}

export default App;
