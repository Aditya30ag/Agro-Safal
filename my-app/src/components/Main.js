import React from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Main() {
  const navigate=useNavigate();
  const cameraonclick=()=>{
    navigate('/camerageter');
  }
  return (
    <>
      <div style={{ position: "absolute", top: "-5px", left: "0", zIndex: "-1", width: "100%" }}>
        <img className="mainimg" src="hello.jpg" alt="error" style={{ height: "100vh", width: "100%", opacity: "0.8" }} />
      </div>
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <div style={{
        margin: "120px auto 0",
        height: "80px",
        width: "90%",
        maxWidth: "600px",
        borderRadius: "10px",
        textAlign: "center",
        opacity: "0.9",
        zIndex: "20",
        padding: "10px 10px 10px 10px"
      }}>
        <p style={{
          fontSize: "30px",
          fontFamily: "Georgia",
          zIndex: "20",
          backgroundColor: "#E4F1E8",
          color: "black",
          opacity: "0.7",
          borderRadius: "12px",
          padding: "10px 10px 10px 10px"
        }}>Capture your crop's image to get instant crop disease analysis</p>
      </div>
      <div className='camera' style={{
        height: "215px",
        width: "215px",
        display: "flex",
        justifyContent: "center",
        borderRadius: "50%",
        alignItems: "center",
        cursor: "pointer",
        margin: "100px auto 0",
        zIndex: "20",
        border: "4px solid white",
      }} onClick={cameraonclick}>
        <img src="camera12.jpg" alt="error" style={{ height: "200px", width: "200px", borderRadius: "50%", zIndex: "20", border: "4px solid white" }} />
      </div>
      <div style={{
        height: "50px",
        width: "250px",
        margin: "100px auto 0",
        zIndex: "40",
        borderRadius: "8px",
        textAlign: "center",
        padding: "0px 20px 20px 20px"
      }}>
        <Link to="/upload" style={{
          color: "black",
          fontSize: "20px",
          textDecoration: "none",
          backgroundColor: "white",
          opacity: "0.8",
          borderRadius: "8px",
          padding: "10px 10px"
        }}>Upload your image</Link>
      </div>
      </div>
      <div style={{
        height: "500px",
        width: "90%",
        maxWidth: "600px",
        backgroundColor: "black",
        position: "absolute",
        top: "170px",
        borderRadius: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        opacity: "0.4",
        zIndex: "0"
      }}>
      </div>
    </>
  );
  
}
