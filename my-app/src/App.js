import './App.css';
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import React,{ useState,useEffect}from "react";
import LoadingBar from 'react-top-loading-bar';
import About from './components/About';
import Services from './components/Services';
import Footer from './components/Footer';
import Main from './components/Main';
import Market from './components/Market';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from './components/Alert';
import Camerageter from './components/Camerageter';
import App3 from './components/App3';
import BuyNow from './components/BuyNow';
import Upload from './components/Upload';
import Welcomepage from './components/Wecomepage';

function App() {
  const notes = [
    { img:"/seeds.jpg",name:"Barley Seeds", title:"Rich in fiber and essential nutrients, Barley seeds support digestion and heart health. ", seller:"Vijay Sharma" ,price:"50"},
    { img:"/wheat.jpg",name:"Wheat Grains",title:"Packed with vitamins and minerals, Wheat grains provide energy and vitality.", seller:"Aishwarya", price:"350"},
    { img:"/mango.jpg",name:"Mangoes" ,title:"Mangoes are rich in vitamins and antioxidants, boosting immunity and skin health. ",seller:"Fresh Fields", price:"500"},
    { img:"/blueberry.jpg",name:"Blueberries",title:"Blueberries are high in antioxidants and support brain health and immunity",seller:"Bhaskar", price:"110"},
    { img:"/onion.jpg",name:"Onions", title:"Onions are rich in flavor and antioxidants, beneficial for heart health and immunity. ", seller:"KT seller/Ram",price:"300"},
    { img:"/potato.jpg",name:"Potatoes",title:"Potatoes are a good source of energy, potassium, and fiber, supporting digestion and overall health. ",seller:"Farms Freash",price:"600"},
    { img:"/onion1.jpg",name:"Pears",title:"Pears are high in fiber, aiding digestion and promoting heart health. ",seller:"Big Farms",price:"200"},
    { img:"/apples.jpg",name:"Apples", title:"Apples are loaded with vitamins and antioxidants, supporting immunity and heart health. ", seller:"Aashvi",price:"150"},
  ];
  
  useEffect(() => {
    document.body.style.background = 'linear-gradient(to bottom, white, #E0F8E7)';
    document.body.style.minHeight = '100vh';
    document.documentElement.style.minHeight = '100vh';
  }, []);
  const [click,setclick]=useState(false);
  const [progress,setprogress]=useState(0);
  const handleonclicklogin=()=>{
    setclick(true);
    console.log(click);
  }
  const showalert=()=>{
    setTimeout(()=>{
      setprogress(20);
    },100)
    setTimeout(()=>{
      setprogress(40);
    },200)
    setTimeout(()=>{
      setprogress(60);
    },300)
    setTimeout(()=>{
      setprogress(80);
    },400)
    setTimeout(()=>{
      setprogress(100);
    },500)
  }
  const handleonClick2=()=>{
    showalert();
  }
  const router=createBrowserRouter([
    {
      path:"/",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><Alert style={{position:""}}/><LoadingBar
      color='black'
      progress={progress}
      /><Welcomepage/></>
    },
    {
      path:"/home",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><Main/><App3/></>
    },
    {
      path:"/about",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><About/><Footer/></>
    },
    {
      path:"/upload",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><Upload/></>
    },
    {
      path:"/services",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><Services/><Footer/></>
    },
    {
      path:"/market",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      />
      <Market notes={notes}/><Footer/></>
    },
    {
      path:"/market/buynow",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><BuyNow/><Footer/></>
    },
    {
      path:"/camerageter",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><Camerageter/><Footer/></>
    },
    {
      path:"/login",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><Login showalert={showalert} handleonClick2={handleonClick2}/><Footer/></>
    },
    {
      path:"/signup",
      element:<><Navbar showalert={showalert} handleonClick2={handleonClick2} click={click} handleonclicklogin={ handleonclicklogin} /><LoadingBar
      color='black'
      progress={progress}
      /><Signup showalert={showalert} handleonClick2={handleonClick2}/><Footer/></>
    }
  ])
 
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
