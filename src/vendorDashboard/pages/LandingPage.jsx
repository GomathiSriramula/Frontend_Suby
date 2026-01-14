import React,{useState,useEffect, use} from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
import UserDetails from '../components/UserDetails'
import API_URL from '../data/apiPath';

const LandingPage = () => {
 
  const [showLogin,setShowLogin] = useState(false);
  const [showRegister,setShowRegister] = useState(false);
  const [showFirm,setShowFirm] = useState(false);
  const [showProduct,setShowProduct] = useState(false);
  const [showWelcome,setShowWelcome] = useState(false);
  const [showAllProducts,setShowAllProducts] = useState(false);
  const [showUserDetails,setShowUserDetails] = useState(false);
  const [showLogout,setShowLogout]= useState(false);
  const [showFirmTitle,setShowFirmTitle]= useState(true);

  // Check authentication and firm status on mount
  useEffect(()=>{
    const loginToken = localStorage.getItem("loginToken");
    
    if(loginToken)
    {
      setShowLogout(true);
      // Fetch vendor firm status
      checkVendorFirmStatus();
    }
  },[])

  // Function to check if vendor has a firm
  const checkVendorFirmStatus = async () => {
    try {
      const loginToken = localStorage.getItem("loginToken");
      const vendorId = localStorage.getItem("vendorId");

      if (!vendorId) return;

      // Update logout state when checking firm (indicates user is logged in)
      setShowLogout(true);

      const response = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`, {
        method: "GET",
        headers: {
          token: loginToken,
        },
      });

      const data = await response.json();

      if (response.ok && data.vendorFirmId) {
        // Firm exists, hide Add Firm
        setShowFirmTitle(false);
        localStorage.setItem("firmId", data.vendorFirmId);
        localStorage.setItem("firmName", data.vendorFirmName);
      } else {
        // No firm, show Add Firm
        setShowFirmTitle(true);
      }
    } catch (error) {
      console.error("Error checking firm status:", error);
    }
  };


  const logoutHandler = () => {
  const sure = window.confirm("Are you sure you want to logout?");

  if (!sure) return;   // stop if Cancel

  // Update UI state FIRST before clearing localStorage
  setShowLogout(false);
  setShowLogin(false);
  setShowRegister(false);
  setShowFirm(false);
  setShowProduct(false);
  setShowAllProducts(false);
  setShowUserDetails(false);
  setShowWelcome(true);
  setShowFirmTitle(true);

  // Then clear localStorage
  localStorage.removeItem("loginToken");
  localStorage.removeItem("vendorId");
  localStorage.removeItem("firmId");
  localStorage.removeItem("firmName");

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
    setShowUserDetails(false);
  }

  const showWelcomeHandler= ()=>{
    setShowWelcome(true);
    setShowProduct(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowAllProducts(false);
    // Check firm status when showing welcome (after login)
    checkVendorFirmStatus();
  }

  const showRegisterHandler = ()=>{
    setShowRegister(true);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
     setShowWelcome(false);
     setShowAllProducts(false);
     setShowUserDetails(false);
  }

  const showFirmHandler = ()=>{
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(true);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    setShowUserDetails(false);
  }

  // Call this after firm is successfully added
  const handleFirmAdded = () => {
    setShowFirmTitle(false);
    setShowFirm(false);
    setShowWelcome(true);
  }

  const showAllProductsHandler = ()=>{
   setShowProduct(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
     setShowWelcome(false);
    setShowUserDetails(false);
    setShowAllProducts(true);
  }

  const showProductHandler=()=>{
    setShowProduct(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowAllProducts(false);
    setShowWelcome(false);
    setShowUserDetails(false);
  }

  const showUserDetailsHandler = () => {
    const loginToken = localStorage.getItem("loginToken");
    
    if (!loginToken) {
      alert("Please login first to view user details ❌");
      return;
    }

    setShowUserDetails(true);
    setShowRegister(false);
    setShowLogin(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
    setShowWelcome(false);
  }

  return (
    <div>
      <section className='landingSection'></section>
      <Navbar showLoginHandler ={showLoginHandler} showRegisterHandler={showRegisterHandler}
      showLogout={showLogout} 
      logoutHandler={logoutHandler}
      showWelcomeHandler={showWelcomeHandler}
      />
      <div className="collectionSection">
        <SideBar showFirmHandler={showFirmHandler}
         showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler}
          showUserDetailsHandler={showUserDetailsHandler}
          showFirmTitle={showFirmTitle}
        />
       {showLogin && <Login  showWelcomeHandler={showWelcomeHandler}/>}
       {showRegister && <Register showLoginHandler={showLoginHandler} />}
       {showFirm && <AddFirm handleFirmAdded={handleFirmAdded} />}
       {showProduct && <AddProduct />}
       {showWelcome && <Welcome/>}
       {showAllProducts && <AllProducts/>}
       {showUserDetails && <UserDetails/>}
      
      </div>
      

    </div>
  )
}

export default LandingPage
