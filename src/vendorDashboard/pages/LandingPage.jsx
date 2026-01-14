import React,{useState,useEffect, use} from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {
 
  const [showLogin,setShowLogin] = useState(false);
  const [showRegister,setShowRegister] = useState(false);
  const [showFirm,setShowFirm] = useState(false);
  const [showProduct,setShowProduct] = useState(false);
  const [showWelcome,setShowWelcome] = useState(false);
  const [showAllProducts,setShowAllProducts] = useState(false);
  const [showLogout,setShowLogout]= useState(false);
  const [showFirmTitle,setShowFirmTitle]= useState(true);

  useEffect(()=>{
  const loginToken = localStorage.getItem("loginToken");
  
  if(loginToken)
  {
  setShowLogout(true);
  }

  },[])

  useEffect(()=>{

  const firmName = localStorage.getItem("firmName");

  if(firmName)
  {
    setShowFirmTitle(false);
  }
  },[])


  const logoutHandler = () => {
  const sure = window.confirm("Are you sure you want to logout?");

  if (!sure) return;   // stop if Cancel

  localStorage.removeItem("loginToken");
  localStorage.removeItem("firmId");
  localStorage.removeItem("firmName");
  setShowLogout(false);

  // reset UI
  setShowLogin(false);
  setShowRegister(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowAllProducts(false);
  setShowWelcome(true);
  setShowFirmTitle(true);
  alert("Logged out successfully ✅");
};


  const showLoginHandler = ()=>
  {
    setShowLogin(true);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  }

  const showWelcomeHandler= ()=>{
    setShowWelcome(true);
    setShowProduct(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
  setShowAllProducts(false);
  }

  const showRegisterHandler = ()=>{
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
     setShowWelcome(false);
     setShowAllProducts(false);
  }

  const showFirmHandler = ()=>{
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
     setShowWelcome(false);
     setShowAllProducts(false);
  }

  const showAllProductsHandler = ()=>{
   setShowProduct(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
     setShowWelcome(false);
    setShowAllProducts(true);
  }

  const showProductHandler=()=>{
    setShowProduct(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowAllProducts(false);
     setShowWelcome(false);
  }

  return (
    <div>
      <section className='landingSection'></section>
      <Navbar showLoginHandler ={showLoginHandler} showRegisterHandler={showRegisterHandler}
      showLogout={showLogout} 
      logoutHandler={logoutHandler}
      />
      <div className="collectionSection">
        <SideBar showFirmHandler={showFirmHandler}
         showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler} 
          showFirmTitle={showFirmTitle}
        />
       {showLogin && <Login  showWelcomeHandler={showWelcomeHandler}/>}
       {showRegister && <Register showLoginHandler={showLoginHandler} />}
       {showFirm && <AddFirm />}
       {showProduct && <AddProduct />}
       {showWelcome && <Welcome/>}
       {showAllProducts && <AllProducts/>}
      
      </div>
      

    </div>
  )
}

export default LandingPage
